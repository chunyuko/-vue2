<template>
  <el-form>
    <div v-if="hasTitles !== 'false'" class="talTittle">
      <div class="isTittle" :style="classNameTo">
        <slot></slot>
      </div>
      <div class="isLine"></div>
    </div>

    <el-form-item label="" prop="name">
      <search-opts
        ref="searchPart"
        :isOpts="item.opts !== ''"
        :itemType="item.typeis"
        :labName="item.labelName"
        :plaHolder="item.placeHolder"
        :checkOpts="item.opts"
        :diabledIs="item.disableI"
        v-for="(item, index) in searchIsShow"
        :key="index"
        :formClassTo="item.classNameIs"
        :optionIs="item.opts"
        :editChoseData="choseData"
        v-bind="$attrs"
      ></search-opts>
    </el-form-item>

    <!-- 上传图片 -->
    <div v-if="imagShow == true" style="display: flex">
      <upload-imag
        v-for="(item, index) in searchIsShow"
        :key="index"
        style="display: flex"
        class="uploadImg"
        :fType="item.imagName"
      >
        <span>
          {{ item.imagName }}
        </span>
      </upload-imag>
    </div>
    <el-form-item v-if="buttonShowIs == true" class="operatBtn" :style="butTopIs">
      <el-button @click="handleQuit">取消</el-button>
      <el-button @click="submitForm">提交</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { bookAdd, stabookEdit } from '../js/standingBook'
import SearchOpts from './search.vue'
import UploadImag from './uploadImag.vue'
import { cameraLedgerAdd } from '@/service/api/views/patrolDevice/deviceAlarm'
export default {
  name: 'AddBooksTags',
  inject: {
    addItemShow: { value: 'addItemShow', default: null },
    refresh: { value: 'refresh', default: null },
    mptipIs: { value: 'mptipIs', default: null },
    mrtipIs: { value: 'mrtipIs', default: null },
    customTipI: { value: 'customTipI', default: null },
    store: { value: 'store', default: null },
    reload: { default: null },
  },
  props: [
    'searchIs',
    'buttonShowIs',
    'dateShows',
    'imagShows',
    'noTitle',
    'datesTypes',
    'hasTitle',
    'className',
    'titleIs',
    'butTop',
    'choseData',
  ],
  data() {
    return {
      handleDefeatI: false,
      butTopIs: this.butTop,
      classNameTo: this.className,
      imagShow: this.imagShows,
      searchIsShow: this.searchIs,
      dateShowIs: this.dateShows,
      noTitleIs: this.noTitle,
      datesTypeIs: this.datesTypes,
      toFather: false,
      hasTitles: this.hasTitle,
      reciveAddDatas: [],
      addDatas: {},
      maskIs: false,
      // toIpt: {},
      fileone: new FormData(),
      selectDataEdit: {},
      origTrans: {},
    }
  },
  inheritAttrs: false,
  methods: {
    handleQuit() {
      this.$emit('father', this.toFather)
      this.$bus.$emit('maskIsShow', this.maskIs)
    },
    submitForm() {
      const _this = this
      // console.log(_this.addDatas, '新增/修改数据', '_this.selectDataEdit', _this.selectDataEdit)

      if (_this.titleIs === '台账新增') {
        if (_this.addDatas.returnTime < _this.addDatas.operationTime) {
          return _this.$message.error('退运日期不能大于投运日期，请重新选择')
        }
        bookAdd(_this)
        setTimeout(() => {
          _this.reload()
        }, 500)
      } else if (_this.titleIs === '台账修改') {
        stabookEdit(_this)
        setTimeout(() => {
          _this.refresh()
        }, 500)
      } else if (_this.titleIs === '计划新增') {
        //pageType => 0摄像机 1机器人 2无人机 3声音采集器
        //摄像机维保计划
        const addFun = (pageTypeI) => {
          const filePlan = {
            task: 'addCameraPlan',
            pageType: pageTypeI,
            stationID: _this.addDatas.transformer,
            planName: _this.addDatas.planname,
            cameraMaintainType: _this.addDatas.maintaintype,
            planContent: _this.addDatas.plancontent,
            isCycle: _this.addDatas.iscycle,
            planComments: _this.addDatas.remark,
            planTime: _this.addDatas.plantime,
          }
          cameraLedgerAdd(filePlan).then((res) => {
            console.log(res, '计划新增--结果')
          })
          setTimeout(() => {
            _this.reload()
          }, 500)
        }
        if (_this.mptipIs.tipsI === '摄像机计划') {
          addFun(0)
        } else if (_this.mptipIs.tipsI === '机器人计划') {
          addFun(1)
        } else if (_this.mptipIs.tipsI === '无人机计划') {
          addFun(2)
        } else if (_this.mptipIs.tipsI === '声音采集计划') {
          addFun(3)
        }
      } else if (_this.titleIs === '计划修改') {
        //维保计划
        console.log(_this.selectDataEdit, '_this.selectDataEdit---')
        const editFun = (pageTypeI) => {
          const filePlan = {
            task: 'updateCameraPlan',
            pageType: pageTypeI,
            maintainID: _this.selectDataEdit.maintain_id,
            stationID: _this.addDatas.transformer,
            planName: _this.addDatas.planname
              ? _this.addDatas.planname
              : _this.selectDataEdit.plan_desc,
            cameraMaintainType: _this.addDatas.maintaintype
              ? _this.addDatas.maintaintype
              : _this.selectDataEdit.type,
            planContent: _this.addDatas.plancontent
              ? _this.addDatas.plancontent
              : _this.selectDataEdit.plan_content,
            isCycle: _this.addDatas.iscycle
              ? _this.addDatas.iscycle
              : _this.selectDataEdit.is_cycle,
            planComments: _this.addDatas.remark
              ? _this.addDatas.remark
              : _this.selectDataEdit.plan_content,
            planTime: _this.addDatas.plantime
              ? _this.addDatas.plantime
              : new Date(Number(_this.selectDataEdit.plan_time)),
          }
          cameraLedgerAdd(filePlan).then((res) => {
            console.log(res, '维保计划')
          })
          setTimeout(() => {
            _this.refresh()
          }, 500)
        }
        if (_this.mptipIs.tipsI === '摄像机计划') {
          editFun(0)
        } else if (_this.mptipIs.tipsI === '机器人计划') {
          editFun(1)
        } else if (_this.mptipIs.tipsI === '无人机计划') {
          editFun(2)
        } else if (_this.mptipIs.tipsI === '声音采集计划') {
          editFun(3)
        }
      } else if (_this.titleIs === '维保记录录入') {
        //维保记录
        // console.log(_this.selectDataEdit, '_this.selectDataEdit选中计划的记录')
        const recorADD = () => {
          const mainTainRecord = {
            task: 'modifyCameraMaintain',
            // pageType: pageTypeI,
            maintainID: _this.selectDataEdit.maintain_id,
            recTime: _this.addDatas.maintaintime,
            company: _this.addDatas.maintaincompany,
            maintainPerson: _this.addDatas.maintainperson,
            phone: _this.addDatas.phone,
            maintainContent: _this.addDatas.maintaincontent,
            chargePerson: _this.addDatas.workleader,
            resultStatus: _this.addDatas.maintainconclusion,
            maintainComments: _this.addDatas.remark,
          }
          cameraLedgerAdd(mainTainRecord).then((res) => {
            console.log(res)
          })
          setTimeout(() => {
            _this.reload()
          }, 500)
        }
        recorADD()
      } else if (_this.titleIs === '缺陷填报') {
        //缺陷填报
        const defeatRecord = {
          task: 'modifyCameraDefect',
          stationID: _this.addDatas.transformer ? _this.addDatas.transformer : '',
          cameraID: _this.addDatas.tname ? Number(_this.addDatas.tname) : '',
          defectType: _this.addDatas.detecttype,
          //缺陷等级默认一般缺陷
          // defectID: '1',//修改参数
        }
        const paraArr = [
          { id: 'defectTime', para: 'detectedate' },
          { id: 'reportPerson', para: 'detecteperson' },
          { id: 'defectDesc', para: 'defectdescription' },
        ]
        paraArr.forEach((item) => {
          if (_this.addDatas[item.para]) {
            defeatRecord[item.id] = _this.addDatas[item.para]
          }
        })
        cameraLedgerAdd(defeatRecord).then((res) => {
          console.log(res)
          if (res.msg !== 'OK') {
            let tips =
              res.msg === 'defectDesc不能为空'
                ? '缺陷描述不能为空'
                : res.msg === 'defectTime不能为空'
                ? '发现时间不能为空'
                : res.msg === 'defectType不能为空'
                ? '缺陷类型不能为空'
                : res.msg === 'reportPerson不能为空'
                ? '缺陷发现人不能为空'
                : res.msg

            _this.$message.error(tips)
          } else {
            _this.$message.success(res.msg)
          }
        })
        setTimeout(() => {
          _this.reload()
        }, 500)
      } else if (_this.titleIs === '告警详情') {
        //告警状态改为已确认
        const paraSure = {
          task: 'alarmConfirm',
          alarmID: _this.store ? _this.store.state.alarmid : '',
        }
        cameraLedgerAdd(paraSure).then((res) => {
          // console.log(res, '是否确认告警')
          if (res.msg === '未找到告警信息或已确认') {
            _this.$message.error('未找到告警信息或已确认')
            return false
          }
        })
        setTimeout(() => {
          _this.refresh()
        }, 500)
      } else if (_this.titleIs === '缺陷修改') {
        const defeatRecordedit = {
          task: 'modifyCameraDefect',
          stationID: _this.addDatas.transformer,
          cameraID: Number(_this.selectDataEdit.camera_id),
          defectTime: _this.addDatas.detectedate
            ? _this.addDatas.detectedate
            : new Date(Number(_this.selectDataEdit.defect_time) * 1000),
          defectType: _this.addDatas.detecttype
            ? _this.addDatas.detecttype
            : _this.selectDataEdit.defect_type,
          reportPerson: _this.addDatas.detecteperson
            ? _this.addDatas.detecteperson
            : _this.selectDataEdit.report_person,
          defectDesc: _this.addDatas.defectdescription
            ? _this.addDatas.defectdescription
            : _this.selectDataEdit.defect_desc,
          defectID: _this.selectDataEdit.defect_id, //修改参数
        }
        cameraLedgerAdd(defeatRecordedit).then((res) => {
          console.log(res)
        })
        setTimeout(() => {
          _this.refresh()
        }, 500)
      } else if (_this.titleIs === '处理单填写') {
        console.log('处理单填写')
        const proSheet = {
          task: 'modifyDefectSheet',
          defectID: _this.store.state.defeatId,
          createTime: _this.addDatas.createTime ? _this.addDatas.createTime : null,
          sheetDesc: _this.addDatas.sheetDesc ? _this.addDatas.sheetDesc : null,
          createPerson: _this.addDatas.createPerson ? _this.addDatas.createPerson : null,
          checkCompany: _this.addDatas.checkCompany ? _this.addDatas.checkCompany : null,
          checkPerson: _this.addDatas.checkPerson ? _this.addDatas.checkPerson : null,
          sheetStatus: _this.addDatas.sheetStatus ? _this.addDatas.sheetStatus : null,
          checkResult: _this.addDatas.checkResult ? _this.addDatas.checkResult : null,
          comments: _this.addDatas.comments,
          details: _this.addDatas.details ? _this.addDatas.details : null,
        }
        cameraLedgerAdd(proSheet).then((res) => {
          console.log(res, '是否生成处理单')
          if (res.msg === 'OK') {
            this.$message.success('处理单已生成,请前往缺陷消缺安排进行查看!')
          }
        })
      } else if (_this.titleIs === '处理单修改') {
        console.log('处理单修改')
        //缺陷修改先判断是否有完成情况
        // if (_this.selectDataEdit.checkResult !== '') {
        const editSheet = {
          task: 'modifyDefectSheet',
          sheetID: _this.selectDataEdit.sheet_id,
          defectID: _this.selectDataEdit.defect_id,
          createTime: _this.addDatas.createTime
            ? _this.addDatas.createTime
            : _this.selectDataEdit.create_time,
          sheetDesc: _this.addDatas.sheetDesc
            ? _this.addDatas.sheetDesc
            : _this.selectDataEdit.sheet_desc,
          createPerson: _this.addDatas.createPerson
            ? _this.addDatas.createPerson
            : _this.selectDataEdit.create_person,
          checkCompany: _this.addDatas.checkCompany
            ? _this.addDatas.checkCompany
            : _this.selectDataEdit.check_company,
          sheetStatus: _this.addDatas.sheetStatus
            ? _this.addDatas.sheetStatus
            : _this.selectDataEdit.sheet_status,
          comments: _this.addDatas.comments
            ? _this.addDatas.comments
            : _this.selectDataEdit.comments,

          details: _this.addDatas.details ? _this.addDatas.details : _this.selectDataEdit.details,
          checkPerson: _this.addDatas.checkPerson
            ? _this.addDatas.checkPerson
            : _this.selectDataEdit.check_person,
          checkResult: _this.addDatas.checkResult
            ? _this.addDatas.checkResult
            : _this.selectDataEdit.check_result,
        }
        cameraLedgerAdd(editSheet).then((res) => {
          console.log(res, '修改处理单')
        })
        setTimeout(() => {
          _this.refresh()
        }, 500)
        // }
      } else if (_this.titleIs === '缺陷处理') {
        console.log('缺陷处理')
        const editSheet = {
          task: 'modifyDefectSheet',
          sheetID: _this.selectDataEdit.sheet_id,
          defectID: _this.selectDataEdit.defect_id,
          createTime: _this.addDatas.createTime
            ? _this.addDatas.createTime
            : _this.selectDataEdit.create_time,
          sheetDesc: _this.addDatas.sheetDesc
            ? _this.addDatas.sheetDesc
            : _this.selectDataEdit.sheet_desc,
          createPerson: _this.addDatas.createPerson
            ? _this.addDatas.createPerson
            : _this.selectDataEdit.create_person,
          checkCompany: _this.addDatas.checkCompany
            ? _this.addDatas.checkCompany
            : _this.selectDataEdit.check_company,
          sheetStatus: _this.addDatas.sheetStatus
            ? _this.addDatas.sheetStatus
            : _this.selectDataEdit.sheet_status,
          comments: _this.addDatas.comments
            ? _this.addDatas.comments
            : _this.selectDataEdit.comments,

          details: _this.addDatas.details ? _this.addDatas.details : _this.selectDataEdit.details,
          checkPerson: _this.addDatas.checkPerson
            ? _this.addDatas.checkPerson
            : _this.selectDataEdit.check_person,
          checkResult: _this.addDatas.checkResult
            ? _this.addDatas.checkResult
            : _this.selectDataEdit.check_result,
          checkTime: _this.addDatas.checkTime
            ? _this.addDatas.checkTime
            : _this.selectDataEdit.check_time,
        }
        cameraLedgerAdd(editSheet).then((res) => {
          console.log(res, '缺陷处理')
        })
        setTimeout(() => {
          _this.refresh()
        }, 500)
      }
      _this.$bus.$emit('maskIsShow', _this.maskIs)
      _this.$emit('father', _this.toFather)
    },
  },
  mounted() {
    this.searchIsShow.forEach((el, index) => {
      this.$refs.searchPart[index].showRowData()
    })
    const _this = this
    _this.$bus.$on('showEdit', function (msg) {
      _this.selectDataEdit = msg
    })
    _this.$bus.$on('operMaint', function (msg) {
      _this.addDatas.transformer = msg
      // console.log(_this.addDatas.transformer, '传递过来的变电站id')
    })
    //提交预值
    _this.$bus.$on('input', function (msg) {
      // debugger
      // console.log('输入值', _this.reciveAddDatas)
      _this.reciveAddDatas.push(msg)
      for (const item of _this.reciveAddDatas) {
        // console.log(_this.addDatas, '_this.addDatas(原始)')
        //摄像机台账
        const isAddData = [
          { label: 'IP地址', type: 'ipt', vals: 'ip' },
          { label: '算法版本', type: 'ipt', vals: 'version' },
          { label: '运维单位', type: 'selt', vals: 'name' },
          { label: '部门/班组', type: 'selt', vals: 'part' },
          { label: '变电站', type: 'seltItself', vals: 'transformer' },
          { label: '电压等级', type: 'selt', vals: 'level' },
          { label: '装置类型', type: 'selt', vals: 'type' },
          { label: '装置名称', type: 'iptOrSelt', vals: 'tname' },
          { label: '安装位置', type: 'ipt', vals: 'place' },
          { label: '覆盖区域', type: 'selt', vals: 'area' },
          { label: '生产厂家', type: 'selt', vals: 'produ' },
          { label: '编号', type: 'ipt', vals: 'num' },
          { label: '出厂序列号', type: 'ipt', vals: 'serialnumber' },
          { label: '设备型号', type: 'selt', vals: 'tnum' },
          { label: '投运日期', type: 'sigDate', vals: 'operationTime' },
          { label: '退运日期', type: 'sigDate', vals: 'returnTime' },
          { label: '缺陷次数', type: 'ipt', vals: 'flawnum' },
          { label: '红外功能', type: 'selt', vals: 'IFRState' },
          { label: '可见光功能', type: 'selt', vals: 'IPCState' },
          { label: '雨刷功能', type: 'selt', vals: 'WiperState' },
          { label: '黑夜模式', type: 'selt', vals: 'NightState' },
          { label: '移动侦探', type: 'selt', vals: 'MoveDetState' },
          { label: '红外流地址', type: 'ipt', vals: 'NightState' },
          { label: '可见光流地址', type: 'ipt', vals: 'VideoUrl' },
          //机器人
          { label: '尺寸', type: 'ipt', vals: 'size' },
          { label: '重量', type: 'ipt', vals: 'weight' },
          { label: '信号传输', type: 'ipt', vals: 'transmission' },
          { label: '防护等级', type: 'ipt', vals: 'protectLevel' },
          { label: '通讯方式', type: 'ipt', vals: 'commMode' },
          { label: '速度', type: 'ipt', vals: 'carMoveSpeed' },
          { label: '左右定位精度', type: 'ipt', vals: 'leftRightPrecision' },
          { label: '前后定位精度', type: 'ipt', vals: 'frontBackPrecision' },
          { label: '导航方式', type: 'ipt', vals: 'navigation' },
          // { label: '规格型号', type: 'ipt', vals: 'soundSpeciModel' },
          { label: '供电电压', type: 'selt', vals: 'proVal' },
          { label: '阵列功耗', type: 'ipt', vals: 'arrayPower' },
          { label: '工作温度范围', type: 'ipt', vals: 'temperScope' },
          { label: '防水等级', type: 'ipt', vals: 'waterProof' },
          { label: '信噪比', type: 'ipt', vals: 'signalNoiseRadio' },
          { label: '灵敏度', type: 'ipt', vals: 'sensitivity' },
          { label: '频响范围', type: 'ipt', vals: 'frequencyRes' },
          { label: '指向性', type: 'ipt', vals: 'directivity' },
          { label: '阵列体积', type: 'ipt', vals: 'arrayVolum' },
          { label: '阵列重量', type: 'ipt', vals: 'arrayWeight' },
          { label: '阵列孔径', type: 'ipt', vals: 'arrayAperture' },
          { label: '阵列个数', type: 'ipt', vals: 'arrayNumer' },
          { label: '采样频率', type: 'ipt', vals: 'sampleFrequency' },
          //无人机
          { label: '型号', type: 'ipt', vals: 'car_number' },
          { label: '起降方式', type: 'ipt', vals: 'flyLandMode' },
          { label: '空机重量(kg)', type: 'ipt', vals: 'weight' },
          { label: '最大起飞重量(kg)', type: 'ipt', vals: 'maxWeight' },
          { label: '抗风等级', type: 'ipt', vals: 'resistWindLevel' },
          { label: '最大速度(m/h)', type: 'ipt', vals: 'carMoveSpeed' },
          { label: '最大飞行高度(m)', type: 'ipt', vals: 'carFlyHeight' },
          { label: '续航时间(分钟)', type: 'ipt', vals: 'carFlyTime' },
          { label: '机身高度(m)', type: 'ipt', vals: 'carHeight' },
          { label: '机身长度(m)', type: 'ipt', vals: 'carLength' },
          { label: '机身宽度(m)', type: 'ipt', vals: 'carWidth' },
          { label: '控制方式', type: 'ipt', vals: 'carControl' },
          { label: '作业半径(m)', type: 'ipt', vals: 'workRadius' },
          { label: 'PTK功能', type: 'selt', vals: 'openRTK' },
          { label: '设备状态', type: 'selt', vals: 'Offline' },
          // { label: '红外功能(m)', type: 'selt', vals: 'maintaintime' },
          // { label: '黑夜模式', type: 'selt', vals: 'maintaintime' },
          //维保计划
          { label: '计划名称', type: 'iptOrSelt', vals: 'planname' },
          { label: '计划时间', type: 'sigDate', vals: 'plantime' },
          { label: '计划内容', type: 'ipt', vals: 'plancontent' },
          { label: '备注', type: 'ipt', vals: 'remark' },
          { label: '维保类型', type: 'selt6', vals: 'maintaintype' },
          { label: '是否生产周期计划', type: 'selt6', vals: 'iscycle' },
          { label: '维保时间', type: 'sigDate', vals: 'maintaintime' },
          { label: '维保单位', type: 'ipt', vals: 'maintaincompany' },
          { label: '维保内容', type: 'ipt', vals: 'maintaincontent' },
          { label: '联系电话', type: 'ipt', vals: 'phone' },
          { label: '维保人员', type: 'ipt', vals: 'maintainperson' },
          { label: '工作负责人', type: 'ipt', vals: 'workleader' },
          { label: '维保结论', type: 'selt6', vals: 'maintainconclusion' },
          { label: '设备主人', type: 'ipt', vals: 'master' },
          //缺陷填报
          { label: '缺陷类型', type: 'selt', vals: 'detecttype' },
          { label: '发现时间', type: 'sigDate', vals: 'detectedate' },
          { label: '缺陷描述', type: 'ipt', vals: 'defectdescription' },
          { label: '缺陷等级', type: 'selt', vals: 'defectlevel' },
          { label: '缺陷发现人', type: 'ipt', vals: 'detecteperson' },
          //处理单填报
          { label: '编制时间', type: 'sigDate', vals: 'createTime' },
          { label: '处理单名称', type: 'ipt', vals: 'sheetDesc' },
          { label: '编制人', type: 'ipt', vals: 'createPerson' },
          { label: '消缺单位', type: 'ipt', vals: 'checkCompany' },
          { label: '消缺人', type: 'ipt', vals: 'checkPerson' },
          { label: '备注', type: 'ipt', vals: 'comments' },
          { label: '详情', type: 'ipt', vals: 'details' },
          { label: '验收人', type: 'ipt', vals: 'checkPerson' },
          { label: '验收结果', type: 'selt', vals: 'checkResult' },
          { label: '验收时间', type: 'sigDate', vals: 'checkTime' },
        ]
        isAddData.forEach((el) => {
          if (item.lableName === el.label) {
            if (el.type === 'ipt') {
              _this.addDatas[el.vals] = item.value1
            } else if (el.type === 'selt') {
              _this.addDatas[el.vals] = item.value3
            } else if (el.type === 'seltItself') {
              _this.addDatas[el.vals] = item.value3 ? item.value3 : _this.addDatas[el.vals]
            } else if (el.type === 'sigDate') {
              _this.addDatas[el.vals] = item.value5
            } else if (el.type === 'selt6') {
              _this.addDatas[el.vals] = item.value6
            } else if (el.type === 'iptOrSelt') {
              _this.addDatas[el.vals] = item.value1 ? item.value1 : item.value3
            }
          }
        })
      }
    })
    _this.$bus.$on('pic', function (msg) {
      _this.fileone = msg
      // console.log('msg', msg)
    })
    _this.$bus.$emit('addDataI', _this.addDatas)
  },
  components: {
    SearchOpts,
    UploadImag,
  },
  beforeDestroy() {
    const _this = this
    // 销毁事件（重要）
    _this.$bus.$off('showEdit')
    _this.$bus.$off('input')
    _this.$bus.$off('pic')
    _this.$bus.$off('operMaint')
  },
}
</script>
<style scoped lang="scss">
@import '../padcss/addtags.scss';
</style>
