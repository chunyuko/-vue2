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
          labelName: '投运日期',
          placeHolder: '请选择',
          opts: [],
          typeis: 'sigCheck',
        },
        {
          labelName: '尺寸',
          placeHolder: '',
          opts: [],
          typeis: 'text',
        },
        {
          labelName: '重量',
          placeHolder: '',
          opts: [],
          typeis: 'text',
        },
        {
          labelName: '信号传输',
          placeHolder: '',
          opts: [],
          typeis: 'text',
        },
        {
          labelName: '防护等级',
          placeHolder: '',
          opts: [],
          typeis: 'text',
        },
        {
          labelName: '通讯方式',
          placeHolder: '',
          opts: [],
          typeis: 'text',
        },
        {
          labelName: '速度',
          placeHolder: '',
          opts: [],
          typeis: 'text',
        },
        {
          labelName: '左右定位精度',
          placeHolder: '',
          opts: [],
          typeis: 'text',
        },
        {
          labelName: '前后定位精度',
          placeHolder: '',
          opts: [],
          typeis: 'text',
        },
        {
          labelName: '导航方式',
          placeHolder: '',
          opts: [],
          typeis: 'text',
        },
        {
          labelName: '红外光子码流',
          placeHolder: '',
          opts: [],
          typeis: 'text',
        },
        {
          labelName: '可见光主码流',
          placeHolder: '',
          opts: [],
          typeis: 'text',
        },
        {
          labelName: '可见光子码流',
          placeHolder: '',
          opts: [],
          typeis: 'text',
        },
        {
          labelName: '红外光主码流',
          placeHolder: '',
          opts: [],
          typeis: 'text',
        },
      ],
      tags: [
        {
          titleName: '主要参数',
          wrongClss: 'top:-2rem',
          buttonShow: false,
          searchDatas: [
            {
              labelName: '红外功能',
              placeHolder: '请选择',
              opts: ['开', '关'],
              typeis: 'select',
            },
            {
              labelName: '可见光功能',
              placeHolder: '请选择',
              opts: ['开', '关'],
              typeis: 'select',
            },
            {
              labelName: '雨刷功能',
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
            {
              labelName: '防跌落功能',
              placeHolder: '请选择',
              opts: ['开', '关'],
              typeis: 'select',
            },
            {
              labelName: '避障功能',
              placeHolder: '请输入',
              opts: ['开', '关'],
              typeis: 'select',
            },
            {
              labelName: '车灯功能',
              placeHolder: '请输入',
              opts: ['开', '关'],
              typeis: 'select',
            },
            {
              labelName: '充电房',
              placeHolder: '请输入',
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
      dialogVisible: false,
    }
  },
  components: {
    AddBooksTags,
  },
  created() {
    this.addDatas = this.searchDatasIs.concat(this.addDatas)
    // console.log(this.addDatas)
    this.addDatas = this.addDatas.filter((item) => {
      return (
        item.labelName !== '覆盖区域' &&
        item.labelName !== '设备主人' &&
        item.labelName !== '安装位置' &&
        item.labelName !== '算法版本' &&
        item.labelName !== '缺陷次数' &&
        item.labelName !== 'IP地址'
      )
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
/*scrollbar-arrow-color: #82c3ff !important;
scrollbar-base-color: #08193d !important;
scrollbar-face-color: #08193d !important;
scrollbar-track-color: #193b82 !important;
scrollbar-shadow-color: #08193d !important;*/
.addBooks::-webkit-scrollbar-thumb {
  border-radius: 0.1rem;
  box-shadow: inset 0 0 0.5rem rgba(0, 0, 0, 0.2);
  background: #08193d;
}
:deep(.el-form-item__label) {
  width: 8rem !important;
}
</style>
