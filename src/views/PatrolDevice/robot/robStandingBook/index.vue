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
    <add-books v-show="addIsShow" @father="getFromGrason"></add-books>
    <!-- <edit-books v-show="editIsShow" @father="getFromGrason" :addTitle="bookEditTitle"></edit-books> -->
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
import AddBooks from './addBooks.vue'
import CustomFields from '../../commenDevice/customFields.vue'
import SearchOpts from '../../commenDevice/search.vue'
import { mixin } from '@/utils/mixin/patrolDevice/mixin'
import TableLists from '../../commenDevice/zztable.vue'
import PageContents from '../../commenDevice/pagecontents.vue'
export default {
  name: 'standingBook',
  components: {
    SearchOpts,
    // EditBooks,
    TableLists,
    PageContents,
    AddBooks,
    CustomFields,
  },
  mixins: [mixin],
  data() {
    return {
      customTip: '机器人台账',
      // :customTipIs="customTip"
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
          labelName: '生产厂家',
          placeHolder: '请选择',
          opts: [{ id: 1, fId: 1, vals: '大立科技' }],
          typeis: 'select',
          identification: 'robotProdu',
        },

        // {
        //   labelName: '设备型号',
        //   placeHolder: '请选择',
        //   opts: [{ id: '1', fId: '1', vals: 'DL-momo' }],
        //   typeis: 'select',
        //   identification: 'tnum',
        // },
        {
          labelName: '出厂序列号',
          placeHolder: '请输入出场序列号',
          opts: '',
          typeis: 'text',
          identification: 'serialnumber',
        },
      ],
      treeData: [
        {
          id: 1,
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
              label: '重量',
              prop: 'weight',
              type: '',
              width: '',
            },
            {
              id: '9',
              label: '信号传输',
              prop: 'transmission',
              type: '',
              width: '',
            },
            {
              id: '10',
              label: '防护等级',
              prop: 'protectLevel',
              type: '',
              width: '',
            },
            {
              id: '11',
              label: '通讯方式',
              prop: 'commMode',
              type: '',
              width: '',
            },
            {
              id: '12',
              label: '速度',
              prop: 'carMoveSpeed',
              type: '',
              width: '',
            },
            {
              id: '13',
              label: '左右定位精度',
              prop: 'leftRightPrecision',
              type: '',
              width: '',
            },
            {
              id: '14',
              label: '前后定位精度',
              prop: 'frontBackPrecision',
              type: '',
              width: '',
            },
            {
              id: '15',
              label: '导航方式',
              prop: 'navigation',
              type: '',
              width: '',
            },
            {
              id: '16',
              label: '生产厂家',
              prop: 'robotProdu',
              type: '',
              width: '',
            },
            {
              id: '17',
              label: '出场序列号',
              prop: 'serialnumber',
              type: '',
              width: '',
            },
            // {
            //   id: '18',
            //   label: '设备型号',
            //   prop: 'tnum',
            //   type: '',
            //   width: '',
            // },
            {
              id: '19',
              label: '投运日期',
              prop: 'operationtime',
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
          label: '重量',
          prop: 'weight',
          type: '',
          width: '80',
        },
        {
          label: '信号传输',
          prop: 'transmission',
          type: '',
          width: '80',
        },
        {
          label: '防护等级',
          prop: 'protectLevel',
          type: '',
          width: '80',
        },
        {
          label: '通讯方式',
          prop: 'commMode',
          type: '',
          width: '80',
        },
        {
          label: '速度',
          prop: 'carMoveSpeed',
          type: '',
          width: '80',
        },
        {
          label: '左右定位精度',
          prop: 'leftRightPrecision',
          type: '',
          width: '180',
        },
        {
          label: '前后定位精度',
          prop: 'frontBackPrecision',
          type: '',
          width: '180',
        },
        {
          label: '导航方式',
          prop: 'navigation',
          type: '',
          width: '80',
        },
        {
          label: '生产厂家',
          prop: 'robotProdu',
          type: '',
          width: '120',
        },
        {
          label: '出场序列号',
          prop: 'serialnumber',
          type: '',
          width: '120',
        },
        {
          label: '设备型号',
          prop: 'tnum',
          type: '',
          width: '',
        },
        {
          label: '投运日期',
          prop: 'operationtime',
          type: '',
          width: '140',
          // Ishow: false,
        },
      ],
    }
  },
}
</script>
<style scoped>
@import '../../padcss/thiscommen.scss';
</style>
