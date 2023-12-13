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
          ref="showRowDatas"
        >
        </search-opts>
      </div>
    </div>
    <div class="datetimes">
      <search-opts
        v-for="item in dateType"
        :key="item.id"
        :typeShow="item.typeDate"
        :optionIs="item.opts"
      >
        <span class="demonstration" v-if="item.typeDate == 'mulCheck'"> {{ item.startName }}</span>
      </search-opts>
    </div>

    <div class="app-title">
      <i></i>
      <p>缺陷处理单列表</p>
      <span
        v-for="(item, index) in ParameterLists"
        :key="index"
        @click="handleTags(item)"
        class="litTabs"
        ><a href="javascript:;">
          <span>{{ item }}</span></a
        >
      </span>
    </div>
    <div class="is-table">
      <table-lists
        :tabTitle="tabTitles"
        ref="childTab"
        hastitleYS="验收结论(outSide)"
        :tabStyleTo="TabStyle"
      ></table-lists>
      <!-- hastitleYS="验收结论" -->
    </div>
    <div class="pageIs">
      <page-contents></page-contents>
    </div>

    <add-books ref="childAdd"> </add-books>
    <custom-fields
      ref="childCustom"
      :treeDatas="treeData"
      @tofather="getFromCust"
      :customTipIs="customTip"
    ></custom-fields>
    <!-- 预览界面 -->
    <pre-view ref="childPreView"></pre-view>
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
import AddBooks from './addBooks.vue'
import SearchOpts from '../../commenDevice/search.vue'
// import DateTime from '../../commenDevice/dateTime.vue'
import TableLists from '../../commenDevice/zztable.vue'
import PageContents from '../../commenDevice/pagecontents.vue'
import CustomFields from '../../commenDevice/customFields.vue'
import PreView from './defeatPreView.vue'
import {
  resetIpt,
  handleFilter,
  pullDown,
  handleDefeat,
  delDatas,
  bookEdit,
  bookPreview,
  download,
} from '@/views/PatrolDevice/js/commenFun'
import { exportFiles } from '@/service/api/views/patrolDevice/deviceAlarm.js'
export default {
  name: 'standingBook',
  components: {
    SearchOpts,
    // DateTime,
    TableLists,
    PageContents,
    AddBooks,
    CustomFields,
    PreView,
  },
  provide() {
    return {
      searchDatasIs: this.searchDatas,
      addItemShow: this.addIsShow,
      tabTitleTo: this.tabTitles,
      refresh: this.refresh,
      customTipI: this.customTip,
      filterVals: this.filterVals,
    }
  },
  data() {
    return {
      pullDownLists: {},
      customTip: '装置消缺安排',
      bookAddTitle: '缺陷处理',
      sheetEditTitle: '处理单修改',
      sheetPreViewTitle: '处理单预览',
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
          label: '运维单位',
          prop: 'name',
          type: '',
          width: '100',
        },
        {
          label: '部门/班组',
          prop: 'part',
          type: '',
          width: '120',
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
          width: '120',
        },
        {
          label: '处理单名称',
          prop: 'sheetDesc',
          type: '',
          width: '240',
        },
        {
          label: '编制时间',
          prop: 'progdeveltime',
          type: '',
          width: '',
        },
        {
          label: '编制人',
          prop: 'author',
          type: '',
          width: '120',
        },
        {
          label: '备注',
          prop: 'comments',
          type: '',
          width: '280',
        },
        {
          label: '处理单状态',
          prop: 'procestate',
          type: '',
          width: '130',
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
          width: '150',
        },
        // {
        //   label: '验收结论',
        //   prop: 'receptionconclu',
        //   type: '',
        //   width: '150',
        // },
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
          placeHolder: '巡视摄像机',
          opts: [],
          typeis: 'select',
          identification: 'type',
        },
        {
          labelName: '装置名称',
          placeHolder: '请选择',
          opts: [],
          typeis: 'select',
          identification: 'tname',
        },
        {
          labelName: '编制时间',
          placeHolder: '请输入编号',
          opts: '',
          typeis: 'mulCheck',
        },
        {
          labelName: '处理单名称',
          placeHolder: '请选择处理单名称',
          opts: '',
          typeis: 'select',
          identification: 'sheetDesc',
        },
        {
          labelName: '编制人',
          placeHolder: '请输入编制人',
          opts: '',
          typeis: 'text',
        },
        {
          labelName: '处理单状态',
          placeHolder: '请选择',
          opts: [
            { id: 0, fId: 0, vals: '已完成' },
            { id: 1, fId: 1, vals: '未完成' },
          ],
          typeis: 'select',
        },
        {
          labelName: '验收人',
          placeHolder: '请输入验收人员',
          opts: '',
          typeis: 'text',
        },
        {
          labelName: '验收时间',
          placeHolder: '请输入验收时间',
          opts: '',
          typeis: 'text',
        },
        {
          labelName: '备注',
          placeHolder: '请输入备注',
          opts: '',
          typeis: 'text',
          identification: 'comments',
        },
      ],
      //显示设置字段
      treeData: [
        {
          id: 1,
          label: '全部',
          children: [
            {
              id: '1',
              label: '运维单位',
              prop: 'name',
              type: '',
              width: '',
            },
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
              label: '处理单名称',
              prop: 'sheetDesc',
              type: '',
              width: '',
            },
            {
              id: '7',
              label: '编制时间',
              prop: 'progdeveltime',
              type: '',
              width: '',
            },
            {
              id: '8',
              label: '编制人',
              prop: 'author',
              type: '',
              width: '',
            },
            {
              id: '9',
              label: '备注',
              prop: 'comments',
              type: '',
              width: '',
            },
            {
              id: '10',
              label: '处理单状态',
              prop: 'defectdescription',
              type: '',
              width: '',
            },
            {
              id: '11',
              label: '验收人员',
              prop: 'checkperson',
              type: '',
              width: '',
            },

            {
              id: '12',
              label: '验收时间',
              prop: 'receptiontime',
              type: '',
              width: '',
            },
          ],
        },
      ],
      ParameterLists: ['显示设置', '缺陷处理', '修改', '删除', '导出', '预览'],
      conditions: ['筛选', '重置'],
      addIsShow: false,
      dialogVisibleval: true,
      hasSelection: {},
      dialogVisible: false,
      custIsShow: false,
      filterVals: [],
      filterTabDatas: [],
      filterObj: {},
      showEdit: {},
      selectDataIs: [],
      seleFilters: [],
      finalParam: {},
    }
  },
  methods: {
    getFromGrason(val) {
      this.addIsShow = val
    },
    getFromCust(val) {
      this.custIsShow = val
    },
    refresh() {
      this.getArrangeList(this.pageNowIs)
    },
    getArrangeList(pageNowIs) {
      const defeatParams = {
        task: 'getCameraDefectRelation',
        pageNow: pageNowIs ? pageNowIs : 1,
      }
      this.$refs.childTab.selectIf(defeatParams, 'cameraData')
    },
    async handleTags(item) {
      // alert(this.addIsShow);
      if (item === '缺陷处理') {
        this.$bus.$emit('bookAddTitle', this.bookAddTitle)
        handleDefeat(this, 'getCameraDefectRelation', 'sheetID')
        //   bookAddTitle: '缺陷处理',
        // sheetEditTitle: '处理单修改',
      } else if (item === '复制') {
        alert('')
      } else if (item === '删除') {
        const _this = this
        _this.$bus.$on('helloEdit', function (msg) {
          _this.hasSelection = msg
        })
        this.dialogVisible = true
      } else if (item === '修改') {
        this.$bus.$emit('sheetEditTitle', this.sheetEditTitle)
        bookEdit(this, 'getCameraDefectRelation', 'sheetID', '修改')
      } else if (item === '导出') {
        console.log('导出缺陷安排列表')
        const params = {
          task: 'getCameraDefectRelation',
          export: 1,
        }
        const exports = await exportFiles(params)
        download(exports, '缺陷安排列表.xlsx')
      } else if (item === '导入') {
        alert('')
      } else if (item === '显示设置') {
        this.$refs.childCustom.showCustom()
      } else if (item === '筛选') {
        handleFilter(
          this,
          {
            task: 'getCameraDefectRelation',
          },
          'cameraData'
        )
      } else if (item === '重置') {
        resetIpt(this)
      } else if (item === '预览') {
        if (this.selectDataIs.length > 1) {
          return this.$message.error('只能选择一条预览')
        } else if (this.selectDataIs.length === 0) {
          return this.$message.error('您并未选择需要预览的数据')
        }
        this.$bus.$emit('dialogVisiblepre', this.dialogVisibleval)
        this.$bus.$emit('sheetPreViewTitle', this.sheetPreViewTitle)
        bookPreview(this, 'getCameraDefectRelation', 'sheetID', '预览')
      }
    },
    delTab() {
      delDatas(this, 'delCameraDefectRelation', 'sheetID')
    },
  },
  mounted() {
    pullDown(this, 'getSelectList', 0, 'viction')
    this.getArrangeList()
    const _this = this
    _this.$bus.$on('pageNow', function (msg) {
      // console.log(msg, '页码')
      _this.pageNowIs = msg
      _this.getArrangeList(msg)
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
    _this.$bus.$on('selectDatas', function (msg) {
      _this.selectDataIs = msg
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
