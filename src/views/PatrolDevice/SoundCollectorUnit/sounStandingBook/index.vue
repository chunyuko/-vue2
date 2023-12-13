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
              action="https://jsonplaceholder.typicode.com/posts/"
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
      customTip: '声音采集器台账',
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
          labelName: '规格型号',
          placeHolder: '请选择',
          opts: [],
          typeis: 'select',
          identification: 'soundSpeciModel',
        },
        {
          labelName: '供电电压',
          placeHolder: '请选择',
          opts: [
            { id: '0', fId: '0', vals: '10kV' },
            { id: '1', fId: '1', vals: '500kV' },
          ],
          typeis: 'select',
          identification: 'proVal',
        },
        {
          labelName: '阵列功耗',
          placeHolder: '请输入',
          opts: '',
          typeis: 'text',
          identification: 'arrayPower',
        },
        {
          labelName: '工作温度范围',
          placeHolder: '请输入',
          opts: '',
          typeis: 'text',
          identification: 'temperScope',
        },
        {
          labelName: '防水等级',
          placeHolder: '请输入',
          opts: '',
          typeis: 'text',
          identification: 'waterProof',
        },
        {
          labelName: '信噪比',
          placeHolder: '请输入',
          opts: '',
          typeis: 'text',
          identification: 'signalNoiseRadio',
        },
        {
          labelName: '灵敏度',
          placeHolder: '请输入',
          opts: [],
          typeis: 'text',
          identification: 'sensitivity',
        },
        {
          labelName: '频响范围',
          placeHolder: '请输入',
          opts: '',
          typeis: 'text',
          identification: 'frequencyRes',
        },
        {
          labelName: '指向性',
          placeHolder: '请输入',
          opts: '',
          typeis: 'text',
          identification: 'directivity',
        },
        {
          labelName: '阵列体积',
          placeHolder: '请输入',
          opts: '',
          typeis: 'text',
          identification: 'arrayVolum',
        },
        {
          labelName: '阵列重量',
          placeHolder: '请输入',
          opts: '',
          typeis: 'text',
          identification: 'arrayWeight',
        },
        {
          labelName: '阵列孔径',
          placeHolder: '请输入',
          opts: '',
          typeis: 'text',
          identification: 'arrayAperture',
        },
        {
          labelName: '阵列个数',
          placeHolder: '请输入',
          opts: '',
          typeis: 'text',
          identification: 'arrayNumer',
        },
        {
          labelName: '采样频率',
          placeHolder: '请输入',
          opts: '',
          typeis: 'text',
          identification: 'sampleFrequency',
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
              label: '规格型号',
              prop: 'specifiation',
              type: '',
              width: '',
            },
            {
              id: '6',
              label: '供电电压',
              prop: 'prval',
              type: '',
              width: '',
            },
            {
              id: '7',
              label: '阵列功耗',
              prop: 'powerdisp',
              type: '',
              width: '',
            },
            {
              id: '8',
              label: '工作温度范围',
              prop: 'temperrange',
              type: '',
              width: '',
            },
            {
              id: '9',
              label: '防水等级',
              prop: 'waterProof',
              type: '',
              width: '',
            },
            {
              id: '10',
              label: '信噪比',
              prop: 'signalNoiseRadio',
              type: '',
              width: '',
            },
            {
              id: '11',
              label: '灵敏度',
              prop: 'sensitivity',
              type: '',
              width: '',
            },
            {
              id: '12',
              label: '频响范围',
              prop: 'frequencyRes',
              type: '',
              width: '',
            },
            {
              id: '13',
              label: '指向性',
              prop: 'directivity',
              type: '',
              width: '',
            },
            {
              id: '14',
              label: '阵列体积',
              prop: 'arrayVolum',
              type: '',
              width: '',
            },
            {
              id: '15',
              label: '阵列重量',
              prop: 'arrayWeight',
              type: '',
              width: '',
            },
            {
              id: '16',
              label: '阵列孔径',
              prop: 'arrayAperture',
              type: '',
              width: '',
            },
            {
              id: '17',
              label: '阵列个数',
              prop: 'arrayNumer',
              type: '',
              width: '',
            },
            {
              id: '18',
              label: '采样频率',
              prop: 'sampleFrequency',
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
          label: '规格型号',
          prop: 'specifiation',
          type: '',
          width: '120',
        },
        {
          label: '供电电压',
          prop: 'prval',
          type: '',
          width: '200',
        },

        {
          label: '阵列功耗',
          prop: 'powerdisp',
          type: '',
          width: '120',
        },
        {
          label: '工作温度范围',
          prop: 'temperrange',
          type: '',
          width: '150',
        },
        {
          label: '防水等级',
          prop: 'waterProof',
          type: '',
          width: '',
        },
        {
          label: '信噪比',
          prop: 'signalNoiseRadio',
          type: '',
          width: '',
        },
        {
          label: '灵敏度',
          prop: 'sensitivity',
          type: '',
          width: '',
        },
        {
          label: '频响范围',
          prop: 'frequencyRes',
          type: '',
          width: '',
        },
        {
          label: '指向性',
          prop: 'directivity',
          type: '',
          width: '',
        },
        {
          label: '阵列体积',
          prop: 'arrayVolum',
          type: '',
          width: '',
        },
        {
          label: '阵列重量',
          prop: 'arrayWeight',
          type: '',
          width: '',
        },
        {
          label: '阵列孔径',
          prop: 'arrayAperture',
          type: '',
          width: '',
        },
        {
          label: '阵列个数',
          prop: 'arrayNumer',
          type: '',
          width: '',
        },
        {
          label: '采样频率',
          prop: 'sampleFrequency',
          type: '',
          width: '',
        },
      ],
    }
  },
}
</script>
<style scoped>
@import '../../padcss/thiscommen.scss';
</style>
