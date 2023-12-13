import { computed } from 'vue'
import { getFirstLetterList } from './compare.js'
export default function useHandleTreeData(data, endLevel, isDisabled) {
  // 树的数据格式
  const defaultProps = {
    children: 'children',
    label: 'label',
    value: 'key',
    disabled: (data, node) => {
      // console.log('isDisabled.value--', isDisabled.value) //为true在此表示数据分析页面触发，防止其他页面调用影响
      if (isDisabled.value === true) {
        if (data.level === 7 || data.level === 6) {
          return false
        }
        return true
      }
    },
  }
  //树的数据地图
  let treeMap = {}
  // 树的数据
  const treeData = computed(() => {
    // console.log(data.value, '处理前的点位树')
    return remove(handleDataToTree(data.value))
  })
  //去重
  const remove = (tree) => {
    let changeData = []
    const map = new Map()
    for (const item of tree) {
      if (!map.has(item.id)) {
        map.set(item.id, item)
      }
    }
    changeData = [...map.values()]
    return changeData
  }
  // 将扁平化数据处理为树所需要的数据
  const handleDataToTree = (data) => {
    const resTreeData = [] // 输出结果
    const itemMap = {} // 数据的存储地图

    // 对每个节点复制到其父节点上
    const assignmentChildren = (id, fId, key) => {
      if (fId === '-1') {
        // fId 为 -1，说明是根节点
        itemMap[key][id].level = 0
        resTreeData.push(itemMap[key][id])
      } else if (!parseInt(key)) {
        // key 为0，说明是第一层，第一层和根节点的 key 相同
        if (!itemMap[key][fId]) {
          itemMap[key][fId] = {
            children: [],
          }
        }
        itemMap[key][fId].children.push(itemMap[key][id])
      } else {
        // 进入则是第二层往后的层级，直接找父级 push
        itemMap[parseInt(key) - 1][fId] &&
          itemMap[(parseInt(key) - 1).toString()][fId].children.push(itemMap[key][id])
      }
    }

    //遍历数组  生成树
    for (const key in data) {
      // console.log(data[key][0], '88809sdata[key][0]')
      if (endLevel.value !== 0 && data[key][0] && parseInt(data[key][0].level) > endLevel.value) {
        break
      }
      itemMap[key] = {}
      // console.log(resTreeData)
      for (const item of data[key]) {
        const id = item.id
        const fId = item.fId
        if (!id || !fId) {
          continue
        }

        if (!itemMap[key][id]) {
          itemMap[key][id] = {
            children: [],
          }
        }
        //对摄像机进行排序
        if (item.cameraId) {
          const sotrNum = item.label.split('-')
          // console.log(sotrNum, 'sotrNum', sotrNum[0])
          item.sotrNum = Number(sotrNum[0])
        }
        itemMap[key][id] = {
          ...item,
          id: item.id,
          key: item.level + '-' + item.id,
          children: itemMap[key][id].children,
        }
        if (typeof fId === 'string' || typeof fId === 'number') {
          assignmentChildren(id, fId, key)
        } else if (fId instanceof Array) {
          fId.forEach((item) => {
            assignmentChildren(id, item, key)
          })
        }
      }
    }
    // console.log('后树', resTreeData)
    //第二版
    const sortResult = (data, type) => {
      let result = []
      switch (type) {
        // 当比较的item为对象的某个属性时，value = item [key]

        // 1.中文(按第一个文字)
        case 'chinese':
          result = data.sort((item1, item2) => {
            const value1 = item1.label.charAt(0)
            const value2 = item2.label.charAt(0)
            // 这里localeCompare应该是不支持第二个参数的 但是并没有报错，请直接使用value1.localeCompare(value2)
            return value1.localeCompare(value2, 'zh-CN')
          })
          break
        // 2.字母(按第一个字母且不区分大小写，请自行修改)
        case 'letter':
          result = data.sort((item1, item2) => {
            //2.1不区分大小写
            const value1 = item1.label.charAt(0).toLowerCase()
            const value2 = item2.label.charAt(0).toLowerCase()
            return value1.localeCompare(value2)
          })
          break
        //3.数字
        case 'number':
          result = data.sort((item1, item2) => {
            const value1 = item1.sotrNum
            const value2 = item2.sotrNum
            return value1 - value2
          })
          break

        default:
          result = data
          break
      }
      return result
    }
    //第3版
    // 判断字符串是否全是中文
    const isAllChinese = (str) => {
      return /^[\u4E00-\u9FA5]+$/.test(str)
    }
    // 判断字符是否为中文
    const isChinese = (char) => {
      return /^[\u4E00-\u9FA5]$/.test(char)
    }
    // 判断字符是否为数字
    const isNumber = (num) => {
      return /^[0-9]$/.test(num)
    }
    // 判断字符是否为字母
    const isString = (str) => {
      return /^[a-z]$/.test(str)
    }
    //测试
    // const obj = [
    //   { id: '1000kV1母线电压互感器A相', id2: '123中国zzh' },
    //   { id: '1000kV1母线电压互感器A相', id2: '123中国zzh' },
    //   { id: '1000kV1母线避雷器A相', id2: '123中国zzh' },
    //   { id: '1000kV1母线避雷器C相', id2: '123中国zzh' },
    //   { id: '1000kV1母线接头A相', id2: '123中国zzh' },
    //   { id: '1000kV1母线荆T117接地刀闸C相', id2: '123中国zzh' },
    //   { id: '1000kV1母线接头B相', id2: '123中国zzh' },
    //   { id: '1000kV1母线接头C相', id2: '123中国zzh' },
    // ]

    const sortFun = (arrIs, attris) => {
      const compareFun = (a, b) => {
        let result = 0
        const lengthIs =
          a[attris].length - b[attris].length > 0 ? b[attris].length : a[attris].length
        // console.log('排序次数', lengthIs)
        //依次比较两个字符串的各项字符
        for (let index = 0; index < lengthIs; index++) {
          //数字排在字母前面
          const circularFun = (first, second) => {
            //同类型
            if (isString(first) && isString(second)) {
              result = first ? first.localeCompare(second) : 0
            }
            if (isNumber(first) && isNumber(second)) {
              if (first - second > 0) {
                result = 1
              }
              result = -1
            }
            if (isChinese(first) && isChinese(second)) {
              result = first ? first.localeCompare(second) : 0
            }
            //其他类型
            if (isNumber(first) && isString(second)) {
              result = -1
            }
            if (isString(first) && isNumber(second)) {
              result = 1
            }
            if (isString(first) && isChinese(second)) {
              result = -1
            }
            if (isChinese(first) && isString(second)) {
              result = 1
            }
            if (isNumber(first) && isChinese(second)) {
              result = -1
            }
            if (isChinese(first) && isNumber(second)) {
              result = 1
            }

            result = first ? first.localeCompare(second) : 0
          }
          if (a[attris][index] === b[attris][index]) {
            circularFun(a[attris][index + 1], b[attris][index + 1])
          } else {
            circularFun(a[attris][index], b[attris][index])
          }
          // circularFun(a[attris][index], b[attris][index])
          // 若已经比较出结果，则跳出循环，不再继续比较剩余字符
          if (result !== 0) {
            break
          }
        }
        return result
      }
      arrIs.sort(compareFun)
      return arrIs
    }
    //排序

    const findDataFun = (target) => {
      const newTarget = []
      target.forEach((target0) => {
        if (target0.children && target0.children.length > 0) {
          target = sortFun(target, 'label')
          findDataFun(target0.children)
        } else if (target0.level === '4' && target0.cameraId !== undefined) {
          sortResult(target, 'number')
        } else {
          target = sortFun(target, 'label')
        }
      })
      return target
    }
    const newResTreeData = findDataFun(resTreeData)
    findDataFun(resTreeData)
    // console.log(sortFun(obj, 'id'), 'newResTreeData(obj)')
    treeMap = itemMap
    return resTreeData
  }
  return {
    defaultProps,
    treeData,
  }
}
