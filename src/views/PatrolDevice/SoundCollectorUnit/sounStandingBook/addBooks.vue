<template>
  <el-dialog :title="topTitles" class="addBooks" :visible.sync="dialogVisible" width="100%">
    <!-- 基本信息 -->
    <add-books-tags
      v-on="$listeners"
      :searchIs="searchDatasIs"
      :className="wrongClss"
      :titleIs="topTitles"
      >基本信息</add-books-tags
    >
    <add-books-tags
      v-for="(item, index) in tags"
      :key="index"
      v-on="$listeners"
      :searchIs="item.searchDatas"
      :buttonShowIs="item.buttonShow"
      :dateShows="item.dateShow"
      :imagShows="item.imagsShow"
      :className="item.wrongClss"
      :titleIs="topTitles"
      ><span>{{ item.titleName }}</span>
    </add-books-tags>
  </el-dialog>
</template>
<script>
import AddBooksTags from '../../commenDevice/addBooksTags.vue'
export default {
  name: 'AddBooks',
  inject: ['searchDatasIs'],
  props: ['addTitle'],
  data() {
    return {
      wrongClss: 'top:-2rem',
      grandfather: true,
      addTitles: this.addTitle,
      dateIsShow: true,
      tags: [
        {
          titleName: '主要参数',
          wrongClss: 'top:-20%',
          buttonShow: false,
          searchDatas: [
            {
              labelName: '采集功能',
              placeHolder: '请选择',
              opts: [
                { id: '0', fId: '0', vals: '开' },
                { id: '1', fId: '1', vals: '关' },
              ],
              typeis: 'select',
            },
            {
              labelName: '报警功能',
              placeHolder: '请选择',
              opts: [
                { id: '0', fId: '0', vals: '开' },
                { id: '1', fId: '1', vals: '关' },
              ],
              typeis: 'select',
            },
          ],
          dateShow: false,
          imagsShow: false,
        },
        {
          titleName: '图片信息',
          wrongClss: 'top:-2rem',
          buttonShow: false,
          searchDatas: [
            {
              labelName: '',
              placeHolder: '',
              opts: [],
              typeis: 'upload',
              imagName: '铭牌图片',
            },
            {
              labelName: '',
              placeHolder: '',
              opts: [],
              typeis: 'upload',
              imagName: '正面图信息',
            },
            {
              labelName: '',
              placeHolder: '',
              opts: [],
              typeis: 'upload',
              imagName: '背面图信息',
            },
            {
              labelName: '',
              placeHolder: '',
              opts: [],
              typeis: 'upload',
              imagName: '左侧图信息',
            },
            {
              labelName: '',
              placeHolder: '',
              opts: [],
              imagName: '右侧图信息',
            },
          ],
          dateShow: false,
          imagsShow: true,
        },
        {
          titleName: '资料信息',
          wrongClss: 'top:-2rem',
          buttonShow: true,
          searchDatas: [
            {
              labelName: '',
              placeHolder: '',
              opts: [],
              imagName: '上传附件',
            },
          ],
          dateShow: false,
          imagsShow: true,
        },
      ],
      dialogVisible: false,
      topTitles: '',
    }
  },
  components: {
    AddBooksTags,
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
      _this.topTitles = msg
    })
    _this.$bus.$on('edit', function (msg) {
      _this.topTitles = msg
    })
  },
  methods: {
    moveBtn(e) {
      console.log(e)
    },
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
  background-color: #07275d;
  position: absolute;
  top: 1rem;
  left: 16%;
  // height: 83rem;
  overflow: none;
  margin-top: 2rem;
  z-index: 1000;
  margin-bottom: 1.8rem;
  margin-left: -4.1rem !important;
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
.addBooks::-webkit-scrollbar-thumb {
  border-radius: 0.1rem;
  box-shadow: inset 0 0 0.5rem rgba(0, 0, 0, 0.2);
  background: #08193d;
}
:deep(.el-form-item__label) {
  width: 11rem !important;
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
</style>
