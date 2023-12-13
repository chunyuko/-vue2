<template>
  <el-dialog :title="addTitles" class="addBooks" width="100%" :visible.sync="dialogVisible">
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
import { dialgDrag } from '@/utils/mixin/patrolDevice/dialog'
export default {
  name: 'MpAddBooks',
  inject: {
    searchDatas: {
      default: '',
    },
  },
  mixins: [dialgDrag],
  data() {
    return {
      butTops: 'margin-top: 5.2rem',
      wrongClss: ' top: -1.8rem;',
      grandfather: true,
      addTitles: '',
      dateShow: true,
      searchData: [],
      newDatas: [
        {
          labelName: '维保类型',
          placeHolder: '',
          opts: ['临时维护', '月度维护', '季度维护', '年度维护'],
          typeis: 'CheckBoxOne',
          identification: 'maintaintype',
        },
        {
          labelName: '计划内容',
          placeHolder: '',
          opts: [],
          typeis: 'text',
          classNameIs: 'doubleIpt',
          identification: 'plancontent',
        },
        {
          labelName: '是否生产周期计划',
          placeHolder: '',
          opts: ['否', '是'],
          typeis: 'CheckBoxOne',
          classNameIs: 'doubleIpt',
          identification: 'iscycle',
        },
      ],
      addDatas: [
        {
          labelName: '计划时间',
          placeHolder: '请选择',
          opts: [],
          typeis: 'sigCheck',
        },
      ],
      dialogVisible: false,
    }
  },
  components: {
    AddBooksTags,
  },
  created() {
    if (this.searchData) {
      this.searchData = this.searchDatas.filter((item) => {
        return (
          item.labelName !== '计划状态' &&
          item.labelName !== '维保类型' &&
          item.labelName !== '计划时间'
        )
      })

      this.searchData = this.searchData.concat(this.addDatas)
    }
  },

  mounted() {
    const _this = this
    _this.$bus.$on('dialogVisibleval', function (msg) {
      _this.dialogVisible = msg
    })
    _this.$bus.$on('maskIsShow', function (msg) {
      _this.dialogVisible = msg
    })
    _this.$bus.$on('add', function (msg) {
      _this.addTitles = msg
    })
    _this.$bus.$on('edit', function (msg) {
      _this.addTitles = msg
    })
  },
  beforeDestroy() {
    const _this = this
    // 销毁事件（重要）
    _this.$bus.$off('dialogVisibleval')
    _this.$bus.$off('maskIsShow')
    _this.$bus.$off('add')
    _this.$bus.$off('edit')
  },
}
</script>
<style scoped lang="scss">
.BigLabel :deep(.el-form-item__label) {
  width: 14.6rem !important;
}

.addBooks {
  width: 131.5rem;
  background-color: #07275d;
  position: absolute;
  top: 10rem;
  left: 16%;
  height: 56rem;
  overflow: none;
  margin-top: 2rem;
  z-index: 1000;
  margin-bottom: 1.8rem;
  margin-left: -4.1rem !important;
}
:deep(.el-form-item__label) {
  width: 11.1rem !important;
}
:deep(.el-radio__inner) {
  margin-left: 3rem;
}
:deep(.el-radio__label) {
  font-size: 1.6rem;
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
  margin-top: 1rem !important;
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
</style>
