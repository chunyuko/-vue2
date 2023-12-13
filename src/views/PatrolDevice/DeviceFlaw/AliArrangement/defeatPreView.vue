<template>
  <el-dialog :title="topTitle" class="addBooks" :visible.sync="preDialogVisible" width="100%">
    <!-- 基本信息 -->
    <add-books-tags :searchIs="addDatas" :className="wrongClss" :titleIs="topTitle"
      >基本信息</add-books-tags
    >
    <add-books-tags
      v-for="(item, index) in tags"
      :key="index"
      :searchIs="item.searchDatas"
      :buttonShowIs="false"
      :dateShows="item.dateShow"
      :imagShows="item.imagsShow"
      :className="item.wrongClss"
      :butTop="butTopTo"
      :titleIs="topTitle"
      ><span>{{ item.titleName }}</span>
    </add-books-tags>
  </el-dialog>
</template>
<script>
export default {
  name: 'PreView',
  provide() {
    return {
      allDisabled: true,
    }
  },
  inject: {
    searchDatasIs: { default: null },
  },
  data() {
    return {
      butTopTo: 'margin-top:6rem',
      wrongClss: 'top:-2rem',
      grandfather: true,
      dateIsShow: true,
      addDatas: [
        {
          labelName: '编制时间',
          placeHolder: '请输入',
          opts: [],
          typeis: 'sigCheck',
        },
        {
          labelName: '处理单名称',
          placeHolder: '请输入',
          opts: [],
          typeis: 'text',
        },
        {
          labelName: '编制人',
          placeHolder: '请输入',
          opts: [],
          typeis: 'text',
        },
        {
          labelName: '消缺单位',
          placeHolder: '请输入',
          opts: [],
          typeis: 'text',
        },
        {
          labelName: '消缺人',
          placeHolder: '请输入',
          opts: [],
          typeis: 'text',
        },
        {
          labelName: '备注',
          placeHolder: '请输入',
          opts: [],
          typeis: 'text',
        },
      ],
      tags: [
        // {
        //   titleName: '缺陷信息',
        //   wrongClss: 'top:-2rem',
        //   buttonShow: false,
        //   searchDatas: [
        //     {
        //       labelName: '',
        //       placeHolder: '',
        //       opts: [],
        //       typeis: 'table',
        //     },
        //   ],
        //   dateShow: false,
        //   imagsShow: false,
        // },
        {
          titleName: '完成情况',
          wrongClss: 'top:-2rem',
          buttonShow: true,
          searchDatas: [
            {
              labelName: '详情',
              placeHolder: '请输入',
              opts: [],
              typeis: 'text',
              classNameIs: 'doubleIpt',
            },
            {
              labelName: '验收人',
              placeHolder: '请输入',
              opts: [],
              typeis: 'text',
              classNameIs: '',
            },
            {
              labelName: '验收时间',
              placeHolder: '请输入',
              opts: '',
              typeis: 'sigCheck',
              classNameIs: '',
            },
            {
              labelName: '验收结果',
              placeHolder: '请选择',
              opts: [
                { id: '0', fId: 0, vals: '不合格' },
                { id: '1', fId: 1, vals: '合格' },
              ],
              typeis: 'select',
              classNameIs: '',
            },
          ],
          dateShow: false,
          imagsShow: false,
        },
      ],
      topTitle: '',
      preDialogVisible: false,
    }
  },
  methods: {
    moveBtn(e) {
      console.log(e)
    },
  },
  mounted() {
    const _this = this
    _this.$bus.$on('sheetPreViewTitle', function (msg) {
      console.log('为啥没有显示标题', msg)
      _this.topTitle = msg
    })
    _this.$bus.$on('dialogVisiblepre', function (msg) {
      _this.preDialogVisible = msg
    })

    const filtSearchData = _this.searchDatasIs.filter((item) => {
      return (
        item.labelName === '运维单位' ||
        item.labelName === '部门/班组' ||
        item.labelName === '电压等级' ||
        item.labelName === '变电站' ||
        item.labelName === '装置类型'
      )
    })
    _this.addDatas = filtSearchData.concat(_this.addDatas)
    // console.log(_this.addDatas, '缺陷安排传递信息')
  },
  beforeDestroy() {
    const _this = this
    // 销毁事件（重要）
    _this.$bus.$off('dialogVisiblepre')
    _this.$bus.$off('sheetEditTitle')
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
  height: 57rem;
  overflow: none;
  margin-top: 2rem;
  z-index: 1000;
  margin-bottom: 1.8rem;
  margin-left: -4.1rem !important;
}
.addBooks {
  :deep(.el-dialog) {
    width: 128rem;
    // height: 0rem;
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
:deep(.el-form-item__label) {
  width: 11rem !important;
}
.titleIs {
  width: 0.9 * 131.5rem;
  height: 4.8rem;
  background-color: #1562ac;
  color: #fff;
  font-size: 14px;
  box-sizing: border-box;
  padding: 12px 20px;
}
</style>
