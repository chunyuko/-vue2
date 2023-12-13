<template>
  <el-dialog :title="addTitles" class="addBooks" :visible.sync="dialogVisible" width="100%">
    <!-- 基本信息 -->
    <add-books-tags
      v-on="$listeners"
      :searchIs="newDatas"
      :dateShows="dateShow"
      :buttonShowIs="false"
      hasTitle="true"
      :titleIs="addTitles"
      :className="wrongClss1"
      >计划信息</add-books-tags
    >
    <div>
      <add-books-tags
        v-on="$listeners"
        :searchIs="newData"
        :dateShows="dateShow"
        :buttonShowIs="buttonShow"
        hasTitle="true"
        :className="wrongClss"
        :titleIs="addTitles"
        :butTop="butTopcls"
        >维保信息</add-books-tags
      >
    </div>
  </el-dialog>
</template>
<script>
import AddBooksTags from '../../commenDevice/addBooksTags.vue'
// import { pullDownList } from '@/service/api/views/patrolDevice/deviceAlarm.js'
import { dialgDrag } from '@/utils/mixin/patrolDevice/dialog'
export default {
  name: 'MpAddBooks',
  props: ['addTitle', 'searchDatas'],
  mixins: [dialgDrag],
  data() {
    return {
      butTopcls: 'margin-top:8rem',
      wrongClss: 'top: -4%;',
      wrongClss1: 'top: -2rem',
      grandfather: true,
      addTitles: this.addTitle,
      dateShow: true,
      buttonShow: true,
      newData: [
        {
          labelName: '维保时间',
          placeHolder: '',
          opts: [],
          typeis: 'sigCheck',
        },
        {
          labelName: '维保单位',
          placeHolder: '',
          opts: [],
          typeis: 'text',
        },
        {
          labelName: '维保人员',
          placeHolder: '',
          opts: [],
          typeis: 'text',
        },
        {
          labelName: '联系电话',
          placeHolder: '',
          opts: [],
          typeis: 'text',
        },
        {
          labelName: '维保内容',
          placeHolder: '',
          opts: [],
          typeis: 'text',
          classNameIs: 'bigIpt',
        },
        {
          labelName: '工作负责人',
          placeHolder: '',
          opts: [],
          typeis: 'text',
          classNameIs: 'brsIpt',
        },
        {
          labelName: '维保结论',
          placeHolder: '',
          opts: ['不合格', '合格'],
          typeis: 'CheckBoxOne',
        },
        {
          labelName: '备注',
          placeHolder: '',
          opts: [],
          typeis: 'text',
          classNameIs: 'bigsIpt',
        },
      ],
      newDatas: [
        {
          labelName: '计划时间',
          placeHolder: '',
          opts: [],
          typeis: 'sigCheck',
          classNameIs: 'brIpt',
        },
        {
          labelName: '维保类型',
          placeHolder: '',
          opts: ['临时维护', '月度维护', '季度维护', '年度维护'],
          typeis: 'CheckBoxOne',
        },
      ],
      searchData: [],
      dialogVisible: false,
    }
  },
  components: {
    AddBooksTags,
  },
  created() {
    this.searchData = this.searchDatas.filter((item) => {
      return (
        item.labelName === '运维单位' ||
        item.labelName === '部门/班组' ||
        item.labelName === '电压等级' ||
        item.labelName === '变电站' ||
        item.labelName === '计划名称' ||
        item.labelName === '维保类型'
      )
    })
    this.newDatas = this.searchData.concat(this.newDatas)
    // console.log(this.searchData, 'this.searchData', 'searchDatas', this.searchDatas)
  },
  mounted() {
    const _this = this
    _this.$bus.$on('dialogVisibleval', function (msg) {
      _this.dialogVisible = msg
    })
    _this.$bus.$on('maskIsShow', function (msg) {
      _this.dialogVisible = msg
    })
  },
  beforeDestroy() {
    const _this = this
    // 销毁事件（重要）
    _this.$bus.$off('dialogVisibleval')
    _this.$bus.$off('maskIsShow')
  },
}
</script>
<style scoped lang="scss">
.addBooks {
  width: 131.5rem;
  // height: calc(1050px * 0.8);
  background-color: #07275d;
  position: absolute;
  top: 2rem;
  left: 15%;
  height: 80rem;
  overflow: none;
  margin-top: 2rem;
  z-index: 1000;
  margin-bottom: 1.8rem;
  margin-left: -4.1rem !important;
}
.titleIs {
  width: 131.5rem;
  height: 4.8rem;
  background-color: #1562ac;
  color: #fff;
  font-size: 14px;
  box-sizing: border-box;
  padding: 12px 20px;
}
:deep(.el-radio-group) {
  display: flex;
  margin-top: 15px;
  width: 200px;
}
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
:deep(.el-form-item__label) {
  width: 11rem !important;
}
</style>
