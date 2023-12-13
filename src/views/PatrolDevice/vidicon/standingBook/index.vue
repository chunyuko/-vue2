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
        v-for="(item, index) in searchDatas"
        :key="index + 2"
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
        ref="showRowDatas"
        v-for="(item, index) in dateDatas"
        :key="index"
        :isOpts="item.opts != ''"
        style="display: flex"
        :itemType="item.typeis"
        :searchDatas="searchDatas"
        :labName="item.labelName"
        :plaHolder="item.placeHolder"
        :filterIpt="filterVals"
      >
      </search-opts>
    </div>

    <div class="app-title">
      <i></i>
      <p>台账列表</p>
      <span
        v-for="(item, index) in ParameterLists"
        :key="index"
        @click="handleTags(item)"
        class="litTabs"
      >
        <a href="javascript:;" v-if="item === '导入'" class="Exporta">
          <span class="btnExport">
            <el-upload
              :limit="3"
              action="http://127.0.0.1:7777/api162/dalirobotcms/ajax/cameraData.php"
              :show-file-list="false"
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              :on-success="handleAvatarSuccess"
            >
              <el-button type="primary" style="left: -5px; top: -4px; position: absolute"
                >导入</el-button
              >
            </el-upload>
          </span>
        </a>

        <a href="javascript:;" v-else>
          <span>{{ item }}</span></a
        >
      </span>
    </div>
    <div class="is-table">
      <table-lists ref="childTab" :tabTitle="tabTitles"></table-lists>
    </div>
    <div class="pageIs">
      <page-contents></page-contents>
    </div>
    <!-- 弹窗页面 -->
    <add-books @father="getFromGrason"></add-books>
    <custom-fields
      ref="childCustom"
      :treeDatas="treeData"
      @tofather="getFromCust"
      :customTipIs="customTip"
    ></custom-fields>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <div style="padding: 2rem; color: #fff; font-size: 1.8rem">确认删除所选内容吗?</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="delTab">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 缺陷次数弹窗 -->
    <mr-add-books ref="childAddBooks" @father="getFromGrason" :showOr="true"></mr-add-books>
  </div>
</template>
<script>
import MrAddBooks from './defeatDialog.vue'
import AddBooks from './addBooks.vue'
import CustomFields from '../../commenDevice/customFields.vue'
import SearchOpts from '../../commenDevice/search.vue'
import { mixin } from '@/utils/mixin/patrolDevice/mixin'
import TableLists from '../../commenDevice/zztable.vue'
import PageContents from '../../commenDevice/pagecontents.vue'

export default {
  name: 'StandingBook', //'standingBook',
  components: {
    SearchOpts,
    TableLists,
    PageContents,
    AddBooks,
    CustomFields,
    MrAddBooks,
  },
  mixins: [mixin],
  data() {
    return {
      customTip: '摄像机台账',
      //筛选遍历数据
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
          placeHolder: '请选择',
          opts: [],
          typeis: 'select',
          identification: 'area',
        },
        {
          labelName: '生产厂家',
          placeHolder: '请输入生产厂家',
          opts: [],
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
          labelName: '出厂序列号',
          placeHolder: '请输入出场序列号',
          opts: '',
          typeis: 'text',
          identification: 'serialnumber',
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
          labelName: '缺陷次数',
          placeHolder: '请输入缺陷次数',
          opts: '',
          typeis: 'text',
          identification: 'flawnum',
        },
        {
          labelName: '设备状态',
          placeHolder: '请选择',
          opts: [
            { id: 0, fId: 0, vals: '不在线' },
            { id: 1, fId: 1, vals: '在线' },
          ],
          typeis: 'select',
          identification: 'Offline',
          disableI: true,
        },
      ],

      dateDatas: [
        {
          labelName: '投运日期',
          placeHolder: '请选择',
          opts: [],
          typeis: 'mulCheck',
          identification: 'operationtime',
        },
        {
          labelName: '退运日期',
          placeHolder: '请选择',
          opts: [],
          typeis: 'mulCheck',
          identification: 'returntime',
        },
      ],
      //显示设置字段
      treeData: [
        {
          id: '1',
          label: '全部',
          children: [
            {
              id: '1',
              label: '变电站名称',
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
              label: '缺陷次数',
              prop: 'flawnum',
              type: '',
              width: '',
            },
            {
              id: '15',
              label: '投运日期',
              prop: 'operationtime',
              type: '',
              width: '',
            },
            {
              id: '16',
              label: '退运日期',
              prop: 'returntime',
              type: '',
              width: '',
            },
            {
              id: '17',
              label: '设备状态',
              prop: 'Offline',
              type: '',
              width: '',
            },
          ],
        },
      ],
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
          label: '变电站名称',
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
          width: '120',
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
          label: '装置名称',
          prop: 'tname',
          type: '',
          width: '200',
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
          label: '出场序列号',
          prop: 'serialnumber',
          type: '',
          width: '100',
        },
        {
          label: '设备型号',
          prop: 'tnum',
          type: '',
          width: '',
        },
        {
          label: '缺陷次数',
          prop: 'flawnum',
          type: '',
          width: '80',
        },
        {
          label: '投运日期',
          prop: 'operationtime',
          type: '',
          width: '140',
          Ishow: false,
        },
        {
          label: '退运日期',
          prop: 'returntime',
          type: '',
          width: '140',
          Ishow: false,
        },
        {
          label: '设备状态',
          prop: 'Offline',
          type: '',
          width: '80',
        },
      ],
      defeatDialogVisible: false,
    }
  },
  mounted() {
    // console.log(this.$route, '$route.params')
  },
}
</script>
<style scoped lang="scss">
@import '../../padcss/thiscommen.scss';
</style>
