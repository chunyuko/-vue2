<template>
  <div style="height: 100%">
    <div class="app-title">
      <i style="background: #27f7ff"></i>
      <p style="color: #27f7ff">{{ serverName }}</p>
    </div>
    <div class="datePicker">
      <el-date-picker
        v-model="value1"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd"
        @change="getTime"
      >
      </el-date-picker>
    </div>
    <div id="echart" style="width: 100%; height: calc(100% - 5rem)"></div>
  </div>
</template>

<script>
import { serverRunChartData } from '@/views/systemManage/js/sysMagSystemMonitor'
export default {
  data() {
    return {
      // time变量用于保存setTimeout返回的Id
      time: null,
      //日期选择
      value1: [],
      //标题
      serverName: '一期巡检服务器',
      //服务器id
      ServerCode: '',
      // echart相关参数
      option: {
        title: {
          text: '',
        },
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            let relVal = params[0].name
            for (let i = 0, l = params.length; i < l; i++) {
              relVal +=
                '<br/>' + params[i].marker + params[i].seriesName + ':' + params[i].value + '%'
            }
            return relVal
          },
        },
        xAxis: {
          name: '时间',
          data: [],
          //x轴留白设置
          boundaryGap: true,
          axisLine: {
            // 坐标轴线
            show: true, // 默认显示，属性show控制显示与否
            lineStyle: {
              // 属性lineStyle控制线条样式
              color: '#48a9ff',
              //width: 2,
              type: 'solid',
            },
          },
          axisTick: {
            // 坐标轴小标记
            show: true, // 属性show控制显示与否，默认不显示
            interval: 'auto',
            // onGap: null,
            inside: true, // 控制小标记是否在grid里
            length: 0, // 属性length控制线长
            lineStyle: {
              // 属性lineStyle控制线条样式
              color: '#48a9ff',
              width: 1,
            },
          },
          axisLabel: {
            // 坐标轴文本标签
            formatter: '{value}',
            color: '#48a9ff',
          },
        },
        yAxis: {
          //是否显示 y 轴
          show: true,
          name: '占用率',
          axisLine: {
            // 坐标轴线
            show: true, // 默认显示，属性show控制显示与否
            lineStyle: {
              // 属性lineStyle控制线条样式
              color: '#48a9ff',
              //width: 2,
              type: 'solid',
            },
          },

          axisTick: {
            // 坐标轴小标记
            show: true, // 属性show控制显示与否，默认不显示
            interval: 'auto',
            // onGap: null,
            inside: true, // 控制小标记是否在grid里
            length: 0, // 属性length控制线长
            lineStyle: {
              // 属性lineStyle控制线条样式
              color: '#48a9ff',
              width: 1,
            },
          },

          axisLabel: {
            formatter: '{value}%',
            color: '#48a9ff',
          },
          //不显示分隔线
          splitLine: {
            show: false,
          },
        },
        legend: {
          show: true,
          data: ['CPU占用率', '内存占用率'],
          right: '5%',
          top: '8%',
          icon: 'rect',
          itemHeight: 3,
          itemWidth: 25,
          itemGap: 20, // 设置间距
          textStyle: {
            //图例文字的样式
            color: '#48a9ff',
            fontSize: 12,
          },
        },
        series: [
          {
            name: 'CPU占用率',
            type: 'line',
            color: ['#44a1f5'],
            data: [],
            //更加平滑
            smooth: true,
          },
          {
            name: '内存占用率',
            type: 'line',
            color: ['#e5ca4d'],
            data: [],
            //更加平滑
            smooth: true,
          },
        ],
      },
    }
  },
  methods: {
    //图表时间筛选默认时间
    initTime() {
      const _this = this
      //默认初始时间和结束时间
      this.value1.push(_this.getStandardDateBeforeWeek())
      this.value1.push(_this.getStandardDate())
    },

    //初始化结束时间为当前时间，开始时间是结束时间前七天
    getStandardDate() {
      const _date = new Date()
      const year = _date.getFullYear()
      let month = _date.getMonth() + 1
      let day = _date.getDate()
      if (month < 10) {
        month = '0' + month
      }
      if (day < 10) {
        day = '0' + day
      }
      return year + '-' + month + '-' + day
    },
    getStandardDateBeforeWeek() {
      const _date = new Date() //获取今天日期
      _date.setDate(_date.getDate() - 7) //日期回到七天前
      const year = _date.getFullYear()
      let month = _date.getMonth() + 1
      let day = _date.getDate()

      if (month < 10) {
        month = '0' + month
      }
      if (day < 10) {
        day = '0' + day
      }

      const dateTemp = year + '-' + month + '-' + day
      _date.setDate(_date.getDate() + 7) //日期重置
      return dateTemp
    },
    //图表选好时间后的操作
    async getTime(time) {
      if (time) {
        const _this = this
        const res = await serverRunChartData(time[0], time[1], _this.ServerCode)
        _this.option.xAxis.data = res.timeData
        _this.option.series[0].data = res.cpuData
        _this.option.series[1].data = res.memoryData
        _this.setEchartsOptions()
      } else {
        this.$message.error('请选择时间')
      }
    },
    //图表大小随窗口变化（防抖）
    changeSize() {
      const _this = this
      const myChart = _this.$echarts.getInstanceByDom(document.getElementById('echart')) //有的话就获取已有echarts实例的DOM节点。
      //执行
      if (this.time !== null) {
        clearTimeout(this.time)
      }
      this.time = setTimeout(() => {
        myChart.resize()
      }, 200)
    },
    //绘制echarts
    setEchartsOptions() {
      //生成ECharts
      const _this = this

      let myChart = _this.$echarts.getInstanceByDom(document.getElementById('echart')) //有的话就获取已有echarts实例的DOM节点。
      //console.log(myChart, 1343)
      if (typeof myChart === 'undefined') {
        // 如果不存在，就进行初始化。
        myChart = _this.$echarts.init(document.getElementById('echart'))
        // console.log(myChart, '不存在就初始化')
      } else {
        //console.log(1389043)
        myChart.dispose() //销毁
        myChart = _this.$echarts.init(document.getElementById('echart'))
      }
      // 绘制图表
      //大小随窗口变化
      window.addEventListener('resize', this.changeSize)
      myChart.setOption(this.option)
    },
    async getChartData(name, ServerCode) {
      const _this = this
      let EndTime = ''
      let BeginTime = ' '
      _this.ServerCode = ServerCode
      if (this.value1.length > 0) {
        console.log(this.value1, 'dwdqwq')
        BeginTime = this.value1[0]
        EndTime = this.value1[1]
      } else {
        EndTime = _this.getStandardDate()
        BeginTime = _this.getStandardDateBeforeWeek()
      }

      const res = await serverRunChartData(BeginTime, EndTime, ServerCode)
      _this.serverName = name
      _this.option.xAxis.data = res.timeData
      _this.option.series[0].data = res.cpuData
      _this.option.series[1].data = res.memoryData
      _this.setEchartsOptions()
    },
  },

  mounted() {
    const _this = this
    _this.getChartData('一期巡检服务器', 1)
    //点击服务器状态改变表格标题
    _this.$bus.$on('changeServerName', (name, ServerCode) => {
      _this.getChartData(name, ServerCode)
    })

    _this.setEchartsOptions()
    //图表时间筛选默认时间
    _this.initTime()
  },
  destroyed() {
    window.removeEventListener('resize', this.changeSize)
    clearTimeout(this.time)
    const _this = this
    _this.$bus.$off('changeServerName')
    const myChart = _this.$echarts.getInstanceByDom(document.getElementById('echart')) //有的话就获取已有echarts实例的DOM节点。
    //console.log(myChart, '销毁')
    if (typeof myChart !== 'undefined') {
      myChart.dispose()
      //console.log(myChart, '销毁完成')
    }
  },
}
</script>

<style scoped lang="scss">
ul {
  list-style-type: none;
}
.app-title {
  width: 100%;
  margin: 1rem 0;
}
.app-title {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.app-title > i {
  width: 0.3rem;
  height: 1rem;
  display: inline-block;
  background: #fff;
  margin-right: 0.5rem;
}
.app-title > p {
  margin: 0;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  font-size: 1.4rem;
  color: #fff;
  font-weight: 500;
  margin-left: 0.15rem;
}
.datePicker {
  caret-color: rgba(0, 0, 0, 0);
  .el-range-editor.el-input__inner {
    border: solid 0.1rem #48a8ff;
    background: none;
    height: 2.6rem;
    width: 30rem;
  }

  :deep(.el-range-editor .el-range-input) {
    background: none;
    color: #73a6e5 !important;
  }
  :deep(.el-date-editor .el-range-separator) {
    line-height: 1.7rem;
    color: #73a6e5 !important;
  }
  :deep(.el-date-editor .el-range__icon) {
    line-height: 1.9rem;
  }
  :deep(.el-date-editor .el-range__close-icon) {
    line-height: 1.9rem;
  }
}
</style>
