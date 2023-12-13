<template>
  <div>
    <el-form class="form" label-width="10rem">
      <el-form-item v-for="(val, index) in searchDatasSon" :key="index" :label="val.formtitle">
        <!--下拉框-->
        <el-select
          v-if="val.type === 1"
          v-model="val.selected"
          placeholder="请选择"
          :disabled="isdisabled.length === 0 ? false : isdisabled[index].disabled"
          @change="changeOptions($event, val.formtitle, index)"
          filterable
        >
          <el-option
            v-for="(option_content, index_content) in val.formcontent"
            :key="index_content"
            :label="val.formcontent[index_content]"
            :value="val.value[index_content]"
          ></el-option>
        </el-select>
        <!--   时间选择器 -->
        <!--         <el-col :span="11" v-if="val.type === 2"> -->
        <el-date-picker
          v-if="val.type === 2"
          type="datetime"
          placeholder="选择日期"
          v-model="val.selected"
          style="width: 100%"
          value-format="yyyy-MM-dd HH:mm:ss"
        ></el-date-picker>
        <!--   </el-col> -->
        <!--     <el-col class="line" :span="2" style="padding-left: 12px" v-if="val.type === 2">至</el-col>
        <el-col :span="11" v-if="val.type === 2">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="val.date2"
            style="width: 100%"
          ></el-date-picker>
        </el-col> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  getOptionsToStation,
  getOptionsDevice,
  getOptionsPoint,
  getAllArea,
  getAllSpace,
  getFirstDev,
} from '../../../../views/manageInspectionResults/js/commonFun'
export default {
  name: 'insResultforms',
  props: ['searchDatas'],
  data() {
    return {
      //下拉框是否能选
      isdisabled: [],
      searchDatasSon: [],
      //后端请求的数据储存，不改变，searchDatasSon从中取数据
      searchDatasTemplate: [],
      form: {},
    }
  },
  methods: {
    //筛选选项
    siftForm() {
      const length = this.searchDatasSon.length
      const myArray = []
      for (let i = 0; i < length; i++) {
        myArray.push(this.searchDatasSon[i].selected)
      }
      return myArray
    },
    //重置选项
    resetForm() {
      const length = this.searchDatasSon.length
      for (let i = 0; i < length; i++) {
        this.searchDatasSon[i].selected = ''
      }
    },
    //初始化或重置或重新选择（运营单位、部门/班组、电压等级）下拉框状态
    //flag===1初始化或重置、flag===2重新选择运营单位、flag===3重新选择部门/班组、flag===4重新选择电压等级
    //event选中的选项
    initdisabled(flag, event) {
      this.isdisabled.length = 0
      //记录运营单位、部门/班组、电压等级、变电站、区域、间隔、设备名称、点位名称在数组中的位置

      let num1 = ''
      let num2 = ''
      let num3 = ''
      let num4 = ''
      let num5 = ''
      let num6 = ''
      let num7 = ''
      let num8 = ''
      for (let i = 0; i < this.searchDatasSon.length; i++) {
        if (this.searchDatasSon[i].formtitle === '运营单位') {
          num1 = i
        }
        if (this.searchDatasSon[i].formtitle === '部门/班组') {
          num2 = i
        }

        if (this.searchDatasSon[i].formtitle === '电压等级') {
          num3 = i
        }
        if (this.searchDatasSon[i].formtitle === '变电站') {
          num4 = i
        }
        if (this.searchDatasSon[i].formtitle === '区域') {
          num5 = i
        }
        if (this.searchDatasSon[i].formtitle === '间隔') {
          num6 = i
        }
        if (this.searchDatasSon[i].formtitle === '设备名称') {
          num7 = i
        }
        if (this.searchDatasSon[i].formtitle === '点位名称') {
          num8 = i
        }
        //初始化时将间隔、设备名称、点位名称禁用
        if (
          this.searchDatasSon[i].formtitle === '间隔' ||
          this.searchDatasSon[i].formtitle === '设备名称' ||
          this.searchDatasSon[i].formtitle === '点位名称'
        ) {
          const data = {
            formtitle: this.searchDatasSon[i].formtitle,
            disabled: true,
          }
          this.isdisabled.push(data)
        } else {
          const data = {
            formtitle: this.searchDatasSon[i].formtitle,
            disabled: false,
          }
          this.isdisabled.push(data)
        }
      }

      switch (flag) {
        case 1:
          if (this.searchDatasTemplate.length !== 0) {
            //默认选中（从上到下）
            //默认运营单位（下拉框选项第一个）
            this.searchDatasSon[num1].selected = this.searchDatasTemplate[num1].value[0]
            //运营单位作为条件部门/班组下拉框
            this.Options(this.searchDatasSon[num1].selected, num2)
            //默认部门/班组（下拉框选项第一个）
            this.searchDatasSon[num2].selected = this.searchDatasSon[num2].value[0]
            //默认部门/班组作为条件电压等级下拉框
            this.VolLevelOptions(this.searchDatasSon[num2].selected, num3)
            //默认电压等级（下拉框选项第一个）
            this.searchDatasSon[num3].selected = this.searchDatasSon[num3].value[0]
            //默认电压等级作为条件变电站下拉框
            this.OptionsStations(this.searchDatasSon[num3].selected, num4)
            this.searchDatasSon[num4].selected = this.searchDatasSon[num4].value[0]
            //存在区域选项时才执行
            if (num5 !== '') {
              //区域下拉框
              this.searchDatasSon[num5].formcontent.length = 0
              this.searchDatasSon[num5].value.length = 0
              const stationId = this.searchDatasSon[num4].selected
              getAllArea(stationId).then((data) => {
                for (let n = 0; n < data.length; n++) {
                  this.searchDatasSon[num5].formcontent.push(data[n].Area_Desc)
                  this.searchDatasSon[num5].value.push(data[n].Area_Id)
                }
              })
              //获得区域下拉框内容
              // getOptionsDevice(stationId).then((data) => {
              //   for (let n = 0; n < data.length; n++) {
              //     this.searchDatasSon[num5].formcontent.push(data[n].FirstDevDesc)
              //     this.searchDatasSon[num5].value.push(data[n].FirstDevID)
              //   }
              // })
            }
          }
          break
        case 2:
          //默认选中（从上到下）
          //运营单位
          this.searchDatasSon[num1].selected = event
          this.searchDatasSon[num5].selected = ''
          this.searchDatasSon[num6].selected = ''
          this.searchDatasSon[num7].selected = ''
          this.searchDatasSon[num8].selected = ''
          //运营单位作为条件部门/班组下拉框
          this.Options(this.searchDatasSon[num1].selected, num2)
          //默认部门/班组（下拉框选项第一个）
          this.searchDatasSon[num2].selected = this.searchDatasSon[num2].value[0]
          //默认部门/班组作为条件电压等级下拉框
          this.VolLevelOptions(this.searchDatasSon[num2].selected, num3)
          //默认电压等级（下拉框选项第一个）
          this.searchDatasSon[num3].selected = this.searchDatasSon[num3].value[0]
          //默认电压等级作为条件变电站下拉框
          this.OptionsStations(this.searchDatasSon[num3].selected, num4)
          this.searchDatasSon[num4].selected = this.searchDatasSon[num4].value[0]
          //存在设备名称时才执行
          if (num5 !== '') {
            //区域下拉框
            this.searchDatasSon[num5].formcontent.length = 0
            this.searchDatasSon[num5].value.length = 0
            const stationId = this.searchDatasSon[num4].selected
            getAllArea(stationId).then((data) => {
              for (let n = 0; n < data.length; n++) {
                this.searchDatasSon[num5].formcontent.push(data[n].Area_Desc)
                this.searchDatasSon[num5].value.push(data[n].Area_Id)
              }
            })
          }
          break
        case 3:
          //部门/班组
          this.searchDatasSon[num2].selected = event
          this.searchDatasSon[num5].selected = ''
          this.searchDatasSon[num6].selected = ''
          this.searchDatasSon[num7].selected = ''
          this.searchDatasSon[num8].selected = ''
          //默认部门/班组作为条件电压等级下拉框
          this.VolLevelOptions(this.searchDatasSon[num2].selected, num3)
          //默认电压等级（下拉框选项第一个）
          this.searchDatasSon[num3].selected = this.searchDatasSon[num3].value[0]
          //默认电压等级作为条件变电站下拉框
          this.OptionsStations(this.searchDatasSon[num3].selected, num4)
          this.searchDatasSon[num4].selected = this.searchDatasSon[num4].value[0]
          //存在设备名称时才执行
          if (num5 !== '') {
            //区域下拉框
            this.searchDatasSon[num5].formcontent.length = 0
            this.searchDatasSon[num5].value.length = 0
            const stationId = this.searchDatasSon[num4].selected
            getAllArea(stationId).then((data) => {
              for (let n = 0; n < data.length; n++) {
                this.searchDatasSon[num5].formcontent.push(data[n].Area_Desc)
                this.searchDatasSon[num5].value.push(data[n].Area_Id)
              }
            })
          }
          break
        case 4:
          //电压等级
          this.searchDatasSon[num3].selected = event
          this.searchDatasSon[num5].selected = ''
          this.searchDatasSon[num6].selected = ''
          this.searchDatasSon[num7].selected = ''
          this.searchDatasSon[num8].selected = ''
          //默认电压等级作为条件变电站下拉框
          this.OptionsStations(this.searchDatasSon[num3].selected, num4)
          this.searchDatasSon[num4].selected = this.searchDatasSon[num4].value[0]
          //存在设备名称时才执行
          if (num5 !== '') {
            //区域下拉框
            this.searchDatasSon[num5].formcontent.length = 0
            this.searchDatasSon[num5].value.length = 0
            const stationId = this.searchDatasSon[num4].selected
            getAllArea(stationId).then((data) => {
              for (let n = 0; n < data.length; n++) {
                this.searchDatasSon[num5].formcontent.push(data[n].Area_Desc)
                this.searchDatasSon[num5].value.push(data[n].Area_Id)
              }
            })
          }
          break
        case 5:
          //选择的变电站id
          this.searchDatasSon[num4].selected = event
          this.isdisabled[num5].disabled = false
          this.searchDatasSon[num5].selected = ''
          this.searchDatasSon[num6].selected = ''
          this.searchDatasSon[num7].selected = ''
          this.searchDatasSon[num8].selected = ''
          //存在设备名称时才执行
          if (num5 !== '') {
            //区域下拉框
            this.searchDatasSon[num5].formcontent.length = 0
            this.searchDatasSon[num5].value.length = 0
            const stationId = this.searchDatasSon[num4].selected
            getAllArea(stationId).then((data) => {
              for (let n = 0; n < data.length; n++) {
                this.searchDatasSon[num5].formcontent.push(data[n].Area_Desc)
                this.searchDatasSon[num5].value.push(data[n].Area_Id)
              }
            })
          }
          break
        case 6:
          //选择的区域id
          this.searchDatasSon[num5].selected = event
          this.isdisabled[num5].disabled = false
          this.isdisabled[num6].disabled = false
          this.searchDatasSon[num6].selected = ''
          this.searchDatasSon[num7].selected = ''
          this.searchDatasSon[num8].selected = ''
          //存在设备名称时才执行
          if (num6 !== '') {
            //区域下拉框
            this.searchDatasSon[num6].formcontent.length = 0
            this.searchDatasSon[num6].value.length = 0
            const areaId = this.searchDatasSon[num5].selected
            getAllSpace(areaId).then((data) => {
              for (let n = 0; n < data.length; n++) {
                this.searchDatasSon[num6].formcontent.push(data[n].SpaceDesc)
                this.searchDatasSon[num6].value.push(data[n].SpaceID)
              }
            })
          }
          break
        case 7:
          //选择的间隔id
          this.searchDatasSon[num6].selected = event
          this.isdisabled[num5].disabled = false
          this.isdisabled[num6].disabled = false
          this.isdisabled[num7].disabled = false
          this.searchDatasSon[num7].selected = ''
          this.searchDatasSon[num8].selected = ''
          //存在设备名称时才执行
          if (num7 !== '') {
            //区域下拉框
            this.searchDatasSon[num7].formcontent.length = 0
            this.searchDatasSon[num7].value.length = 0
            const spaceID = this.searchDatasSon[num6].selected
            getFirstDev(spaceID).then((data) => {
              for (let n = 0; n < data.length; n++) {
                this.searchDatasSon[num7].formcontent.push(data[n].FirstDevDesc)
                this.searchDatasSon[num7].value.push(data[n].FirstDevID)
              }
            })
          }
          break
        default:
      }
    },
    initTime() {
      //默认初始时间和结束时间
      for (let i = 0; i < this.searchDatasSon.length; i++) {
        if (this.searchDatasSon[i].formtitle === '开始时间') {
          this.searchDatasSon[i].selected = this.getStandardDateBeforeWeek()
        }
        if (this.searchDatasSon[i].formtitle === '结束时间') {
          this.searchDatasSon[i].selected = this.getStandardDate()
        }
      }
    },
    //初始化结束时间为当前时间，开始时间是结束时间前七天
    getStandardDate() {
      const _date = new Date()
      const year = _date.getFullYear()
      let month = _date.getMonth() + 1
      let day = _date.getDate()
      let hour = _date.getHours()
      let minute = _date.getMinutes()
      let second = _date.getSeconds()
      if (month < 10) {
        month = '0' + month
      }
      if (day < 10) {
        day = '0' + day
      }
      if (hour < 10) {
        hour = '0' + hour
      }
      if (minute < 10) {
        minute = '0' + minute
      }
      if (second < 10) {
        second = '0' + second
      }
      return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
    },
    getStandardDateBeforeWeek() {
      const _date = new Date() //获取今天日期
      _date.setDate(_date.getDate() - 7) //日期回到七天前
      const year = _date.getFullYear()
      let month = _date.getMonth() + 1
      let day = _date.getDate()
      let hour = _date.getHours()
      let minute = _date.getMinutes()
      let second = _date.getSeconds()
      if (month < 10) {
        month = '0' + month
      }
      if (day < 10) {
        day = '0' + day
      }
      if (hour < 10) {
        hour = '0' + hour
      }
      if (minute < 10) {
        minute = '0' + minute
      }
      if (second < 10) {
        second = '0' + second
      }
      const dateTemp = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
      _date.setDate(_date.getDate() + 7) //日期重置
      return dateTemp
    },
    //选项变化时响应处理
    changeOptions(event, val, index) {
      switch (val) {
        case '运营单位': {
          this.initdisabled(2, event)
          break
        }
        case '部门/班组': {
          this.initdisabled(3, event)
          break
        }
        case '电压等级': {
          this.initdisabled(4, event)
          break
        }
        case '变电站': {
          this.initdisabled(5, event)
          break
        }
        case '区域': {
          this.initdisabled(6, event)
          break
        }
        case '间隔': {
          this.initdisabled(7, event)
          break
        }
        //待设备类有值才能开放
        //点位名称受设备名称以及设备类型控制，设置flag来记录设备名称以及设备类型是否有选中值
        //流程先设备名称以及设备类型是否有选中值，记录到flag,将点位名称选中清空,最后根据flag判断是否能选
        //根据选择的设备名称和设备类型选择可选择的点位名称
        case '设备名称': {
          let flag = 0
          //用来记住变化的下拉框的下一级在数组的什么位置，减少循环嵌套
          let num = ''
          //记录设备类型
          let GridDevType = ''
          for (let i = 0; i < this.searchDatasSon.length; i++) {
            if (this.searchDatasSon[i].formtitle === '设备类型') {
              if (this.searchDatasSon[i].selected !== '') {
                GridDevType = this.searchDatasSon[i].selected
                flag = 1
              }
            }
          }
          for (let i = 0; i < this.isdisabled.length; i++) {
            this.isdisabled[i].disabled = false
            //只要触发设备名称以及设备类型change函数，就将点位名称选中清空
            if (this.isdisabled[i].formtitle === '点位名称') {
              num = i
              this.searchDatasSon[i].selected = ''
            }
          }
          if (this.isdisabled[num].formtitle === '点位名称' && flag === 0) {
            this.isdisabled[num].disabled = true
          }
          //设备名称以及设备类型是都有选中值，后端查询
          if (this.isdisabled[num].formtitle === '点位名称' && flag === 1) {
            getOptionsPoint(event, GridDevType).then((data) => {
              this.searchDatasSon[num].formcontent.length = 0
              this.searchDatasSon[num].value.length = 0
              for (let n = 0; n < data.length; n++) {
                this.searchDatasSon[num].formcontent.push(data[n].Device_Desc)
                this.searchDatasSon[num].value.push(data[n].Device_Id)
              }
            })
          }
          break
        }
        case '设备类型': {
          //设备名称是否选中
          let flag = 0
          //用来记住变化的下拉框的下一级在数组的什么位置，减少循环嵌套
          let num = ''
          //记录设备类型
          let FirstDevID = ''
          for (let i = 0; i < this.searchDatasSon.length; i++) {
            if (this.searchDatasSon[i].formtitle === '设备名称') {
              if (this.searchDatasSon[i].selected !== '') {
                FirstDevID = this.searchDatasSon[i].selected
                flag = 1
              }
            }
          }

          for (let i = 0; i < this.isdisabled.length; i++) {
            this.isdisabled[i].disabled = false
            if (this.isdisabled[i].formtitle === '点位名称') {
              num = i
              this.searchDatasSon[i].selected = ''
            }
          }
          if (this.isdisabled[num].formtitle === '点位名称' && flag === 0) {
            this.isdisabled[num].disabled = true
          }
          //设备名称以及设备类型是都有选中值，后端查询
          if (this.isdisabled[num].formtitle === '点位名称' && flag === 1) {
            getOptionsPoint(FirstDevID, event).then((data) => {
              this.searchDatasSon[num].formcontent.length = 0
              this.searchDatasSon[num].value.length = 0
              for (let n = 0; n < data.length; n++) {
                this.searchDatasSon[num].formcontent.push(data[n].Device_Desc)
                this.searchDatasSon[num].value.push(data[n].Device_Id)
              }
            })
          }
          break
        }
        default:
      }
    },
    //部门/班组、电压等级下拉框
    Options(event, num) {
      this.searchDatasSon[num].formcontent.length = 0
      this.searchDatasSon[num].value.length = 0
      for (let n = 0; n < this.searchDatasTemplate[num].fid.length; n++) {
        if (this.searchDatasTemplate[num].fid[n] === event) {
          this.searchDatasSon[num].formcontent.push(this.searchDatasTemplate[num].formcontent[n])

          this.searchDatasSon[num].value.push(this.searchDatasTemplate[num].value[n])
        }
      }
    },
    //电压等级下拉框(去重，排序)
    VolLevelOptions(event, num) {
      this.searchDatasSon[num].formcontent.length = 0
      this.searchDatasSon[num].value.length = 0
      for (let n = 0; n < this.searchDatasTemplate[num].fid.length; n++) {
        if (
          this.searchDatasTemplate[num].fid[n] === event &&
          this.searchDatasSon[num].value.indexOf(this.searchDatasTemplate[num].value[n]) === -1
        ) {
          this.searchDatasSon[num].value.push(this.searchDatasTemplate[num].value[n])
        }
      }
      this.searchDatasSon[num].value = this.searchDatasSon[num].value.sort()
      for (let i = 0; i < this.searchDatasSon[num].value.length; i++) {
        switch (this.searchDatasSon[num].value[i]) {
          case '0':
            this.searchDatasSon[num].formcontent.push('750kV')
            break
          case '1':
            this.searchDatasSon[num].formcontent.push('500kV')
            break
          case '2':
            this.searchDatasSon[num].formcontent.push('330kV')
            break
          case '3':
            this.searchDatasSon[num].formcontent.push('220kV')
            break
          case '4':
            this.searchDatasSon[num].formcontent.push('110kV')
            break
          case '5':
            this.searchDatasSon[num].formcontent.push('35kV')
            break
          case '6':
            this.searchDatasSon[num].formcontent.push('10kV')
            break
          case '7':
            this.searchDatasSon[num].formcontent.push('400V')
            break
          case '8':
            this.searchDatasSon[num].formcontent.push('66kV')
            break
          case '9':
            this.searchDatasSon[num].formcontent.push('1000kV')
            break
          default:
            this.searchDatasSon[num].formcontent.push('')
        }
      }
    },
    //变电站下拉框
    OptionsStations(event, num) {
      this.searchDatasSon[num].formcontent.length = 0
      this.searchDatasSon[num].value.length = 0
      for (let n = 0; n < this.searchDatasTemplate[num].VolLevel.length; n++) {
        if (this.searchDatasTemplate[num].VolLevel[n] === event) {
          this.searchDatasSon[num].formcontent.push(this.searchDatasTemplate[num].formcontent[n])
          this.searchDatasSon[num].value.push(this.searchDatasTemplate[num].value[n])
        }
      }
    },
    //界面跳转调整界面下拉框
    jumpSetForm(stationID) {
      let num1 = ''
      let num2 = ''
      let num3 = ''
      let num4 = ''
      let num5 = ''
      for (let i = 0; i < this.searchDatasSon.length; i++) {
        if (this.searchDatasSon[i].formtitle === '运营单位') {
          num1 = i
        }
        if (this.searchDatasSon[i].formtitle === '部门/班组') {
          num2 = i
        }

        if (this.searchDatasSon[i].formtitle === '电压等级') {
          num3 = i
        }
        if (this.searchDatasSon[i].formtitle === '变电站') {
          num4 = i
        }
        if (this.searchDatasSon[i].formtitle === '区域') {
          num5 = i
        }
      }
      this.searchDatasSon[num4].selected = stationID
      for (let i = 0; i < this.searchDatasSon[num4].value.length; i++) {
        if (this.searchDatasSon[num4].value[i] === stationID) {
          this.searchDatasSon[num2].selected = this.searchDatasSon[num4].fid[i]
          this.searchDatasSon[num3].selected = this.searchDatasSon[num4].VolLevel[i]
        }
      }
      for (let i = 0; i < this.searchDatasSon[num2].value.length; i++) {
        if (this.searchDatasSon[num2].value[i] === this.searchDatasSon[num2].selected) {
          this.searchDatasSon[num1].selected = this.searchDatasSon[num2].fid[i]
        }
      }
      if (num5 !== '') {
        this.initdisabled(5, stationID)
      }
    },
  },
  beforeMount() {
    this.searchDatasSon = JSON.parse(JSON.stringify(this.searchDatas))
    //初始化筛选时间
    this.initTime()
    getOptionsToStation(this.searchDatasSon).then((value) => {
      this.searchDatasSon = value
      this.searchDatasTemplate = JSON.parse(JSON.stringify(value))
      //初始化下拉框状态
      this.initdisabled(1)
      const selected = this.siftForm()
      this.$emit('initTable', selected)
    })
  },
}
</script>

<style scoped lang="scss">
.form {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  :deep(.el-input.is-disabled .el-input__inner) {
    background-color: #14357b;
  }
}
:deep(.el-input__inner) {
  color: #fff;
}
</style>
