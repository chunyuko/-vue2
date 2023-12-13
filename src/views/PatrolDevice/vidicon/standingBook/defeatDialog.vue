<template>
  <el-dialog :title="topTitles" class="addBooks" :visible.sync="dialogVisible" width="100%">
    <!-- <div class="titleIs">{{ addTitles }}</div> -->
    <!-- 基本信息 -->
    <add-books-tags
      v-on="$listeners"
      :searchIs="newDatas"
      :dateShows="dateShow"
      :buttonShowIs="false"
      hasTitle="true"
      :className="wrongClss"
      :titleIs="topTitles"
      >基本信息</add-books-tags
    >
    <!-- :dateTypeIs="datesType" -->
    <div class="" v-if="showOr">
      <add-books-tags
        v-on="$listeners"
        :searchIs="newData"
        :dateShows="dateShow"
        :buttonShowIs="false"
        hasTitle="true"
        :className="wrongClss"
        :butTop="butTopTo"
        :titleIs="topTitles"
        >缺陷信息</add-books-tags
      >
      <!--   :dateTypeIs="datesType" -->
    </div>
    <el-button @click="goDefeat">前往缺陷管理页面</el-button>
  </el-dialog>
</template>
<script>
import AddBooksTags from '../../commenDevice/addBooksTags.vue'
import { dialgDrag } from '@/utils/mixin/patrolDevice/dialog'
export default {
  name: 'MrAddBooks',
  props: ['addTitle', 'showOr'],
  inject: {
    searchDatas: {
      default: '',
    },
  },
  mixins: [dialgDrag],
  provide() {
    return {
      // checkOptTo: this.checkOptTos,
    }
  },
  data() {
    return {
      butTopTo: 'margin-top:8rem',
      wrongClss: 'top:-2rem',
      grandfather: true,
      addTitles: this.addTitle,
      dateShow: true,
      buttonShow: true,
      newData: [
        {
          labelName: '发现时间',
          placeHolder: '',
          opts: '',
          typeis: 'sigCheck',
        },
        {
          labelName: '缺陷类型',
          placeHolder: '',
          opts: [
            { id: '0', vals: '云台' },
            { id: '1', vals: '摄像头' },
          ],
          typeis: 'select',
        },
        {
          labelName: '缺陷发现人',
          placeHolder: '',
          opts: '',
          typeis: 'text',
        },
        {
          labelName: '缺陷描述',
          placeHolder: '',
          opts: '',
          typeis: 'text',
          classNameIs: 'doubleIpt',
        },
      ],
      newDatas: [
        {
          labelName: '出厂序列号',
          placeHolder: '',
          opts: '',
          typeis: 'text',
        },
        {
          labelName: '缺陷次数',
          placeHolder: '',
          opts: '',
          typeis: 'text',
        },
        {
          labelName: '投运日期',
          placeHolder: '请选择',
          opts: '',
          typeis: 'sigCheck',
        },
        {
          labelName: '退运日期',
          placeHolder: '请选择',
          opts: '',
          typeis: 'sigCheck',
        },
      ],
      searchDatasDefeat: [
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
          labelName: '发现时间',
          placeHolder: '',
          opts: '',
          typeis: 'mulCheck',
          identification: 'detectedate',
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
      dialogVisible: false,
      topTitles: '缺陷详情',
      showDatas: {},
    }
  },
  components: {
    AddBooksTags,
  },
  methods: {
    showAddBooks() {
      this.dialogVisible = true
    },
    goDefeat() {
      this.$router.push({
        path: '/PatrolDevice/DeviceFlaw/DefectReport/index',
        query: { cameraid: this.showDatas },
      })
    },
  },
  created() {
    this.newDatas = this.searchDatasDefeat.concat(this.newDatas)
    this.newDatas = this.newDatas.filter((item) => {
      return (
        item.labelName !== '缺陷类型' &&
        item.labelName !== '缺陷状态' &&
        item.labelName !== '缺陷描述' &&
        item.labelName !== '发现时间' &&
        item.labelName !== '缺陷等级' &&
        item.labelName !== '缺陷发现人'
      )
    })
  },
  mounted() {
    const _this = this
    _this.$bus.$on('maskIsShow', function (msg) {
      _this.dialogVisible = msg
    })
    _this.$bus.$on('showEdit', function (msg) {
      _this.showDatas = msg
    })
  },
}
</script>
<style scoped lang="scss">
.addBooks {
  :deep(.el-dialog) {
    width: 128rem;
    height: 0rem;
    margin-top: 0rem !important;
    .el-dialog__header {
      background-color: #0d60ae;
      line-height: 2.4rem;
      cursor: move;
      .el-dialog__title {
        color: #fff;
      }
    }
    .el-dialog__body::before,
    .el-dialog__body::after {
      content: '';
      display: block;
    }
    .el-dialog__body::after {
      clear: both;
    }
    .el-dialog__body {
      background-color: #06255d;
      padding: 0;
      .dialogConfirmTitle {
        text-align: center;
        color: #fff;
        font-size: 2.2rem;
        margin-top: -1rem;
      }
      .dialogConfirm {
        .el-divider {
          background-color: #105eae;
        }
        .el-divider__text.is-center {
          background: #105eae;
          color: #fff;
          height: 3rem;
          line-height: 3rem;
          border-radius: 1.5rem;
        }
        .dialogConfirmLeft {
          width: 49%;
          float: left;
          margin-right: 2%;
          button {
            float: right;
            background: #013aaa;
            border: 0rem;
            padding: 0;
            margin: 0;
            width: 8rem;
            height: 2.4rem;
            color: #fff;
          }
          #confirmButton2 {
            margin-right: 0.2rem;
            background: #155fef;
          }
          .el-input .el-input__inner {
            color: #fff;
            background: none;
            border: solid 0.1rem #4278c0;
            height: 3rem;
            width: 21rem;
          }
          .el-form-item {
            margin-bottom: 1.5rem;
          }
        }
        .dialogConfirmRight {
          width: 49%;
          float: left;
          .el-input .el-input__inner {
            color: #fff;
            background: none;
            border: solid 0.1rem #4278c0;
            height: 3rem;
            width: 21rem;
          }
          .el-form-item {
            margin-bottom: 1.8rem;
          }
          .el-radio__label {
            color: #fff;
          }
        }
      }
    }
    .el-dialog__footer {
      background-color: #06255d;
      height: 6rem;
      margin-top: -2rem;
    }
  }
}
.addBooks {
  width: 131.5rem !important;
  // height: calc(1050px * 0.8);
  background-color: #07275d;
  position: absolute;
  height: 70rem;
  overflow: auto;
  top: 130px;
  left: 13%;
  z-index: 1000;
  :deep(.el-button) {
    background-color: #1562ac;
    position: absolute;
    right: 2.5rem;
    top: 63rem;
    color: #fff;
    border: 0rem;
    font-size: 1.6rem;
  }
}
.titleIs {
  width: 131.5rem !important;
  height: 4.8rem;
  background-color: #1562ac;
  color: #fff;
  font-size: 18px;
  box-sizing: border-box;
  padding: 12px 20px;
}
:deep(.el-radio-group) {
  display: flex;
  margin-top: 15px;
  width: 200px;
}
:deep(.el-form-item__label) {
  width: 11rem !important;
}
</style>
