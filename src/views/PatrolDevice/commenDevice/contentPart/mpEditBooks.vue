<template>
  <el-dialog
    :title="addTitles"
    class="addBooks"
    :visible.sync="dialogVisible"
    width="100%"
    :before-close="handleClose"
  >
    <!-- 基本信息 -->
    <add-books-tags
      v-on="$listeners"
      :searchIs="searchData"
      :dateShows="dateShow"
      :buttonShowIs="false"
      hasTitle="true"
      :titleIs="addTitles"
      :className="wrongClss"
      >基本信息</add-books-tags
    >
    <add-books-tags
      class="mtType"
      v-on="$listeners"
      :searchIs="newDatas.slice(0, 1)"
      :dateShows="dateShow"
      :buttonShowIs="false"
      hasTitle="false"
      :titleIs="addTitles"
    ></add-books-tags>

    <add-books-tags
      class="plaCon"
      v-on="$listeners"
      :searchIs="newDatas.slice(1, 2)"
      :dateShows="dateShow"
      :buttonShowIs="false"
      hasTitle="false"
      :titleIs="addTitles"
    ></add-books-tags>
    <add-books-tags
      v-on="$listeners"
      :searchIs="newDatas.slice(2, 3)"
      :dateShows="dateShow"
      :buttonShowIs="true"
      hasTitle="false"
      class="BigLabel"
      :titleIs="addTitles"
      :butTop="butTops"
    ></add-books-tags>
  </el-dialog>
</template>
<script>
import AddBooksTags from '../../commenDevice/addBooksTags.vue'
export default {
  name: 'MpAddBooks',
  props: ['addTitle'],
  inject: {
    searchDatas: {
      default: '',
    },
  },
  provide() {
    return {
      // checkOptTo: this.checkOptTos,
    }
  },
  data() {
    return {
      butTops: 'margin-top: -3rem !important;',
      wrongClss: ' top: -1.8rem;',
      grandfather: true,
      addTitles: this.addTitle,
      dateShow: true,
      searchData: [],
      newDatas: [
        {
          labelName: '维保类型',
          placeHolder: '',
          opts: ['年度维护', '季度维护', '月度维护', '临时维护'],
          typeis: 'CheckBoxOne',
        },
        {
          labelName: '计划内容',
          placeHolder: '',
          opts: [],
          typeis: 'text',
          classNameIs: 'doubleIpt',
        },
        {
          labelName: '是否生产周期计划',
          placeHolder: '',
          opts: ['是', '否'],
          typeis: 'CheckBoxOne',
          classNameIs: 'doubleIpt',
        },
      ],
      dialogVisible: false,
    }
  },
  components: {
    AddBooksTags,
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
  },
  created() {
    this.searchData = this.searchDatas.filter((item) => {
      return item.labelName !== '计划状态' && item.labelName !== '维保类型'
    })
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
.BigLabel :deep(.el-form-item__label) {
  width: 14.6rem !important;
}

.addBooks {
  width: calc(0.9 * 131.5rem);
  background-color: #07275d;
  position: absolute;
  top: 28rem;
  left: 18%;
  height: 44.9rem;
  overflow: none;
  margin-top: 2rem;
  z-index: 1000;
  margin-bottom: 1.8rem;
  margin-left: -4.1rem !important;
}
:deep(.el-form-item__label) {
  width: 9.1rem !important;
}
:deep(.el-radio__inner) {
  margin-left: 3rem;
}
.titleIs {
  width: 131.5rem;
  height: 4.8rem;
  background-color: #1562ac;
  color: #fff;
  font-size: 1.4rem;
  box-sizing: border-box;
  padding: 1.2rem 2rem;
}
:deep(.el-radio-group) {
  display: flex;
  margin-top: 1.5rem;
  width: 20rem;
}
.mtType,
.plaCon,
.BigLabel {
  margin-top: -3rem !important;
}
.mtType :deep(.el-form-item) {
  margin-bottom: 1rem !important;
}
.plaCon :deep(.el-form-item) {
  margin-bottom: 1rem !important;
}
.addBooks {
  :deep(.el-dialog) {
    width: 128rem;
    height: 0rem;
    margin-top: 0rem !important;
    .el-dialog__header {
      background-color: #0d60ae;
      line-height: 2.4rem;
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
</style>
