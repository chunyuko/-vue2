<template>
  <div>
    <el-form label-width="80px" :model="iForm" ref="iForm">
      <el-form-item
        :label="lableNames"
        :class="[
          formClassName,
          {
            specilSize:
              lableNames === '尺寸' ||
              lableNames === '消缺单名称' ||
              (lableNames === '缺陷类型' && noDetecttypeStyle !== false),
          },
          {
            specilSizeTwo: lableNames === '计划时间',
          },
          {
            specilBr: lableNames === '工作温度范围',
          },
          { specilDate: lableNames === '退运日期' && itemTypeis !== 'mulCheck' },
          { specilPlan: lableNames === '计划状态' },
        ]"
      >
        <label for="备注"></label>
        <el-input
          :id="lableNames"
          v-if="itemTypeis === 'text'"
          :placeholder="plaHolderIs"
          v-model="iForm.iptText"
          @blur="addDatas"
          :disabled="isDisable"
        ></el-input>
        <el-input
          v-if="itemTypeis === 'textarea'"
          type="textarea"
          :placeholder="plaHolderIs"
          v-model="iForm.iptTextarea"
          @blur="addDatas"
        ></el-input>
        <el-select
          ref="mySelect"
          v-if="itemTypeis === 'select'"
          :placeholder="plaHolderIs"
          v-model="iForm.seleVal"
          @focus="findOpts"
          @change="addDatas"
          filterable
          :disabled="isDisable"
        >
          <el-option
            v-for="(item, index) in opsI"
            :key="index"
            :label="item.vals"
            :value="item.id"
            :disabled="item.vals === '红外和可见光'"
          >
          </el-option>
        </el-select>
        <!-- 日期 -->
        <div class="block">
          <slot></slot>
          <el-date-picker
            v-if="itemTypeis === 'mulCheck'"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            class="mulDate"
            v-model="iForm.mulDate"
            @blur="addDatas"
            :disabled="isDisable"
          >
          </el-date-picker>
          <el-date-picker
            v-if="itemTypeis === 'sigCheck'"
            type="date"
            class="sigDate"
            placeholder="选择日期"
            v-model="iForm.sigDate"
            @change="addDatas"
            :disabled="isDisable"
          ></el-date-picker>
          <i class="iconfonts" v-if="itemTypeis === 'sigCheck'">&#xe63e;</i
          ><i class="iconfont" v-if="itemTypeis === 'mulCheck'">&#xe63e;</i>
          <i class="iconfontm" v-if="itemTypeis === 'mulCheck'">&#xe63e;</i>
          <i class="iconfontse" v-if="itemTypeis === 'select'">&#xe612;</i>
        </div>
        <!-- 单选框 -->
        <el-radio-group
          v-model="iForm.radio"
          class="radioWidth"
          v-if="itemTypeis === 'CheckBoxOne'"
          @change="addDatas"
          :disabled="isDisable"
        >
          <el-radio :label="index" v-for="(item, index) in checkOpt" :key="index">{{
            item
          }}</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <div v-if="itemTypeis === 'table'" class="miniBtn">
      <span
        v-for="(item, index) in conditions"
        :key="index"
        @click="handleTags(item)"
        class="litTabs"
      >
        <a href="javascript:;">{{ item }}</a>
      </span>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        append-to-body
        class="innerDia"
      >
        <span class="delSpan">确认删除所选内容吗?</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="delTab">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisibleif"
        width="30%"
        append-to-body
        class="innerDia"
      >
        <el-radio-group v-model="iForm.radio">
          <el-radio :label="index" v-for="(item, index) in isQualified" :key="index">{{
            item
          }}</el-radio>
        </el-radio-group>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleif = false">取 消</el-button>
          <el-button type="primary" @click="ifright">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <table-lists
      ref="childTab"
      class="alertTab"
      v-if="itemTypeis === 'table'"
      :tabTitle="tabTitleTo"
      :tabStyleTo="miniTab"
      tabColClassTo="true"
      hastitleYS="验收结论"
    ></table-lists>
  </div>
</template>
<script>
import TableLists from './zztable.vue'
import { patroCameraLedger, pullDownList } from '@/service/api/views/patrolDevice/deviceAlarm'
export default {
  name: 'SearchOpts',
  props: [
    'isOpts',
    'itemType',
    'searchDatas',
    'labName',
    'plaHolder',
    'checkOpts',
    'flexNums',
    'formClassTo',
    'optionIs',
    'identi',
    'toVal',
    'editChoseData',
    'iptsda',
    'filterIpt',
    'pullDownLists',
    'addTitleI',
    'diabledIs',
    'allDisableId',
    'handleDefeatI',
    'noDetecttypeStyle',
  ],
  inheritAttrs: false,
  inject: {
    allDisabled: { default: null },
    mrtipIs: { default: null },
    filterVals: { default: null },
    pullDownLists: { default: null },
    titleToSearch: { default: null },
  },
  data() {
    return {
      isQualified: ['合格', '不合格'],
      dialogVisible: false,
      dialogVisibleif: false,
      conditions: ['选择', '删除'],
      miniTab: 'width:127rem !important; max-height:27rem !important',
      options: this.optionIs,
      formClassName: this.formClassTo,
      isOptss: this.isOpts,
      itemTypeis: this.itemType,
      searchDataIs: this.searchDatas,
      lableNames: this.labName,
      plaHolderIs: this.plaHolder,
      checkOpt: this.checkOpts,
      iForm: {
        iptText: '',
        iptTextarea: '',
        seleVal: '',
        mulDate: '',
        sigDate: '',
        radio: '',
      },
      editTabDatas: {},
      showEditIs: {},
      ipts: {},
      cameraTypeIs: [],
      modellableI: '',
      modelTypeIs: 0,
      commonVal: {},
      befChangeLabel: '',
      tabTitleTo: [
        {
          label: '序号',
          prop: 'checkIs',
          type: 'selection',
          width: '60',
        },
        {
          label: '装置类型',
          prop: 'type',
          type: '',
          width: '120',
        },
        {
          label: '编号',
          prop: 'num',
          type: '',
          width: '80',
        },
        {
          label: '生产厂家',
          prop: 'produ',
          type: '',
          width: '120',
        },
        {
          label: '设备型号',
          prop: 'tnum',
          type: '',
          width: '120',
        },
        {
          label: '缺陷类型',
          //同告警等级
          prop: 'detecttype',
          type: '',
          width: '120',
        },
        {
          label: '缺陷描述',
          //同告警描述
          prop: 'alarmdescription',
          type: '',
          width: '220',
        },
        {
          label: '缺陷发现时间',
          prop: 'detectedate',
          type: '',
          width: '200',
        },
        {
          label: '验收人员',
          prop: 'checkperson',
          type: '',
          width: '120',
        },
        {
          label: '验收时间',
          prop: 'receptiontime',
          type: '',
          width: '200',
        },
        // {
        //   label: '验收结论',
        //   prop: 'receptionconclu',
        //   type: '',
        //   width: '150',
        // },
      ],
      //回显相关数据
      planRelation: {},
      DefeatRelation: {},
    }
  },
  methods: {
    handleTags(item) {
      // alert(this.addIsShow);
      if (item === '选择') {
        this.dialogVisibleif = true
      } else if (item === '删除') {
        const _this = this
        _this.$bus.$on('helloEdit', function (msg) {
          _this.hasSelection = msg
        })
        this.dialogVisible = true
      }
    },
    ifright() {
      alert('确定合格')
    },
    delTab() {
      this.dialogVisible = false
      this.$refs.childTab.deleteTab()
    },
    findOpts() {
      const _this = this
      //获取焦点  清空数据
      if (_this.iForm.seleVal) {
        _this.iForm.seleVal = null
      }
      _this.befChangeLabel = {
        lableName: _this.lableNames,
        options: _this.options,
      }
      // console.log(_this.befChangeLabel.lableName, '当前的label')
    },
    //input输入框绑定事件
    addDatas(value) {
      console.log(typeof value, 'input的值类型', value, '值')
      const _this = this
      const sd = new Date(_this.iForm.sigDate)
      const md0 = _this.iForm.mulDate ? new Date(_this.iForm.mulDate[0]) : null
      const md1 = _this.iForm.mulDate ? new Date(_this.iForm.mulDate[1]) : null
      const formatDate = sd.getFullYear() + '/' + (sd.getMonth() + 1) + '/' + sd.getDate()
      const formatMulDate0 =
        md0 !== null ? md0.getFullYear() + '/' + (md0.getMonth() + 1) + '/' + md0.getDate() : ''
      const formatMulDate1 =
        md1 !== null ? md1.getFullYear() + '/' + (md1.getMonth() + 1) + '/' + md1.getDate() : ''
      _this.$bus.$emit('input', {
        lableName: _this.lableNames,
        value1: _this.iForm.iptText,
        value2: _this.iForm.iptTextarea,
        value3: _this.iForm.seleVal,
        value03: Array.isArray(_this.options)
          ? _this.options.find((el) => {
              return el.id === _this.iForm.seleVal
            })
          : '',
        value4: [formatMulDate0, formatMulDate1],
        value5: formatDate,
        value6: value,
        value: '',
      })
    },
    //修改展示数据
    showRowData() {
      const _this = this
      _this.$bus.$on('showEdit', function (msg) {
        console.log('this.showEdit回显的数据', msg)
        if (msg) {
          //台账修改
          const vicionObj = [
            { lable: '运维单位', type: 'seleVal', valIs: ['station_name', 'stationName'] },
            { lable: '部门/班组', type: 'seleVal', valIs: ['section_name', 'sectionID'] },
            { lable: '算法版本', type: 'iptText', valIs: ['algorithm_version'] },
            { lable: '变电站', type: 'seleVal', valIs: ['station_id', 'stationID'] },
            {
              lable: '装置名称',
              type: ['seleVal', 'iptText'],
              valIs: ['camera_name', 'car_name'],
              special: 'iptSel',
            },
            { lable: '编号', type: 'iptText', valIs: ['number', 'car_number'] },
            { lable: '安装位置', type: 'iptText', valIs: ['place_position'] },
            { lable: '覆盖区域', type: 'seleVal', valIs: ['cover_area'] },
            { lable: '缺陷次数', type: 'iptText', valIs: ['defect_count'] },
            { lable: '红外功能', type: 'seleVal', valIs: ['ifr_state'], special: 'openOr' },
            { lable: '可见光功能', type: 'seleVal', valIs: ['ipc_state'], special: 'openOr' },
            { lable: '雨刷功能', type: 'seleVal', valIs: ['wiper_state'], special: 'openOr' },
            { lable: '黑夜模式', type: 'seleVal', valIs: ['night_state'], special: 'openOr' },
            { lable: '雨刷功能', type: 'seleVal', valIs: ['wiper_state'], special: 'openOr' },
            { lable: '移动侦探', type: 'seleVal', valIs: ['move_det_state'], special: 'openOr' },
            { lable: '红外流地址', type: 'iptText', valIs: ['video_url'] },
            { lable: '可见光流地址', type: 'iptText', valIs: ['ipc_video_url'] },
            { lable: '生产厂家', type: 'seleVal', valIs: ['manufacture'] },
            { lable: '出厂序列号', type: 'iptText', valIs: ['serialnumber', 'production_code'] },
            { lable: '设备主人', type: 'iptText', valIs: ['master'] },
            //机器人
            { lable: '尺寸', type: 'iptText', valIs: ['size'] },
            { lable: '重量', type: 'iptText', valIs: ['weight'] },
            { lable: '信号传输', type: 'iptText', valIs: ['transmission'] },
            { lable: '防护等级', type: 'iptText', valIs: ['protect_level'] },
            { lable: '通讯方式', type: 'iptText', valIs: ['comm_mode'] },
            { lable: '速度', type: 'iptText', valIs: ['carMoveSpeed'] },
            { lable: '左右定位精度', type: 'iptText', valIs: ['left_right_precision'] },
            { lable: '前后定位精度', type: 'iptText', valIs: ['front_back_precision'] },
            { lable: '导航方式', type: 'iptText', valIs: ['navigation'] },
            // { lable: '红外子码流', type: 'iptText', valIs: ['master'] },
            // { lable: '可见光主码流', type: 'iptText', valIs: ['master'] },
            // { lable: '可见光子码流', type: 'iptText', valIs: ['master'] },
            // { lable: '红外主码流', type: 'iptText', valIs: ['master'] },
            // { lable: '防跌落功能', type: 'seleVal', valIs: ['master'] },
            // { lable: '避障功能', type: 'seleVal', valIs: ['master'] },
            // { lable: '车灯功能', type: 'seleVal', valIs: ['master'] },
            // { lable: '充电房', type: 'seleVal', valIs: ['master'] },
            //声音采集器台账
            { lable: '规格型号', type: 'iptText', valIs: ['soundSpeciModel'] },
            { lable: '供电电压', type: 'seleVal', valIs: ['SupplyVol'] },
            { lable: '阵列功耗', type: 'iptText', valIs: ['PowerWaste'] },
            { lable: '工作温度范围', type: 'iptText', valIs: ['TempRange'] },
            { lable: '防水等级', type: 'iptText', valIs: ['WaterproofLevel'] },
            { lable: '信噪比', type: 'iptText', valIs: ['NoiseRatio'] },
            { lable: '灵敏度', type: 'iptText', valIs: ['Sensitivity'] },
            { lable: '频响范围', type: 'iptText', valIs: ['FreqRange'] },
            { lable: '阵列体积', type: 'iptText', valIs: ['ArraySize'] },
            { lable: '阵列重量', type: 'iptText', valIs: ['ArrayWeight'] },
            { lable: '阵列孔径', type: 'iptText', valIs: ['ArraySpan'] },
            { lable: '阵列个数', type: 'iptText', valIs: ['ArrEleNum'] },
            { lable: '采样频率', type: 'iptText', valIs: ['SampFreq'] },
            { lable: '指向性', type: 'iptText', valIs: ['Point'] },
            // { lable: '采集功能', type: 'iptText', valIs: ['OpenCollect'] },
            // { lable: '报警功能', type: 'iptText', valIs: ['OpenAlarm'] },
            //无人机
            { lable: '型号', type: 'iptText', valIs: ['carVersion'] },
            { lable: '类型', type: 'iptText', valIs: ['carType'] },
            { lable: '起降方式', type: 'iptText', valIs: ['flyLandMode'] },
            { lable: '空机重量(kg)', type: 'iptText', valIs: ['weight'] },
            { lable: '最大起飞重量(kg)', type: 'iptText', valIs: ['maxWeight'] },
            { lable: '抗风等级', type: 'iptText', valIs: ['resistWindLevel'] },
            { lable: '最大速度(m/h)', type: 'iptText', valIs: ['carMoveSpeed'] },
            { lable: '最大飞行高度(m)', type: 'iptText', valIs: ['carFlyHeight'] },
            { lable: '续航时间(分钟)', type: 'iptText', valIs: ['carFlyTime'] },
            { lable: '机身高度(m)', type: 'iptText', valIs: ['carHeight'] },
            { lable: '机身长度(m)', type: 'iptText', valIs: ['carLength'] },
            { lable: '机身宽度(m)', type: 'iptText', valIs: ['carWidth'] },
            // { lable: '控制方式', type: 'iptText', valIs: ['sampleFrequency'] },
            { lable: '作业半径(m)', type: 'iptText', valIs: ['workRadius'] },
            { lable: 'PTK功能', type: 'seleVal', valIs: ['openRTK'] },
            // 缺陷、告警
            { lable: '缺陷等级', type: 'seleVal', valIs: ['defect_level'] },
            { lable: '缺陷类型', type: 'seleVal', valIs: ['defect_type'] },
            { lable: '缺陷描述', type: 'iptText', valIs: ['defect_desc'] },
            { lable: '缺陷状态', type: 'iptText', valIs: ['defect_status'] },
            { lable: '缺陷发现人', type: 'iptText', valIs: ['report_person'] },
            { lable: '告警描述', type: 'iptText', valIs: ['alarmdescription'] },
            { lable: '告警等级', type: 'seleVal', valIs: ['alarmlevel'] },
            { lable: '确认状态', type: 'seleVal', valIs: ['authorizationstate'] },
            { lable: '处理单名称', type: 'iptText', valIs: ['sheet_desc'] },
            { lable: '编制人', type: 'iptText', valIs: ['create_person'] },
            { lable: '处理单状态', type: 'seleVal', valIs: ['sheet_status'] },
            { lable: '消缺单位', type: 'iptText', valIs: ['check_company'] },
            { lable: '验收人', type: 'iptText', valIs: ['check_person'] },
            { lable: '备注', type: 'iptText', valIs: ['comments'] },
            { lable: '详情', type: 'iptText', valIs: ['details'] },
            { lable: '验收结果', type: 'seleVal', valIs: ['check_result'] },
          ]
          vicionObj.forEach((item) => {
            if (_this.lableNames === item.lable) {
              if (item.type === 'radio') {
                _this.iForm.radio = Number(msg[item.valIs[0]])
              } else if (item.special === 'openOr') {
                _this.iForm.seleVal = msg[item.valIs[0]] === '0' ? '关' : '开'
              } else if (item.special === 'iptSel') {
                _this.iForm.seleVal = msg[item.valIs[0]] ? msg[item.valIs[0]] : msg[item.valIs[1]]
                _this.iForm.iptText = msg[item.valIs[0]] ? msg[item.valIs[0]] : msg[item.valIs[1]]
              } else {
                _this.iForm[item.type] = msg[item.valIs[0]]
                  ? msg[item.valIs[0]] === 'undefined'
                    ? null
                    : msg[item.valIs[0]]
                  : msg[item.valIs[1]]
              }
            }
          })
          //特殊选项
          if (_this.lableNames === '装置类型') {
            console.log(_this.options, '装置类型')
            const cameraNameI = _this.options.find((item) => {
              // console.log(item.id, msg.camera_type)
              return item.id === Number(msg.camera_type)
                ? Number(msg.camera_type)
                : Number(msg.car_name)
            })
            _this.iForm.seleVal = cameraNameI ? cameraNameI.vals : null
          } else if (_this.lableNames === '电压等级') {
            if (Array.isArray(msg.valLevelI)) {
              const valLevelI = msg.valLevelI.find((item) => {
                // console.log(item.id, msg.camera_type)
                return item.id === Number(msg.vol_level)
              })
              _this.iForm.seleVal = valLevelI.name ? valLevelI.name : msg.level
            }
          } else if (_this.lableNames === '生产厂家') {
            _this.iForm.iptText = msg.manufactureI
              ? msg.manufactureI.find((el) => {
                  return (el.id = Number(msg.manufacture))
                }).id
              : ''
            _this.iForm.iptText = msg.manufacture
          } else if (_this.lableNames === '设备型号') {
            const typeStr =
              msg.camera_type && msg.camera_type === 1 ? _this.options[0].ipc : _this.options[0].ifr
            const modelIs = typeStr.find((item) => {
              return item.id === Number(msg.type)
            })
            _this.iForm.seleVal = modelIs ? modelIs.vals : ''
          } else if (_this.lableNames === 'IP地址') {
            _this.iForm.iptText =
              msg.ipc_ip !== '' && msg.ifr_ip !== ''
                ? msg.ipc_ip + ' ' + msg.ifr_ip
                : msg.ipc_ip === ''
                ? msg.ifr_ip
                : msg.ipc_ip
          } else if (_this.lableNames === '维保类型') {
            //维保计划
            if (msg.type === '临时维护') {
              msg.type = 0
            } else if (msg.type === '月度维护') {
              msg.type = 1
            } else if (msg.type === '季度维护') {
              msg.type = 2
            } else if (msg.type === '年度维护') {
              msg.type = 3
            }
            _this.iForm.radio = Number(msg.type)
            _this.iForm.seleVal = Number(msg.type)
          } else if (_this.lableNames === '计划名称') {
            _this.iForm.iptText = msg.plan_desc
          } else if (_this.lableNames === '计划内容') {
            _this.iForm.iptText = msg.plan_content
          } else if (_this.lableNames === '计划时间') {
            //维保记录
            // if (_this.titleToSearch === '维保记录录入') {
            if (msg.plan_time && msg.plan_time.includes('-')) {
              //维保记录  根据计划名称显示计划时间
              const pt = new Date(msg.plan_time)
              const planTime = pt.getFullYear() + '/' + (pt.getMonth() + 1) + '/' + pt.getDate()
              _this.iForm.sigDate = msg.plan_time === '1970-01-01 08:00:00' ? null : planTime
            } else {
              _this.iForm.sigDate =
                msg.plan_time === '0' ? null : new Date(Number(msg.plan_time * 1000))
            }
            // }
            // //维保计划
            if (_this.titleToSearch === '计划新增') {
              _this.iForm.sigDate = Number(msg.plan_time) * 1000
            }
          } else if (_this.lableNames === '计划状态') {
            _this.iForm.seleVal = msg.result_status
          } else if (_this.lableNames === '备注') {
            _this.iForm.iptText = msg.plan_comments
          } else if (_this.lableNames === '是否生产周期计划') {
            _this.iForm.radio = Number(msg.is_cycle)
          } else if (_this.lableNames === '验收时间') {
            _this.iForm.sigDate = msg.check_time
          } else if (_this.lableNames === '告警发现时间') {
            const timeIs = msg.alarmfoundtime
            _this.iForm.sigDate = new Date(Number(timeIs * 1000))
          } else if (_this.lableNames === '发现时间') {
            _this.iForm.sigDate = Number(msg.defect_time * 1000) // msg.defect_time
          } else if (_this.lableNames === '编制时间') {
            _this.iForm.sigDate = msg.create_time
          } else if (_this.lableNames === '退运日期') {
            const timeIs = msg.return_time
            _this.iForm.sigDate = new Date(Number(timeIs * 1000))
          } else if (_this.lableNames === '投运日期') {
            const timeIs = msg.operation_time
            _this.iForm.sigDate = new Date(Number(timeIs * 1000))
          }
        }
      })
    },
    //初始默认显示的选项
    defaultFun() {
      // console.log('初始默认显示的选项----传递')
      const _this = this
      const pullParam = {
        task: 'getSelectList',
        // pageType: 0,
      }
      const firstChoice = [
        { label: '运维单位', id: 'id', ori: 0 },
        { label: '部门/班组', id: 'id', ori: 0 },
        { label: '电压等级', id: 'vals', ori: 0 },
        { label: '变电站', id: 'id', ori: 0 },
      ]
      firstChoice.forEach(async (item) => {
        if (_this.lableNames === item.label) {
          let timeI = 600
          setTimeout(() => {
            if (_this.options) {
              timeI = 800
              const optI = _this.options.find(async (item) => {
                const pullData = await pullDownList(pullParam)
                // console.log(pullData.data, '初始下拉')
                return item.fId === pullData
                  ? pullData.data.stationID[0].fId
                  : null || item.id === pullData
                  ? Number(pullData.data.stationID[0].vol_level)
                  : null
              })
              // console.log(optI, '选项')
              _this.iForm.seleVal = optI
              if (item.label === '变电站' && optI) {
                _this.$bus.$emit('operMaint', optI.id)
              }
            } else {
              timeI = 1900
            }
          }, timeI)
        }
      })
    },
  },
  computed: {
    isDisable() {
      return (
        // this.lableNames === '红外功能' ||
        // this.lableNames === '可见光功能' ||
        // this.lableNames === '雨刷功能' ||
        // this.lableNames === '黑夜模式' ||
        // this.lableNames === '移动侦探' ||
        // this.lableNames === '红外流地址' ||
        // this.lableNames === '可见光流地址' ||
        this.allDisabled === true || this.diabledIs === true || this.allDisableId === true
        //|| (this.handleDefeatI === true && this.lableNames === '详情') ||
        // (this.handleDefeatI === true && this.lableNames === '验收人')(
        //   this.handleDefeatI === true && this.lableNames === '验收结果'
        // )
      )
    },
    opsI() {
      //筛选联动
      const camType = this.filterVals.find((item) => {
        return item.lableName === '装置类型'
      })
      const valLev = this.filterVals.find((item) => {
        return item.lableName === '电压等级'
      })
      const devols = this.filterVals.find((item) => {
        return item.lableName === '部门/班组'
      })
      const matainComp = this.filterVals.find((item) => {
        return item.lableName === '运维单位'
      })
      if (this.befChangeLabel.lableName === '设备型号' && camType) {
        if (camType.value3 === 1) {
          return this.options[0].ipc
        } else if (camType.value3 === 0) {
          return this.options[0].ifr
        }
        // console.log(this.modellableI, '上一个失去焦点的label值')
      } else if (this.befChangeLabel.lableName === '设备型号' && !camType) {
        return this.options[0].ifr.concat(this.options[0].ipc)
      }
      if (this.befChangeLabel.lableName === '部门/班组' && matainComp) {
        const thisOpts = this.befChangeLabel.options.find((el) => {
          return el.fId === matainComp.value3
        })
        return thisOpts ? [thisOpts] : null
      }
      if (this.befChangeLabel.lableName === '变电站' && valLev && devols) {
        const thisOpts = this.befChangeLabel.options.find((el) => {
          // console.log(el, '选项的id', devols, '部门班组做中转')
          return el.fId === devols.value3 && Number(el.volLevel) === valLev.value3
        })
        return thisOpts ? [thisOpts] : null
      } else if (this.befChangeLabel.lableName === '电压等级' && !devols) {
        return null
      } else if (this.befChangeLabel.lableName === '变电站' && !valLev) {
        return null
      }
      return this.options
    },
  },
  components: {
    TableLists,
  },
  mounted() {
    const _this = this //Vue2方法中先存this
    _this.$nextTick(() => {
      _this.defaultFun()
    })
    _this.$bus.$on('showDefault', function (msg) {
      if (msg) {
        _this.defaultFun()
      }
    })
    //维保计划名称选择后回显相关内容
    if (_this.addTitleI && _this.addTitleI === '维保记录录入') {
      //小函数
      const planFun = () => {
        _this.$bus.$on('input', function (msg) {
          if (msg.lableName === '计划名称') {
            console.log('维保计划回显啦input', msg)
            const planParams = {
              // task: 'cameraPlanList',
              task: 'getCameraMaintain',
              maintainID: msg.value3,
              // pageType: pageTypeI,
              // planName: msg.value03.vals ? msg.value03.vals : '',
            }
            patroCameraLedger(planParams).then((res) => {
              _this.planRelation = res.data
              console.log(
                res.data,
                '维保计划名称查询--回显结果',
                'planRelation',
                _this.planRelation
              )
              delete _this.planRelation.plan_comments
              _this.$bus.$emit('showEdit', _this.planRelation)
            })
          }
        })
      }
      planFun()
      // if (this.mrtipIs.tipsI === '摄像机计划') {
      //   planFun(0)
      // } else if (this.mrtipIs.tipsI === '机器人计划') {
      //   planFun(1)
      // } else if (this.mrtipIs.tipsI === '无人机计划') {
      //   planFun(2)
      // } else if (this.mrtipIs.tipsI === '声音采集计划') {
      //   planFun(3)
      // }
    }
    if (_this.addTitleI && _this.addTitleI === '缺陷填报') {
      _this.$bus.$on('input', function (msg) {
        //回显装置信息
        if (msg.lableName === '装置名称') {
          const defeatParams = {
            task: 'getCamera',
            camera_id: msg.value03.vals ? msg.value03.id : '',
          }
          patroCameraLedger(defeatParams).then((res) => {
            if (res.data) {
              _this.DefeatRelation = res.data
            } else {
              return false
            }
            console.log(_this.DefeatRelation, '装置回显数据')
            _this.$bus.$emit('showEdit', _this.DefeatRelation)
          })
        }
      })
    }

    _this.$bus.$on('resetSelection', function (msg) {
      _this.iForm.iptText = msg
      _this.iForm.iptTextarea = msg
      _this.iForm.mulDate = msg
      _this.iForm.sigDate = msg
      _this.iForm.radio = msg
      if (
        _this.lableNames !== '运维单位' &&
        _this.lableNames !== '部门/班组' &&
        _this.lableNames !== '电压等级' &&
        _this.lableNames !== '变电站'
      ) {
        _this.iForm.seleVal = msg
      }
    })
  },
  beforeDestroy() {
    const _this = this
    // 销毁事件（重要）
    _this.$bus.$off('helloEdit')
    _this.$bus.$off('resetSelection')
    _this.$bus.$off('input')
    _this.$bus.$off('showEdit')
    _this.$bus.$off('showDefault')
  },
}
</script>
<style scoped lang="scss">
@import '../padcss/search.scss';
</style>
