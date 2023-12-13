<template>
  <el-dialog
    :title="addTitles"
    class="addBooks"
    :visible.sync="dialogVisible"
    width="100%"
    :before-close="handleClose"
  >
    <!-- 基本信息 -->
    <add-books-tags v-on="$listeners" :searchIs="addDatas" :className="wrongClss"
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
      wrongClss: 'top:-4%',
      grandfather: true,
      addTitles: this.addTitle,
      dateIsShow: true,
      addDatas: [
        {
          labelName: '运营单位',
          placeHolder: '请选择',
          opts: ['正常', '停用'],
          typeis: 'select',
        },
        {
          labelName: '部门/班组',
          placeHolder: '请选择',
          opts: ['正常', '停用'],
          typeis: 'select',
        },
        {
          labelName: '电压等级',
          placeHolder: '请选择',
          opts: ['正常', '停用'],
          typeis: 'select',
        },
        {
          labelName: '变电站',
          placeHolder: '请选择',
          opts: ['正常', '停用'],
          typeis: 'select',
        },
        {
          labelName: '生产厂家',
          placeHolder: '请选择',
          opts: ['正常', '停用'],
          typeis: 'select',
        },
        {
          labelName: '型号',
          placeHolder: '',
          opts: [],
          typeis: 'text',
        },
        {
          labelName: '类型',
          placeHolder: '',
          opts: [],
          typeis: 'text',
        },
        {
          labelName: '起降方式',
          placeHolder: '',
          opts: [],
          typeis: 'text',
        },
        {
          labelName: '空机重量(kg)',
          placeHolder: '',
          opts: [],
          typeis: 'text',
        },
        {
          labelName: '最大起飞重量(kg)',
          placeHolder: '',
          opts: [],
          typeis: 'text',
        },
        {
          labelName: '抗风等级',
          placeHolder: '',
          opts: [],
          typeis: 'text',
        },
        {
          labelName: '最大速度(km/h)',
          placeHolder: '',
          opts: [],
          typeis: 'text',
        },
        {
          labelName: '最大飞行高度(m)',
          placeHolder: '',
          opts: [],
          typeis: 'text',
        },
        {
          labelName: '续航时间(分钟)',
          placeHolder: '',
          opts: [],
          typeis: 'text',
        },
        {
          labelName: '机身高度(m)',
          placeHolder: '',
          opts: [],
          typeis: 'text',
        },
        {
          labelName: '机身长度(m)',
          placeHolder: '',
          opts: [],
          typeis: 'text',
        },
        {
          labelName: '机身宽度(m)',
          placeHolder: '',
          opts: [],
          typeis: 'text',
        },
        {
          labelName: '控制方式',
          placeHolder: '',
          opts: [],
          typeis: 'text',
        },
        {
          labelName: '作业半径(m)',
          placeHolder: '',
          opts: [],
          typeis: 'text',
        },
      ],
      tags: [
        {
          titleName: '主要参数',
          wrongClss: 'top:-22%',
          buttonShow: false,
          searchDatas: [
            {
              labelName: 'PTK功能',
              placeHolder: '请选择',
              opts: ['开', '关'],
              typeis: 'select',
            },
            {
              labelName: '红外功能',
              placeHolder: '请选择',
              opts: ['开', '关'],
              typeis: 'select',
            },
            {
              labelName: '黑夜模式',
              placeHolder: '请选择',
              opts: ['开', '关'],
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
  },
  methods: {
    moveBtn(e) {
      console.log(e)
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
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
.addBooks {
  width: calc(0.9 * 131.5rem);
  background-color: #07275d;
  position: absolute;
  top: 1rem;
  left: 18%;
  height: 90%;
  overflow: auto;
  margin-top: 2rem;
  z-index: 1000;
  margin-bottom: 1.8rem;
  margin-left: -4.1rem !important;
}
.addBooks::-webkit-scrollbar-thumb {
  border-radius: 0.1rem;
  box-shadow: inset 0 0 0.5rem rgba(0, 0, 0, 0.2);
  background: #08193d;
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
:deep(.el-form-item__label) {
  width: 12rem !important;
}
:deep(.el-form-item__content) {
  margin-left: -2.4rem !important;
  word-break: break-all;
  word-wrap: break-word;
}
</style>
