<template>
  <el-table
    ref="multipleTable"
    align:center
    header-align:center
    :data="filtableData"
    stripe
    :height="selfHightIs"
    :style="tabStyle"
    :cell-style="numberStyle"
    @cell-click="cellHandleclick"
    @select="selectFun"
    @select-all="selectFun"
    :row-style="{ height: '3rem' }"
    :class="{ miniClass: tabColStyle }"
  >
    <el-table-column
      v-for="item in customTabTitle"
      :key="item.prop"
      :type="item.type"
      :prop="item.prop"
      :label="item.label"
      :width="item.width"
      class-name="cols"
      :show-overflow-tooltip="true"
    >
    </el-table-column>
    <el-table-column
      label="验收结论"
      prop="receptionconclu"
      v-if="titleIsYS === '验收结论(outSide)'"
      width="180"
    >
    </el-table-column>
    <!-- <el-table-column label="验收结论" v-if="titleIsYS === '验收结论'" width="180">
      <template slot-scope="scope">
        <span v-if="showConclu === true && scope.$index === rowIndex">{{
          radioVal.includes('-0') ? '合格' : '不合格'
        }}</span>
        <el-radio-group
          v-model="radioVal"
          @change="toggleSelection(scope.row, scope.$index, true)"
          v-else
        >
          <el-radio :label="scope.$index + '-' + '0'">合格 </el-radio>
          <el-radio :label="scope.$index + '-' + '1'">不合格 </el-radio>
        </el-radio-group>
      </template>
    </el-table-column> -->
    <el-table-column label="处理单详情" v-if="titleIsYS === '处理单详情'" width="180">
      <template>
        <!--  slot-scope="scope" -->
        <a href="javascript:;" style="color: #1484e8">生成处理单</a>
      </template>
    </el-table-column>
    <el-table-column label="详情" v-if="titleIsYS === '详情'" width="180">
      <template>
        <!--  slot-scope="scope" -->
        <a href="javascript:;" style="color: #1484e8">查看</a>
      </template>
    </el-table-column>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisibles"
      width="30%"
      append-to-body
      class="innerDia"
    >
      <span class="delSpan"
        >确认设置为
        <span> ' {{ radioVal.includes('-0') ? '合格' : '不合格' }} ' </span>
        吗?</span
      >
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibles = false">取 消</el-button>
        <el-button type="primary" @click="setTab">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 告警弹窗 -->
    <el-dialog
      title="告警确认"
      :visible.sync="dialogVisAlarm"
      width="30%"
      append-to-body
      class="innerDia"
    >
      <span>确认告警状态？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisAlarm = false">取 消</el-button>
        <el-button type="primary" @click="setAlarmTab">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 详情弹窗 -->
    <el-dialog title="告警详情" :visible.sync="dialogDetail" append-to-body class="innerDetail">
      <detail-info
        ref="childPreview"
        :addTitle="previewTitle"
        :searchDatas="searchDatasIs"
        @father="getFromGrason"
      ></detail-info>
    </el-dialog>
    <!-- 处理单弹窗 -->
    <el-dialog title="处理单填写" :visible.sync="dialogProcess" append-to-body class="innerProcess">
      <process-sheet
        @father="getFromGrason"
        :searchDatas="searchDatas"
        :showOr="false"
        ref="processRef"
      ></process-sheet>
    </el-dialog>
  </el-table>
</template>
<script>
import { patroCameraLedger, carData } from '@/service/api/views/patrolDevice/deviceAlarm.js'
import ProcessSheet from '../DeviceFlaw/DefectReport/processSheet.vue'
import DetailInfo from '../DeviceFlaw/DeviceAlarm/detailInfo.vue'
export default {
  name: 'TableLists',
  components: { ProcessSheet, DetailInfo },
  provide() {
    return { store: this.store }
  },
  props: [
    'tabTitle',
    'tabStyleTo',
    'tabColClassTo',
    'hastitleYS',
    'alarmDataIs',
    'mainTainDataIs',
    'defectDataIs',
    'selfHights',
  ],
  inject: {
    searchDatas: {
      default: null,
    },
    searchDatasIs: {
      default: null,
    },
    customTipI: { default: null },
    filterVals: { default: null },
    tabTitles: { default: null },
    finalParam: { default: null },
  },
  data() {
    return {
      previewTitle: '告警详情',
      addTabTitle: '处理单填报',
      selfHight: this.selfHights,
      dialogProcess: false,
      titleIsYS: this.hastitleYS,
      tabStyle: this.tabStyleTo,
      tabColStyle: this.tabColClassTo,
      filtableData: [],
      tableData: [],
      selectDatas: [],
      newDatasIs: [],
      selectRows: {},
      customTabTitle: this.tabTitle,
      editTabDat: [],
      minitabTitle: [],
      radioVal: '',
      dialogVisibles: false,
      dialogVisAlarm: false,
      dialogDetail: false,
      rowIndex: 0,
      showConclu: false,
      pageTotal: 0,
      pageNowI: 1,
      carmeId: {},
      store: {
        state: {
          stationID: '0',
          cameraID: '0',
          alarmid: '0',
          defeatId: '0',
        },
      },
      seleFilters: {},
      pullListArea: {},
    }
  },
  computed: {
    selfHightIs() {
      return this.selfHight ? this.selfHight : '88%'
    },
  },
  methods: {
    setTab() {
      this.dialogVisibles = false
      this.showConclu = true
      const ind = this.rowIndex

      this.tableData[ind].receptionconclu = this.radioVal.includes('-0') ? '合格' : '不合格'
      if (this.tableData[ind].receptionconclu === '合格') {
        this.tableData[ind].procestate = '已完成'
      } else {
        this.tableData[ind].procestate = '未完成'
      }
      // console.log(this.filtableData[ind])
    },
    //切换某一行的选中状态，第二个参数设置这一行选中与否（selected 为 true 则选中
    toggleRowSelected(row) {
      this.$nextTick(() => {
        // console.log(row, '台账传过来的row')
        setTimeout(() => {
          this.filtableData.forEach((item) => {
            if (row && row.cameraID === item.cameraID) {
              // console.log(this.filtableData, 'table数据')
              this.$refs.multipleTable.toggleRowSelection(item, true)
            }
          })
        }, 1000)
      })
    },

    toggleSelection(rows, index, selected) {
      this.dialogVisibles = true
      this.rowIndex = index
      // console.log(this.rowIndex)//从0开始
      const _this = this
      _this.$bus.$emit('radiVal', _this.radioVal)
      this.$refs.multipleTable.clearSelection()
      if (rows) {
        // console.log(rows)
        this.$refs.multipleTable.toggleRowSelection(rows)
      }
      // console.log(this.radioVal)
    },
    // 缺陷添加事件 el-table_1_column_16  cols el-table__cell
    cellHandleclick(row, column, cell, event) {
      // console.log('row', row)
      this.store.state.stationID = row.stationID
      this.store.state.cameraID = row.cameraID
      this.store.state.alarmid = row.alarmid
      this.store.state.defeatId = row.defectID
      if (column.label === '缺陷次数') {
        this.$parent.handleTags('缺陷次数')
        //回显数据
        setTimeout(() => {
          this.$bus.$emit('showEdit', row)
        }, 800)
      } else if (column.label === '详情') {
        this.dialogDetail = true
        const alarmCamParam = {
          task: 'getCamera',
          camera_id: row.cameraID,
        }
        patroCameraLedger(alarmCamParam).then((ress) => {
          // console.log(row.cameraID, 'row.cameraID', ress, '装置信息')
          setTimeout(() => {
            const _this = this
            _this.$bus.$emit('showEdit', ress.data)
          }, 500)
        })
      } else if (column.label === '处理单详情') {
        this.dialogProcess = true
        this.$bus.$emit('showEdit', {})
        setTimeout(() => {
          this.$bus.$emit('showDefault', true)
        }, 600)
      }
    },
    //告警确认事件
    setAlarmTab() {
      this.dialogVisAlarm = false
      this.$message.success('将告警状态改为"已确认"')
    },
    deleteTab() {
      this.newDatasIs = this.tableData.filter((el) => !this.selectDatas.includes(el))
      this.filtableData = this.newDatasIs
      // console.log('新数据是：', this.newDatasIs)
    },
    numberStyle(row, column, rowIndex, columnIndex) {
      // console.log(row.column.label, column)
      if (row.column.label === '缺陷次数') {
        return 'color:#2b94d3;text-decoration:underline;cursor:pointer'
      }
    },
    selectFun(selection, row) {
      this.selectDatas = selection //多个，数组对象
      this.selectRows = row //当前选择行
      // console.log('this.selectDatas', selection)
      // 调用事件
      const _this = this
      _this.$bus.$emit('helloEdit', this.selectRows)
      _this.$bus.$emit('selectDatas', this.selectDatas)
    },
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
    },
    // table列表
    selectIf(paras, dataType) {
      const params = paras
      const _this = this
      //小函数
      const dataFun = (result) => {
        const recData = result.data.data
        console.log(result, '接口请求数据recData')
        if (result.data.count) {
          _this.pageTotal = result.data.count
        } else if (result.data.data) {
          _this.pageTotal = result.data.data.length
        }
        _this.$bus.$emit('pagecontents', _this.pageTotal)
        //默认返回函数
        const defaultFun = (el) => {
          // console.log(el, 'table源素')
          const op = new Date(Number(el.operation_time * 1000))
          const operationTime = op.getFullYear() + '/' + (op.getMonth() + 1) + '/' + op.getDate()
          const re = new Date(Number(el.return_time * 1000))
          const returnTime = re.getFullYear() + '/' + (re.getMonth() + 1) + '/' + re.getDate()
          const retObj = {}
          const tabArr = [
            { lable: 'tname', vals: ['camera_name', 'car_name'] },
            { lable: 'type', vals: ['camera_type', 'car_type'] },
            { lable: 'transformer', vals: ['station_name'] },
            { lable: 'name', vals: ['company', 'company_name'] },
            { lable: 'part', vals: ['section_name'] },
            { lable: 'level', vals: ['vol_level'] },
            { lable: 'tnum', vals: ['type', 'carVersion'] },
            { lable: 'area', vals: ['cover_area'] },
            { lable: 'flawnum', vals: ['defect_count'] },
            { lable: 'place', vals: ['place_position'] },
            { lable: 'ip', vals: ['ip'] },
            { lable: 'num', vals: ['number', 'car_number'] },
            { lable: 'stationID', vals: ['station_id'] },
            { lable: 'sectionID', vals: ['sectionID'] },
            { lable: 'alarmCount', vals: ['alarm_count'] },
            { lable: 'cameraID', vals: ['camera_id'] },
            { lable: 'version', vals: ['algorithm_version'] },
            { lable: 'ifrIp', vals: ['ifr_ip'] },
            { lable: 'ifrType', vals: ['ifr_type'] },
            { lable: 'ipcIp', vals: ['ipc_ip'] },
            { lable: 'ipcType', vals: ['ipc_type'] },
            { lable: 'produ', vals: ['manufacture'] },
            { lable: 'parentID', vals: ['parent_id'] },
            { lable: 'Offline', vals: ['Offline'] },
            //机器人
            { lable: 'size', vals: ['size'] },
            { lable: 'weight', vals: ['weight'] },
            { lable: 'transmission', vals: ['transmission'] },
            { lable: 'protectLevel', vals: ['protectLevel'] },
            { lable: 'commMode', vals: ['comm_mode'] },
            { lable: 'robotProdu', vals: ['manufacture'] },
            { lable: 'leftRightPrecision', vals: ['left_right_precision'] },
            { lable: 'frontBackPrecision', vals: ['front_back_precision'] },
            { lable: 'navigation', vals: ['navigation'] },
            { lable: 'flyLandMode', vals: ['flyLandMode'] },
            { lable: 'maxWeight', vals: ['maxWeight'] },
            { lable: 'resistWindLevel', vals: ['resistWindLevel'] },
            { lable: 'carMoveSpeed', vals: ['carMoveSpeed'] },
            { lable: 'carFlyHeight', vals: ['carFlyHeight'] },
            { lable: 'carFlyTime', vals: ['carFlyTime'] },
            { lable: 'carHeight', vals: ['carHeight'] },
            { lable: 'carLength', vals: ['carLength'] },
            { lable: 'carID', vals: ['car_id'] },
            { lable: 'carWidth', vals: ['carWidth'] },
            { lable: 'carControl', vals: ['carControl'] },
            { lable: 'workRadius', vals: ['workRadius'] },
            { lable: 'openRTK', vals: ['openRTK'] },
            { lable: 'serialnumber', vals: ['production_code'] },
            //无人机
            { lable: 'typenum', vals: ['carVersion'] },
            { lable: 'typeIs', vals: ['car_type'] },
            //声纹
            { lable: 'soundSpeciModel', vals: ['SpecType'] },
            { lable: 'proVal', vals: ['SupplyVol'] },
            { lable: 'arrayPower', vals: ['PowerWaste'] },
            { lable: 'temperScope', vals: ['TempRange'] },
            { lable: 'waterProof', vals: ['WaterproofLevel'] },
            { lable: 'signalNoiseRadio', vals: ['NoiseRatio'] },
            { lable: 'sensitivity', vals: ['Sensitivity'] },
            { lable: 'frequencyRes', vals: ['FreqRange'] },
            { lable: 'directivity', vals: ['Point'] },
            { lable: 'arrayVolum', vals: ['ArraySize'] },
            { lable: 'arrayWeight', vals: ['ArrayWeight'] },
            { lable: 'arrayAperture', vals: ['ArraySpan'] },
            { lable: 'arrayNumer', vals: ['ArrEleNum'] },
            { lable: 'sampleFrequency', vals: ['SampFreq'] },
            //维保计划
            { lable: 'maintaintype', vals: ['type'] },
            { lable: 'planname', vals: ['plan_desc'] },
            { lable: 'plantime', vals: ['plan_time'] },
            { lable: 'planstate', vals: ['plan_status'] },
            { lable: 'remark', vals: ['plan_comments'] },
            { lable: 'plancontent', vals: ['plan_content'] },
            { lable: 'maintainID', vals: ['maintain_id'] },
            //维保记录
            { lable: 'maintaincontent', vals: ['maintain_content'] },
            { lable: 'maintaintime', vals: ['rec_time'] },
            { lable: 'maintaincompany', vals: ['maintain_company'] },
            { lable: 'maintainperson', vals: ['maintain_person'] },
            { lable: 'workleader', vals: ['charge_person'] },
            { lable: 'maintainconclusion', vals: ['result_status'] },
            //装置告警
            { lable: 'alarmlevel', vals: ['alarm_type'] },
            { lable: 'alarmdescription', vals: ['alarm_desc'] },
            { lable: 'alarmfoundtime', vals: ['alarm_time'] },
            { lable: 'cameraName', vals: ['camera_name'] },
            { lable: 'alarmid', vals: ['alarm_id'] },
            { lable: 'stationName', vals: ['station_name'] },
            { lable: 'authorizationstate', vals: ['status'] },
            //装置缺陷
            { lable: 'defectdescription', vals: ['defect_desc'] },
            { lable: 'detectedate', vals: ['defect_time'] },
            { lable: 'defectlevel', vals: ['defect_level'] },
            { lable: 'detecttype', vals: ['defect_type'] },
            { lable: 'associationis', vals: ['is_relation'] },
            { lable: 'detectstate', vals: ['defect_status'] },
            { lable: 'defectID', vals: ['defect_id'] },
            { lable: 'detecteperson', vals: ['report_person'] },
            //处理单
            { lable: 'sheetID', vals: ['sheet_id'] },
            { lable: 'sheetDesc', vals: ['sheet_desc'] },
            { lable: 'progdeveltime', vals: ['create_time'] },
            { lable: 'author', vals: ['create_person'] },
            { lable: 'comments', vals: ['comments'] },
            { lable: 'procestate', vals: ['sheet_status'] },
            { lable: 'checkperson', vals: ['check_person'] },
            { lable: 'receptiontime', vals: ['check_time'] },
            { lable: 'receptionconclu', vals: ['check_result'] },
          ]
          tabArr.forEach((item) => {
            const val0 = item.vals[0]
            const val1 = item.vals[1]
            retObj[item.lable] = el[val0]
              ? el[val0] === 'null'
                ? ''
                : el[val0]
              : el[val1] === 'null'
              ? ''
              : el[val1]
            //特殊选项
            retObj.operationtime =
              el.operation_time === '0' || el.operation_time === '-28800' ? '' : operationTime
            retObj.returntime =
              el.return_time === '0' || el.return_time === '-28800' ? '' : operationTime
            retObj.receptionconclu =
              el.check_result === '0' &&
              el.check_person === '' &&
              el.check_time === '1970-01-01 08:00:00'
                ? ''
                : el.check_result === '1'
                ? '合格'
                : '不合格'
          })
          return retObj
        }
        if (Array.isArray(recData)) {
          _this.tableData = recData.map((res) => {
            return defaultFun(res)
          })
          // console.log(_this.tableData, 'tableData')
          _this.filtableData = _this.tableData
          //根据cameraID展示装置的相关信息
          _this.filtableData.map((item) => {
            const camIdparam = { task: 'getCamera', camera_id: item.cameraID }
            //覆盖区域返回id  根据下拉数据匹配区域名称
            patroCameraLedger(camIdparam).then((ress) => {
              setTimeout(() => {
                // let aeraIs = ''
                if (_this.pullListArea.aeraList) {
                  console.log(
                    _this.pullListArea.aeraList,
                    '监听下拉数据',
                    ress.data,
                    '根据caId回显的数据'
                  )
                  const aeraIs = _this.pullListArea.aeraList.find((el) => {
                    return el.id === ress.data.cover_area
                  })
                  console.log(aeraIs, 'aeraIs')
                  item.area = item.area ? item.area : aeraIs ? aeraIs.name : null
                }

                item.place = item.place ? item.place : ress.data ? ress.data.place_position : null
                item.ip = item.ip ? item.ip : ress.data ? ress.data.ipc_ip : null
                item.version = item.version
                  ? ress
                    ? item.version
                    : ress.data.algorithm_version
                  : null
                return item
              }, 800)
            })
          })
        }
      }

      //cameraData.php
      if (dataType === 'cameraData') {
        patroCameraLedger(params).then((result) => {
          dataFun(result)
        })
      } else if (dataType === 'carData') {
        carData(params).then((result) => {
          dataFun(result)
        })
      }
    },
    //处理单\转缺陷弹窗
    getFromGrason(val) {
      this.dialogProcess = val
      this.dialogDetail = val
    },
  },
  mounted() {
    //  请求巡视摄像机列表数据
    const _this = this
    // 新增
    _this.$bus.$on('pullDownLists', function (msg) {
      _this.pullListArea = msg
      // console.log(_this.pullListArea, '监听下拉数据')
    })
    _this.$bus.$on('toAddTabs', function (msg) {
      // console.log('addtab', msg.part)
      if (msg.part !== '') {
        _this.filtableData.push(msg)
      } else {
        _this.$message.error('部门/班组不能为空,请重新添加')
      }
      // console.log('新数据是：', this.newDatasIs)
    })

    // 自定义字段
    _this.$bus.$on('tofatherdata', function (msg) {
      // debugger
      const arrMsg = JSON.parse(JSON.stringify(msg))
      // console.log(msg, arrMsg)
      if (arrMsg) {
        if (arrMsg[0].label === '全部') {
          arrMsg.shift()
        }
        _this.customTabTitle = arrMsg
      }

      if (_this.customTabTitle[0].type !== 'selection') {
        _this.customTabTitle.unshift(
          {
            label: '',
            prop: 'checkIs',
            type: 'selection',
            width: '',
          },
          {
            label: '序号',
            prop: 'id',
            type: 'index',
            width: '80',
          }
        )
      }
    })
    //minitab

    if (_this.tabColStyle === 'true') {
      _this.minitabTitle = _this.tabTitle.map((item) => {
        return {
          label: item.label,
          prop: item.prop,
          type: item.type,
          width: item.width * 0.8,
        }
      })
      // console.log('this.minitabTitle')
      _this.customTabTitle = _this.minitabTitle
    }
  },
  beforeDestroy() {
    const _this = this
    // 销毁事件（重要）
    _this.$bus.$emit('helloEdit', _this.selectRows)
    _this.$bus.$off('toAddTabs')
    _this.$bus.$off('tofatherdata')
    _this.$bus.$off('input')
    _this.$bus.$off('pageNow')
    _this.$bus.$off('filterVals')
  },
}
</script>
<style scoped lang="scss">
@import '../padcss/zztable.scss';
</style>
