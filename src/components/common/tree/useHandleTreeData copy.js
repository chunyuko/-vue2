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
        } else {
          return true
        }
      }
    },
  }
  //树的数据地图
  let treeMap = {}
  // 树的数据
  const treeData = computed(() => {
    // console.log(data.value, '处理前的点位树')
    return handleDataToTree(data.value)
  })
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
    // console.log(resTreeData, 'resTreeData----转化后的树')
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
            //2.2区分大小写
            //         const value1 = item1.charAt(0);
            // const value2 = item2.charAt(0);
            //测试2.2
            // const arr = ['A','a','b','B']
            // arr.sort(function (item1, item2) {
            //     return item1.localeCompare(item2);
            // })
            //输出["a", "A", "b", "B"]
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
    const sortFun = (arrIs, attris) => {
      arrIs.sort((a, b) => {
        // 数字排在字符串前面
        if (typeof a[attris] === 'number' && typeof b[attris] === 'string') {
          return -1
        }

        if (typeof a[attris] === 'string' && typeof b[attris] === 'number') {
          return 1
        }

        // 当存在非数字时
        if (isNaN(a[attris]) || isNaN(b[attris])) {
          // 全汉字的排在非全汉字的后面
          if (isAllChinese(a[attris]) && !isAllChinese(b[attris])) {
            return 1
          }

          if (!isAllChinese(a[attris]) && isAllChinese(b[attris])) {
            return -1
          }

          // 存在非数字的数据时，都转为字符串进行比较
          a[attris] = a[attris].toString()
          b[attris] = b[attris].toString()

          let result = 0

          // 依次比较两个字符串的各项字符
          for (
            let index = 0;
            index < (a[attris].length - b[attris].length ? b[attris].length : a[attris].length);
            index++
          ) {
            // 汉字排在非汉字的后面
            if (!isChinese(a[attris][index]) && isChinese(b[attris][index])) {
              result = -1
            }

            if (isChinese(a[attris][index]) && !isChinese(b[attris][index])) {
              result = 1
            }

            // 若两个汉字进行比较，则比较他们的拼音首字母
            if (isChinese(a[attris][index]) && isChinese(b[attris][index])) {
              let pinyinA = getFirstLetterList(a[attris][index]).toString()
              let pinyinB = getFirstLetterList(b[attris][index]).toString()

              result = pinyinA.localeCompare(pinyinB, 'zh-Hans-CN', { sensitivity: 'accent' })
            }

            // 若已经比较出结果，则跳出循环，不再继续比较剩余字符
            if (result !== 0) {
              break
            }
          }

          // 只要有一个无法转换为数字——转换为字符串进行比较——先按字符排序，然后按照数字排序
          return (
            result ||
            a[attris]
              .toString()
              .localeCompare(b[attris].toString(), 'zh-Hans-CN', { sensitivity: 'accent' })
          )
        } else {
          // 都能转换为数字——转换为数字进行比较——从小到大排序
          return Number(a[attris]) - Number(b[attris])
        }
      })
      return arrIs
    }
    //排序
    const findDataFun = (target) => {
      target.forEach((target0) => {
        if (target0.children) {
          // sortFun(target, 'label')
          findDataFun(target0.children)
        } else if (target0.cameraId !== '' && target0.level === '4') {
          //装置摄像机
          sortResult(target, 'number')
        }
        // else {
        //   sortFun(target, 'label')
        // }
      })
    }
    findDataFun(resTreeData)
    treeMap = itemMap
    return resTreeData
  }
  return {
    defaultProps,
    treeData,
  }
}
