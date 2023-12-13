<script>
import { defineComponent, ref, watch, computed, onMounted, onUnmounted, toRefs } from 'vue'

import { useMessage } from '@hooks/useVue'
import { useEventBus } from '@hooks/useVue'
export default defineComponent({
  name: 'dataToolsContent',
})
</script>

<script setup>
const message = useMessage()
const bus = useEventBus()

// const imgData = getImg()
const props = defineProps({
  time: {
    type: Array,
    default() {
      return []
    },
  },
  data: {
    type: Array,
    default() {
      return []
    },
  },
})
const { data } = toRefs(props)
// console.log('-----1222221总页数data.value.', data.value)
// console.log('-----1222221总页数data.value.', time)

const emits = defineEmits(['getInfoData', 'update:time']) //【//getInfoData父组件传来的方法】emits可以是数组也可以是对象，用于组件之间的通信，触发自定义事件，传递参数
// 日期
const timeData = ref([])

// 展示几图
const fewPic = ref(6)
// 页数
const pageNow = ref(1)
const pageTal = ref(1)

// 总页数
const totalPage = computed(() => {
  return pageTal.value
  // const NumPage = Math.ceil(data.value.length / fewPic.value)
  // return NumPage
})

const info = computed(() => {
  const dataArr = []
  // console.log('.value', data.value)
  if (fewPic.value === 6) {
    //【应该没问题了，除了最后一页图片显示,dom部分设置了空数组保留位置但是不显示，如需要，判断情况添加空数组修改排版即可】
    data.value.forEach((item) => {
      // setTimeout(() => {
      pageTal.value = item.totalpages
      // console.log('6图时页码pageTal.value', pageTal.value)
      // }, 100)

      if (item.Is_Deal === '1') {
        item.Is_Deal = '已确认'
      }
      if (item.Is_Deal === '0') {
        item.Is_Deal = '未确认'
      }

      if (dataArr.length === 0) {
        dataArr.push([])
        dataArr[0].push(item)
      } else if (dataArr[dataArr.length - 1].length >= 3) {
        dataArr.push([])
        dataArr[dataArr.length - 1].push(item)
      } else {
        dataArr[dataArr.length - 1].push(item)
      }
    })
  } else if (fewPic.value === 4) {
    // getInfoData()
    data.value.forEach((item) => {
      // setTimeout(() => {
      pageTal.value = item.totalpages
      // console.log('4图时页码pageTal.value', pageTal.value)
      // }, 1000)

      if (item.Is_Deal === '1') {
        item.Is_Deal = '已确认'
      }
      if (item.Is_Deal === '0') {
        item.Is_Deal = '未确认'
      }
      if (dataArr.length === 0) {
        dataArr.push([])
        dataArr[0].push(item)
      } else if (dataArr[dataArr.length - 1].length >= 2) {
        dataArr.push([])
        dataArr[dataArr.length - 1].push(item)
      } else {
        dataArr[dataArr.length - 1].push(item)
      }
    })
  } else if (fewPic.value === 9) {
    // getInfoData()
    data.value.forEach((item) => {
      pageTal.value = item.totalpages
      // console.log('9图时页码pageTal.value', pageTal.value)
      if (item.Is_Deal === '1') {
        item.Is_Deal = '已确认'
      }
      if (item.Is_Deal === '0') {
        item.Is_Deal = '未确认'
      }

      if (dataArr.length === 0) {
        dataArr.push([])
        dataArr[0].push(item)
      } else if (dataArr[dataArr.length - 1].length >= 3) {
        dataArr.push([])
        dataArr[dataArr.length - 1].push(item)
      } else {
        dataArr[dataArr.length - 1].push(item)
      }
    })
  } else {
    // pageTal.value = item.totalpages
    dataArr[0] = data.value
  }
  return dataArr
})
watch(timeData, () => {
  console.log('时间监视---timeData.value', timeData.value)
  emits('update:time', timeData.value)
})
const getCurrentTime = () => {
  const start = new Date()
  start.setTime(start.getTime() - 3600 * 1000 * 24 * 7) //这里应该是*7
  let yearend = start.getFullYear()
  let monthend = start.getMonth() + 1
  let dayend = start.getDate()
  timeData.value.push(yearend + '-' + monthend + '-' + dayend + ' ' + '00:00:00')

  const dataEnd = new Date()
  let year = dataEnd.getFullYear()
  let month = dataEnd.getMonth() + 1
  let day = dataEnd.getDate()
  timeData.value.push(year + '-' + month + '-' + day + ' ' + '00:00:00')
}
// 获取数据信息
const getInfoData = (nodes = []) => {
  console.log('getInfoData获取数据信息---pageNow---3', pageNow)

  // getCurrentTime()
  emits('getInfoData', fewPic.value, timeData.value, nodes, pageNow.value)
  console.log('获取数据信息---timeData1pageNow.value', nodes)

  console.log('获取数据信息---timeData1pageNow.value', pageNow.value)
  console.log('getInfoData获取数据信息---pageNow---4', pageNow)

  // console.log('获取数据信息---timeData1', timeData.value)
}
// 切换显示时，重置数据
const resetData = () => {
  pageNow.value = 1
  pageTal.value = 1
}
const resetDataTran = () => {
  pageNow.value = 1
  // pageTal.value = 1
}
// 上一页
const handlePrev = () => {
  if (pageNow.value === 1) {
    message.warning('当前已经是第一页！')
    return
  }
  pageNow.value--
  getInfoData()
}
// 下一页
const handleNext = () => {
  // console.log('点击下一页pageNow.value', pageNow.value)
  // console.log('点击下一页totalPage.value', totalPage.value)
  // console.log('点击下一页pageNow.value11', totalPage.value)

  // debugger
  // TODO 需要判断最大页数
  if (pageNow.value == totalPage.value) {
    // console.log('zuihoou一页')
    message.warning('当前已经是最后一页！')
    return
  }
  pageNow.value++
  getInfoData()
}
const FistPage = () => {
  pageNow.value = 1 //切换图数时当前页码重置为1，避免出现当前页码大于总页码的情况
  // console.log('切换图数量')
  getInfoData()
}
// mounted(() => {
//   getCurrentTime()
// })
onMounted(() => {
  getCurrentTime()
  getInfoData() //一开始直接执行函数
  bus.$on('getInfoData', getInfoData) //选择点位后执行函数
})

onUnmounted(() => {
  bus.$off('getInfoData')
})

defineExpose({
  // 重置数据
  resetData,
  resetDataTran,
})
</script>

<template>
  <div class="dataToolsContent">
    <div class="dateContainer">
      <el-date-picker
        v-model="timeData"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd HH:mm:ss"
      ></el-date-picker>
      <el-radio-group v-model="fewPic" @input="FistPage">
        <el-radio :label="4">4图</el-radio>
        <el-radio :label="6">6图</el-radio>
        <el-radio :label="9">9图</el-radio>
      </el-radio-group>
    </div>

    <!-- 这个是？？图片显示区域 :class="[index === 0 ? 'FistRow' : '', index === 1 ? 'SecondRow' : '']"
       -->
    <div class="infoContainer">
      <div class="infoContent">
        <div class="infoRow" v-for="(items, index) in info" :key="index">
          <div
            class="infoBox"
            v-for="(item, k) in items"
            :key="k"
            :class="[item == '' ? 'HiddenBox' : '']"
          >
            <div class="titleBox">
              <div class="title">
                <div class="icon"></div>
                {{ item.Device_Desc }}
              </div>
              <div class="status">{{ item.Is_Deal }}</div>
            </div>
            <div class="thingContentBox">
              <el-image
                fit="fill"
                :src="item.IPC_PIC_Cap != '' ? item.IPC_PIC_Cap : item.Infrared_Cap"
              ></el-image>
            </div>
            <div class="thingInfoContainer">
              <div class="thingInfoContent">
                <span>{{ item.Is_Deal }}</span>
                <span>{{ item.Date_Time }}</span>
              </div>
              <div class="thingMoreInfoBtn">详情</div>
            </div>
          </div>
          <!-- <div class="infoBox">
            <div class="titleBox">
              <div class="title">
                <div class="icon"></div>
                1号主变B相东侧散热器
              </div>
              <div class="status">已确认</div>
            </div>
            <div class="thingContentBox"></div>
            <div class="thingInfoContainer">
              <div class="thingInfoContent">
                <span>正常</span>
                <span>2021/12/14</span>
                <span>10:11:28</span>
              </div>
              <div class="thingMoreInfoBtn">详情</div>
            </div>
          </div> -->
        </div>
      </div>
      <div class="paginationContent">
        <div class="text">
          <span>共{{ totalPage }}页</span>&nbsp;<span>第{{ pageNow }}/{{ totalPage }}页</span>
        </div>
        <div class="pageBtn">
          <div class="singleBtn" @click="handlePrev">上一页</div>
          <div class="singleBtn" @click="handleNext">下一页</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.dataToolsContent {
  margin-top: 1rem;
  height: 95%;
  display: flex;
  flex-direction: column;
  overflow: auto;

  .dateContainer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    :deep(.el-range-editor.el-input__inner) {
      background-color: #14357b;
      border: 0;
    }
    :deep(.el-range-input) {
      background-color: #14357b;
    }
    :deep(.el-range-separator) {
      color: #fff;
    }
    :deep(.el-radio__label) {
      color: #fff;
      font-size: 1.6rem;
    }
  }
  .infoContainer {
    height: 700px;
    // flex: 1;
    display: flex;
    flex-direction: column;
    margin-top: 1rem;

    .infoContent {
      flex: 1;
      display: flex;
      flex-direction: column;

      .infoRow {
        flex: 1;
        display: flex;
        // justify-content: center;
        align-items: center;

        //在此一个child指的是一个数组，在此not(:first-child)即第二行(非第一行)的整个数组
        &:not(:first-child) {
          margin-top: 2rem;
        }

        // //是每行的第一个索引元素
        // .red {

        //   flex: 1;
        // }
        .infoBox {
          flex: 1;
          background-color: #0b3079;
          border: solid 0.1rem #0e5fae;
          height: 100%;
          padding: 1rem 2rem;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;

          //这里是行内块，即数组中具体的每一个数
          &:not(:first-child) {
            margin-left: 2rem;
          }

          //【不行，实现的牵强，且当图数为6和为2时，偏移量是不同的，这样没办法区分情况。这段修改代码对所有图数的显示都会产生影响】
          // /* 如果最后一行是2个元素 */
          // &:last-child:nth-child(3n - 1) {
          //   // margin-right: calc(24% + 4% / 2);//这里的偏移量是错误的，数据没有方法检测
          // }
          /* 如果最后一行是1个元素 */
          // &:last-child:nth-child(3n - 2) {
          //   // 改动其他也会有变化？？原因why
          //   // flex: left;
          //   // margin: 0 auto;
          //   margin-right: calc(67.5%);
          // }

          .titleBox {
            display: flex;
            align-items: center;
            justify-content: space-between;

            .title {
              display: flex;
              align-items: center;
              font-size: 1.8rem;
              .icon {
                width: 1.8rem;
                height: 1.8rem;
                background-color: #0e60af;
                border: solid 0.1rem #fff;
                border-radius: 50%;
                margin-right: 0.5rem;
              }
            }

            .status {
              background-color: #065c6f;
              border-radius: 0.2rem;
              color: #fff;
              font-size: 1.8rem;
              padding: 0.3rem;
            }
          }

          .thingContentBox {
            height: 0;
            flex: 1;
            margin: 1rem 0;
            // background-color: #71e208;
          }
          // .el-image {
          //   img {
          //     width: 22.5%;
          //     height: 22.5%;
          //     position: fixed;
          //     margin-top: -1px;
          //   }
          // }
          .thingInfoContainer {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .thingInfoContent {
              display: flex;
              align-items: center;
              color: #fff;
              font-size: 1.8rem;

              span {
                &:not(:first-child) {
                  margin-left: 1rem;
                }
              }
            }
            .thingMoreInfoBtn {
              background-color: #256df7;
              border-radius: 0.2rem;
              color: #fff;
              font-size: 1.8rem;
              cursor: pointer;
              padding: 0.3rem 1rem;
            }
          }
        }
      }

      //所有的第二行第一个元素都会被控制影响
      .HiddenBox {
        visibility: hidden;
      }
    }

    .paginationContent {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      margin-top: 2rem;
      .text {
        font-size: 1.8rem;
      }

      .pageBtn {
        display: flex;
        margin-left: 1.5rem;

        .singleBtn {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #c7c7c7;
          font-size: 1.8rem;
          background-color: #0c347b;
          border-radius: 0.2rem;
          border: solid 0.1rem #0b3d7b;
          padding: 0.5rem 1rem;
          cursor: pointer;

          &:not(:first-child) {
            margin-left: 1rem;
          }
        }
      }
    }
  }
}

// .viewsContainer .rightContainer .infoContainer {
//   height: 100%;
// }
</style>
