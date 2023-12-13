<template>
  <div class="app-search">
    <div class="app-title">
      <i></i>
      <p>筛选条件</p>
      <span
        v-for="(item, index) in conditions"
        :key="index"
        @click="handleTags(item)"
        class="litTabs"
      >
        <a href="javascript:;">{{ item }}</a>
      </span>
    </div>
    <div class="el-row" style="margin-top: 20px; display: ; width: 100%">
      <div class="el-col-search" style="display: flex; flex-wrap: wrap">
        <search-opts
          v-for="(item, index) in searchDatas"
          :key="index"
          :isOpts="item.opts != ''"
          style="display: flex"
          :itemType="item.typeis"
          :searchDatas="searchDatas"
          :labName="item.labelName"
          :plaHolder="item.placeHolder"
          :optionIs="item.opts"
          :pullDownLists="pullDownLists"
          ref="showRowDatas"
        >
        </search-opts>
        <search-opts
          v-for="(item, index) in dateDatas"
          :key="index"
          :isOpts="item.opts != ''"
          style="display: flex"
          :itemType="item.typeis"
          :searchDatas="searchDatas"
          :labName="item.labelName"
          :plaHolder="item.placeHolder"
          :filterIpt="filterVals"
          ref="showRowDatas"
        >
        </search-opts>
      </div>
    </div>
    <!-- <div class="datetimes">
      <search-opts v-for="item in dateType" :key="item.id" :typeShow="item.typeDate">
        <span class="demonstration" v-if="item.typeDate == 'mulCheck'"> {{ item.startName }}</span>
      </search-opts>
    </div> -->
    <div class="app-title">
      <i></i>
      <p>装置告警列表</p>
      <span
        v-for="(item, index) in ParameterLists"
        :key="index"
        @click="handleTags(item)"
        class="litTabs"
      >
        <a href="javascript:;">
          <span>{{ item }}</span></a
        >
      </span>
    </div>
    <div class="is-table">
      <table-lists
        :tabTitle="tabTitles"
        ref="childTab"
        :alarmDataIs="alarmDatas"
        hastitleYS="详情"
      ></table-lists>
    </div>
    <div class="pageIs">
      <page-contents></page-contents>
    </div>
    <custom-fields
      ref="childCustom"
      :treeDatas="treeData"
      @tofather="getFromCust"
      :customTipIs="customTip"
    ></custom-fields>

    <mp-add-books v-show="addIsShow" @father="getFromGrason"></mp-add-books>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span style="font-size: 1.8rem; display: inline-block; margin: 1rem">是否确认状态？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSure">确 定 </el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import MpAddBooks from './mpAddBooks.vue'
import SearchOpts from '../../commenDevice/search.vue'
import TableLists from '../../commenDevice/zztable.vue'
import CustomFields from '../../commenDevice/customFields.vue'
import PageContents from '../../commenDevice/pagecontents.vue'
import { resetIpt, pullDown, handleFilter, download } from '@/views/PatrolDevice/js/commenFun'
import { patroCameraLedger, exportFiles } from '@/service/api/views/patrolDevice/deviceAlarm.js'

export default {
  name: 'robStandingBook',
  components: {
    SearchOpts,
    TableLists,
    PageContents,
    MpAddBooks,
    CustomFields,
  },
  provide() {
    return {
      searchDatasIs: this.searchDatas,
      addItemShow: this.addIsShow,
      refresh: this.refresh,
      filterVals: this.filterVals,
      customTipI: this.customTip,
    }
  },
  data() {
    return {
      pullDownLists: {},
      selctAlarm: [],
      customTip: '装置告警确认',
      dialogVisible: false,
      pageNowIs: 1,
      tabTitles: [
        {
          label: '',
          prop: 'checkIs',
          type: 'selection',
          width: '60',
        },
        {
          label: '序号',
          prop: 'id',
          type: 'index',
          width: '60',
        },
        {
          label: '部门/班组',
          prop: 'part',
          type: '',
          width: '150',
        },
        {
          label: '电压等级',
          prop: 'level',
          type: '',
          width: '100',
        },
        {
          label: '变电站',
          prop: 'transformer',
          type: '',
          width: '220',
        },
        {
          label: '装置类型',
          prop: 'type',
          type: '',
          width: '180',
        },
        {
          label: '装置名称',
          prop: 'tname',
          type: '',
          width: '200',
        },
        {
          label: '编号',
          prop: 'num',
          type: '',
          width: '100',
        },
        {
          label: '安装位置',
          prop: 'place',
          type: '',
          width: '120',
        },
        {
          label: '覆盖区域',
          prop: 'area',
          type: '',
          width: '150',
        },
        {
          label: '算法版本',
          prop: 'version',
          type: '',
          width: '100',
        },
        {
          label: 'IP地址',
          prop: 'ip',
          type: '',
          width: '120',
        },
        {
          label: '生产厂家',
          prop: 'produ',
          type: '',
          width: '180',
        },
        {
          label: '设备型号',
          prop: 'tnum',
          type: '',
          width: '300',
        },
        {
          label: '告警描述',
          prop: 'alarmdescription',
          type: '',
          width: '220',
        },
        {
          label: '发现时间',
          prop: 'alarmfoundtime',
          type: '',
          width: '180',
        },
        {
          label: '告警等级',
          prop: 'alarmlevel',
          type: '',
          width: '120',
        },
        {
          label: '确认状态',
          prop: 'authorizationstate',
          type: '',
          width: '120',
        },
      ],
      searchDatas: [
        {
          labelName: '运维单位',
          placeHolder: '请选择',
          opts: [],
          typeis: 'select',
          identification: 'name',
        },
        {
          labelName: '部门/班组',
          placeHolder: '请选择',
          opts: [],
          typeis: 'select',
          identification: 'part',
        },
        {
          labelName: '电压等级',
          placeHolder: '请选择',
          opts: [],
          typeis: 'select',
          identification: 'level',
        },
        {
          labelName: '变电站',
          placeHolder: '请选择',
          opts: [],
          typeis: 'select',
          identification: 'transformer',
        },
        {
          labelName: '装置类型',
          placeHolder: '请选择',
          opts: [],
          typeis: 'select',
          identification: 'type',
        },
        {
          labelName: '装置名称',
          placeHolder: '请选择',
          opts: '',
          typeis: 'text',
          identification: 'tname',
        },
        {
          labelName: '编号',
          placeHolder: '请输入编号',
          opts: '',
          typeis: 'text',
          identification: 'num',
        },
        {
          labelName: '安装位置',
          placeHolder: '请输入安装位置',
          opts: '',
          typeis: 'text',
          identification: 'place',
        },
        {
          labelName: '覆盖区域',
          placeHolder: '请输入覆盖区域',
          opts: '',
          typeis: 'text',
          identification: 'area',
        },
        {
          labelName: '生产厂家',
          placeHolder: '请输入生产厂家',
          opts: '',
          typeis: 'text',
          identification: 'produ',
        },
        {
          labelName: '设备型号',
          placeHolder: '请选择',
          opts: [
            {
              ifr: [],
              ipc: [],
            },
          ],
          typeis: 'select',
          identification: 'tnum',
        },
        {
          labelName: '设备主人',
          placeHolder: '请输入设备主人',
          opts: '',
          typeis: 'text',
          identification: 'devicepeo',
        },
        {
          labelName: '算法版本',
          placeHolder: '请输入算法版本',
          opts: '',
          typeis: 'text',
          identification: 'version',
        },
        {
          labelName: 'IP地址',
          placeHolder: '请输入IP地址',
          opts: '',
          typeis: 'text',
          identification: 'ip',
        },
        {
          labelName: '告警等级',
          placeHolder: '请选择告警等级',
          opts: [
            { id: 1, fId: -1, vals: '一般' },
            { id: 2, fId: -1, vals: '严重' },
            { id: 3, fId: -1, vals: '危急' },
          ],
          typeis: 'select',
          identification: 'alarmlevel',
        },
        {
          labelName: '确认状态',
          placeHolder: '请选择确认状态',
          opts: [
            { id: 1, fId: -1, vals: '已确认' },
            { id: 2, fId: -1, vals: '未确认' },
          ],
          typeis: 'select',
          identification: 'authorizationstate',
        },
        {
          labelName: '告警描述',
          placeHolder: '',
          opts: '',
          typeis: 'text',
          identification: 'alarmdescription',
        },
        {
          labelName: '发现时间',
          placeHolder: '',
          opts: '',
          typeis: 'mulCheck',
          identification: 'alarmfoundtime',
        },
      ],
      treeData: [
        {
          id: 1,
          label: '全部',
          children: [
            {
              id: '2',
              label: '部门/班组',
              prop: 'part',
              type: '',
              width: '',
            },
            {
              id: '3',
              label: '电压等级',
              prop: 'level',
              type: '',
              width: '',
            },
            {
              id: '4',
              label: '变电站',
              prop: 'transformer',
              type: '',
              width: '',
            },
            {
              id: '5',
              label: '装置类型',
              prop: 'type',
              type: '',
              width: '',
            },
            {
              id: '6',
              label: '装置名称',
              prop: 'tname',
              type: '',
              width: '',
            },
            {
              id: '7',
              label: '编号',
              prop: 'num',
              type: '',
              width: '',
            },
            {
              id: '8',
              label: '生产厂家',
              prop: 'produ',
              type: '',
              width: '',
            },
            {
              id: '9',
              label: '设备型号',
              prop: 'tnum',
              type: '',
              width: '',
            },
            {
              id: '10',
              label: '告警描述',
              prop: 'alarmdescription',
              type: '',
              width: '',
            },
            {
              id: '11',
              label: '告警发现时间',
              prop: 'alarmfoundtime',
              type: '',
              width: '',
            },
            {
              id: '12',
              label: '告警等级',
              prop: 'alarmlevel',
              type: '',
              width: '',
            },
            {
              id: '13',
              label: '确认状态',
              prop: 'authorizationstate',
              type: '',
              width: '',
            },
          ],
        },
      ],
      dateDatas: [],
      ParameterLists: ['显示设置', '确认', '导出'],
      conditions: ['筛选', '重置'],
      addIsShow: false,
      custIsShow: false,
      alarmData: {},
      filterVals: [],
      filterTabDatas: [],
      filterObj: {},
      alarmDatas: [],
      seleFilters: {},
      finalParam: {},
    }
  },
  methods: {
    getFromCust(val) {
      this.custIsShow = val
    },
    getFromGrason(val) {
      this.addIsShow = val
    },
    async handleSure() {
      // console.log(this.selctAlarm, 'this.selctAlarm')
      this.dialogVisible = false
      //禁止多选确认状态
      if (this.selctAlarm.length > 1) {
        this.$message.info('仅能选一条进行确认')
      } else {
        const parass = {
          task: 'alarmConfirm',
          alarmID: this.selctAlarm[0].alarmid,
        }
        const redata = await patroCameraLedger(parass)
        this.refresh()
      }
    },
    async handleTags(item) {
      // alert(this.addIsShow);
      if (item === '显示设置') {
        this.$refs.childCustom.showCustom()
      } else if (item === '确认') {
        this.dialogVisible = true
      } else if (item === '导出') {
        if (this.selctAlarm.length === 0) {
          const alarmPa = {
            task: 'getCameraAlarmList',
            export: 1,
          }
          const exports = await exportFiles(alarmPa)
          download(exports, '导出.xlsx')
        }
      } else if (item === '筛选') {
        handleFilter(this, {
          task: 'getCameraAlarmList',
          pageNow: 1,
          pageNum: 10,
          // cameraID: 1,
          // stationID: '417DA09F-8A2D-83A3-AC4A-AA94CD126222',
        })
      } else if (item === '重置') {
        const _this = this
        resetIpt(_this)
        _this.filterVals = []
        //重置函数
        const params = {
          task: 'getCameraAlarmList', //'getAllCamera',
          pageNow: 1,
          pageNum: 10,
        }
        _this.$refs.childTab.selectIf(params, 'cameraData')
      }
    },
    refresh() {
      this.getAlarmList(this.pageNowIs)
    },
    getAlarmList(pageNowI) {
      //获取列表数据
      const alarParams = {
        task: 'getCameraAlarmList',
        pageNow: pageNowI ? pageNowI : 1,
      }
      this.$refs.childTab.selectIf(alarParams, 'cameraData')
    },
  },
  mounted() {
    pullDown(this, 'getSelectList', 0, 'viction')
    //获取列表数据
    this.getAlarmList()

    const _this = this
    _this.$bus.$on('pageNow', function (msg) {
      // console.log(msg, '页码')
      _this.pageNowIs = msg
      _this.getAlarmList(msg)
    })
    _this.$bus.$on('input', function (msg) {
      _this.filterVals.push(msg)

      for (let j = _this.filterVals.length - 1; j >= 0; j--) {
        for (let k = 1; k < _this.filterVals.length; k++) {
          if (j >= k) {
            if (_this.filterVals[j].lableName === _this.filterVals[j - k].lableName) {
              _this.filterVals.splice(j - k, j - k + 1)
            }
          }
        }
      }
      // console.log(_this.filterVals)
      _this.$bus.$emit('pullDownLists', _this.pullDownLists)
    })
    _this.$bus.$on('selectDatas', function (msg) {
      _this.selctAlarm = msg
      console.log(_this.selctAlarm, ' this.selctAlarm isisi--')
    })
  },
  beforeDestroy() {
    const _this = this
    // 销毁事件（重要）
    _this.$bus.$off('helloEdit')
    _this.$bus.$off('input')
    _this.$bus.$off('selectDatas')
  },
}
</script>
<style scoped lang="scss">
@import '../../padcss/thiscommen.scss';
</style>
