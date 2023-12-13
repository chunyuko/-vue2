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
    <div class="searchIndex">
      <search-opts
        ref="showRowDatas"
        v-for="(item, index) in searchDatas"
        :key="index"
        :isOpts="item.opts != ''"
        style="display: flex"
        :itemType="item.typeis"
        :searchDatas="searchDatas"
        :labName="item.labelName"
        :plaHolder="item.placeHolder"
        :outsideSearch="true"
        :optionIs="item.opts"
        :addTitleI="addTabTitle"
        :noDetecttypeStyle="false"
      >
      </search-opts>
    </div>

    <div class="app-title">
      <i></i>
      <p>装置缺陷列表</p>
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
        ref="childTab"
        :tabTitle="tabTitles"
        :defectDataIs="defectData"
        hastitleYS="处理单详情"
      ></table-lists>
    </div>
    <div class="pageIs">
      <page-contents></page-contents>
    </div>

    <mr-add-books
      ref="childAddBooks"
      @father="getFromGrason"
      :addTitle="addTabTitle"
      :searchDatas="searchDatas"
      :showOr="true"
    ></mr-add-books>
    <!-- 预览 -->
    <pre-defect ref="childPreview" :addTitle="previewTitle" :searchDatas="searchDatas"></pre-defect>

    <custom-fields
      ref="childCustom"
      :treeDatas="treeData"
      @tofather="getFromCust"
      :customTipIs="customTip"
    ></custom-fields>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>确认删除所选内容吗?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="delTab">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import MrAddBooks from './mrAddBooks.vue'
import PreDefect from './preView.vue'
import SearchOpts from '../../commenDevice/search.vue'
import CustomFields from '../../commenDevice/customFields.vue'
import TableLists from '../../commenDevice/zztable.vue'
import PageContents from '../../commenDevice/pagecontents.vue'
import { resetIpt, handleFilter } from '@/views/PatrolDevice/js/commenFun'
import { patroCameraLedger } from '@/service/api/views/patrolDevice/deviceAlarm.js'
import { pullDown, delDatas, download } from '@/views/PatrolDevice/js/commenFun'
import { exportFiles } from '@/service/api/views/patrolDevice/deviceAlarm'
export default {
  name: 'defeatRecord',
  components: {
    SearchOpts,
    TableLists,
    PageContents,
    MrAddBooks,
    CustomFields,
    PreDefect,
  },
  provide() {
    return {
      searchDatas: this.searchDatas,
      addItemShow: this.addIsShow,
      refresh: this.refresh,
      customTipI: this.customTip,
      filterVals: this.filterVals,
    }
  },
  data() {
    return {
      finalParam: {},
      pullDownLists: {},
      customTip: '装置缺陷填报',
      addTabTitle: '缺陷填报',
      editTabTitle: '缺陷修改',
      previewTitle: '装置缺陷预览',
      pageNowIs: 1,
      tabTitles: [
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
          width: '60',
        },
        {
          label: '部门/班组',
          prop: 'part',
          type: '',
          width: '100',
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
          type: 'hide',
          width: '120',
        },
        {
          label: '装置名称',
          prop: 'tname',
          type: '',
          width: '180',
        },
        {
          label: '编号',
          prop: 'num',
          type: '',
          width: '80',
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
          width: '120',
        },
        {
          label: '设备型号',
          prop: 'tnum',
          type: '',
          width: '120',
        },
        {
          label: '缺陷描述',
          //同告警描述
          prop: 'defectdescription',
          type: '',
          width: '120',
        },
        {
          label: '缺陷发现时间',
          prop: 'detectedate',
          type: '',
          width: '',
        },
        {
          label: '缺陷发现人',
          prop: 'detecteperson',
          type: '',
          width: '',
        },
        {
          label: '缺陷等级',
          prop: 'defectlevel',
          type: '',
          width: '120',
        },
        {
          label: '缺陷类型',
          prop: 'detecttype',
          type: '',
          width: '120',
        },
        {
          label: '是否关联处理单',
          prop: 'associationis',
          type: '',
          width: '120',
        },
        {
          label: '缺陷状态',
          prop: 'detectstate',
          type: '',
          width: '180',
        },
      ],
      //显示设置字段
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
              label: '安装位置',
              prop: 'place',
              type: '',
              width: '',
            },
            {
              id: '9',
              label: '覆盖区域',
              prop: 'area',
              type: '',
              width: '',
            },
            {
              id: '10',
              label: '算法版本',
              prop: 'version',
              type: '',
              width: '',
            },
            {
              id: '11',
              label: 'IP地址',
              prop: 'ip',
              type: '',
              width: '',
            },
            {
              id: '12',
              label: '生产厂家',
              prop: 'produ',
              type: '',
              width: '',
            },
            {
              id: '13',
              label: '设备型号',
              prop: 'tnum',
              type: '',
              width: '',
            },
            {
              id: '14',
              label: '缺陷描述',
              prop: 'defectdescription',
              type: '',
              width: '',
            },
            {
              id: '15',
              label: '缺陷发现时间',
              prop: 'detectedate',
              type: '',
              width: '',
            },
            {
              id: '16',
              label: '缺陷发现人',
              prop: 'detecteperson',
              type: '',
              width: '',
            },
            {
              id: '17',
              label: '缺陷等级',
              prop: 'defectlevel',
              type: '',
              width: '',
            },
            {
              id: '18',
              label: '缺陷类型',
              prop: 'detecttype',
              type: '',
              width: '',
            },
            {
              id: '19',
              label: '是否关联处理单',
              prop: 'associationis',
              type: '',
              width: '',
            },
            {
              id: '20',
              label: '缺陷状态',
              prop: 'detectstate',
              type: '',
              width: '',
            },
          ],
        },
      ],
      searchDatas: [
        {
          labelName: '运维单位',
          placeHolder: '请选择',
          opts: [],
          typeis: 'select',
          identification: 'name',
          disableI: true,
        },
        {
          labelName: '部门/班组',
          placeHolder: '请选择',
          opts: [],
          typeis: 'select',
          identification: 'part',
          disableI: true,
        },
        {
          labelName: '电压等级',
          placeHolder: '请选择',
          opts: [],
          typeis: 'select',
          identification: 'level',
          disableI: true,
        },
        {
          labelName: '变电站',
          placeHolder: '请选择',
          opts: [],
          typeis: 'select',
          identification: 'transformer',
          disableI: true,
        },
        {
          labelName: '装置类型',
          placeHolder: '请选择',
          opts: [],
          typeis: 'select',
          identification: 'type',
          disableI: true,
        },
        {
          labelName: '装置名称',
          placeHolder: '请选择',
          opts: [],
          typeis: 'select',
          identification: 'tname',
          disableI: false,
        },
        {
          labelName: '编号',
          placeHolder: '请输入编号',
          opts: '',
          typeis: 'text',
          identification: 'num',
          disableI: true,
        },
        {
          labelName: '安装位置',
          placeHolder: '请输入安装位置',
          opts: '',
          typeis: 'text',
          identification: 'place',
          disableI: true,
        },
        {
          labelName: '覆盖区域',
          placeHolder: '请输入覆盖区域',
          opts: [],
          typeis: 'select',
          identification: 'area',
          disableI: true,
        },
        {
          labelName: '生产厂家',
          placeHolder: '请输入生产厂家',
          opts: '',
          typeis: 'text',
          identification: 'produ',
          disableI: true,
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
          disableI: true,
        },
        {
          labelName: '设备主人',
          placeHolder: '请输入设备主人',
          opts: '',
          typeis: 'text',
          identification: 'devicepeo',
          disableI: true,
        },
        {
          labelName: '算法版本',
          placeHolder: '请输入算法版本',
          opts: '',
          typeis: 'text',
          identification: 'version',
          disableI: true,
        },
        {
          labelName: 'IP地址',
          placeHolder: '请输入IP地址',
          opts: '',
          typeis: 'text',
          identification: 'ip',
          disableI: true,
        },
        //缺陷
        {
          labelName: '发现时间',
          placeHolder: '',
          opts: '',
          typeis: 'mulCheck',
          identification: 'detectedate',
        },
        {
          labelName: '缺陷类型',
          placeHolder: '请选择缺陷类型',
          opts: [
            { id: 0, vals: '云台' },
            { id: 1, vals: '摄像头' },
          ],
          typeis: 'select',
          identification: 'detecttype',
        },
        {
          labelName: '缺陷状态',
          placeHolder: '请选择缺陷状态',
          opts: [
            { id: 0, vals: '未消缺' },
            { id: 1, vals: '已消缺' },
          ],
          typeis: 'select',
          identification: 'detectstate',
        },
        {
          labelName: '缺陷描述',
          placeHolder: '',
          opts: '',
          typeis: 'text',
          identification: 'defectdescription',
        },

        {
          labelName: '缺陷发现人',
          placeHolder: '',
          opts: '',
          typeis: 'text',
          identification: 'detecteperson',
        },
        {
          labelName: '缺陷等级',
          placeHolder: '请选择缺陷等级',
          opts: [
            { id: 0, vals: '一般缺陷' },
            { id: 1, vals: '严重缺陷' },
          ],
          typeis: 'select',
          identification: 'defectlevel',
        },
      ],
      custIsShow: false,
      ParameterLists: ['显示设置', '填报', '修改', '删除', '导出', '预览'],
      conditions: ['筛选', '重置'],
      addIsShows: false,
      dialogVisible: false,
      hasSelection: {},
      filterVals: [],
      filterTabDatas: [],
      filterObj: {},
      selectDataIs: [],
      defectData: [],
      seleFilters: [],
    }
  },
  methods: {
    async editFun(child) {
      // console.log(this.selectDataIs[0])
      this.$bus.$emit('editDefeat', this.editTabTitle)
      this.$refs[child].showAddBooks()
      // 请求回显缺陷信息
      const defectParams = {
        task: 'getCameraDefectByID',
        defectID: this.selectDataIs[0].defectID,
      }
      const defectRes = await patroCameraLedger(defectParams)
      //请求回显装置信息
      const cameraParams = {
        task: 'getCamera',
        camera_id: this.selectDataIs[0].cameraID,
      }
      const cameraRes = await patroCameraLedger(cameraParams)
      const showDatas = { ...cameraRes.data, ...defectRes.data }
      console.log('cameraRes', cameraRes.data, 'defectRes', defectRes.data, 'showDatas', showDatas)
      this.$bus.$emit('showEdit', showDatas)
    },
    getFromGrason(val) {
      this.addIsShows = val
    },
    getFromCust(val) {
      this.custIsShow = val
    },
    refresh() {
      this.getDefeatList(this.pageNowIs)
    },
    getDefeatList(pageNowIs) {
      const defeatParams = {
        task: 'getCameraDefectList',
        pageNow: pageNowIs ? pageNowIs : 1,
      }
      // console.log(defeatParams, 'defeatParams')
      this.$refs.childTab.selectIf(defeatParams, 'cameraData')
    },
    async handleTags(item) {
      if (item === '填报') {
        const _this = this
        _this.$bus.$emit('showEdit', {})
        _this.$bus.$emit('addDefeat', this.addTabTitle)
        _this.$refs.childAddBooks.showAddBooks()
        setTimeout(() => {
          _this.$bus.$emit('showDefault', true)
        }, 600)
      } else if (item === '修改') {
        if (this.selectDataIs.length > 1) {
          return this.$message.error('只能选择一条修改')
        } else if (this.selectDataIs.length === 0) {
          return this.$message.error('您并未选择需要修改的数据')
        }
        this.editFun('childAddBooks')
      } else if (item === '预览') {
        if (this.selectDataIs.length > 1) {
          return this.$message.error('只能选择一条预览')
        } else if (this.selectDataIs.length === 0) {
          return this.$message.error('您并未选择预览的数据')
        }
        this.editFun('childPreview')
      } else if (item === '导出') {
        if (this.selectDataIs.length === 0) {
          const params = {
            task: 'getCameraDefectList',
            export: 1,
          }
          const exports = await exportFiles(params)
          download(exports, '导出.xlsx')
        }
      } else if (item === '删除') {
        const _this = this
        _this.$bus.$on('helloEdit', function (msg) {
          _this.hasSelection = msg
        })
        _this.dialogVisible = true
      } else if (item === '显示设置') {
        this.$refs.childCustom.showCustom()
      } else if (item === '筛选') {
        handleFilter(
          this,
          {
            task: 'getCameraDefectList',
          },
          'cameraData'
        )
      } else if (item === '重置') {
        const _this = this
        resetIpt(_this)
        _this.filterVals = []
        _this.getDefeatList()
      }
    },
    delTab() {
      delDatas(this, 'delCameraDefect', 'defectID')
    },
  },
  mounted() {
    //台账跳转默认勾选
    console.log(this.$route, '$route.params')
    this.$refs.childTab.toggleRowSelected(this.$route.query.cameraid)
    pullDown(this, 'getSelectList', 0, 'defeat')
    setTimeout(() => {
      this.$bus.$emit('pullDownLists', _this.pullDownLists)
    }, 800)
    // console.log(this.pullDownLists, 'pulldata')
    //获取列表数据
    this.getDefeatList()
    const _this = this
    _this.$bus.$on('pageNow', function (msg) {
      // console.log(msg, '页码')
      _this.pageNowIs = msg
      _this.getDefeatList(msg)
    })
    _this.$bus.$on('input', function (msg) {
      _this.filterVals.push(msg)

      for (let j = _this.filterVals.length - 1; j >= 0; j--) {
        for (let k = 1; k < _this.filterVals.length; k++) {
          if (_this.filterVals[j]) {
            if (_this.filterVals[j].lableName === _this.filterVals[j - k].lableName) {
              _this.filterVals.splice(j - k, j - k + 1)
            }
          }
        }
      }
      _this.$bus.$emit('pullDownLists', _this.pullDownLists)

      // console.log(_this.filterVals)
    })
    _this.$bus.$on('maskIsShow', function (data) {
      // console.log(data)
      _this.maskShow = data
    })
    _this.$bus.$on('selectDatas', function (data) {
      console.log(data)
      _this.selectDataIs = data
    })
  },
  beforeDestroy() {
    const _this = this
    // 销毁事件（重要）
    _this.$bus.$off('helloEdit')
    _this.$bus.$off('input')
    _this.$bus.$off('selectDatas')
    _this.$bus.$off('maskIsShow')
  },
}
</script>
<style scoped>
@import '../../padcss/thiscommen.scss';
</style>
