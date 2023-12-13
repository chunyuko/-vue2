<template>
  <el-dialog
    :title="topTitles"
    class="addBooks"
    :visible.sync="dialogVisible"
    width="100%"
    :show-close="true"
  >
    <!--   :before-close="handleClose" -->
    <add-books-tags
      v-on="$listeners"
      :searchIs="addDatas"
      :titleIs="topTitles"
      :className="wrongClss"
      v-bind="$attrs"
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
      :titleIs="topTitles"
      :className="wrongClss"
      :butTop="butTopcls"
      ><span>{{ item.titleName }}</span>
    </add-books-tags>
  </el-dialog>
</template>
<script>
import AddBooksTags from '../../commenDevice/addBooksTags.vue'
import { dialgDrag } from '@/utils/mixin/patrolDevice/dialog'
export default {
  name: 'AddBooks',
  inject: {
    searchDatasIs: { default: null },
  },
  props: ['addTitle'],
  mixins: [dialgDrag],
  data() {
    return {
      butTopcls: 'margin-top:4rem',
      wrongClss: ' margin-top: 2.5rem;',
      grandfather: true,
      addTitles: this.addTitle,
      topTitles: '',
      dateIsShow: true,
      addDatas: [
        // {
        //   labelName: '生产厂家',
        //   placeHolder: '请输入生产厂家',
        //   opts: '',
        //   typeis: 'select',
        //   identification: 'produ',
        // },
        {
          labelName: '投运日期',
          placeHolder: '请选择',
          opts: [],
          typeis: 'sigCheck',
          identification: 'operationTime',
        },
        {
          labelName: '退运日期',
          placeHolder: '请选择',
          opts: [],
          typeis: 'sigCheck',
          identification: 'returnTime',
        },
      ],
      tags: [
        {
          titleName: '主要参数',
          buttonShow: false,
          searchDatas: [
            {
              labelName: '红外功能',
              placeHolder: '请选择',
              opts: [
                { id: 0, vals: '关' },
                { id: 1, vals: '开' },
              ],
              typeis: 'select',
            },
            {
              labelName: '可见光功能',
              placeHolder: '请选择',
              opts: [
                { id: 0, vals: '关' },
                { id: 1, vals: '开' },
              ],
              typeis: 'select',
            },
            {
              labelName: '雨刷功能',
              placeHolder: '请选择',
              opts: [
                { id: 0, vals: '关' },
                { id: 1, vals: '开' },
              ],
              typeis: 'select',
            },
            {
              labelName: '黑夜模式',
              placeHolder: '请选择',
              opts: [
                { id: 0, vals: '关' },
                { id: 1, vals: '开' },
              ],
              typeis: 'select',
            },
            {
              labelName: '移动侦探',
              placeHolder: '请选择',
              opts: [
                { id: 0, vals: '关' },
                { id: 1, vals: '开' },
              ],
              typeis: 'select',
            },
            {
              labelName: '红外流地址',
              placeHolder: '请输入',
              opts: [],
              typeis: 'text',
            },
            {
              labelName: '可见光流地址',
              placeHolder: '请输入',
              opts: [],
              typeis: 'text',
            },
          ],
          dateShow: false,
          imagsShow: false,
        },
        {
          titleName: '图片信息',
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
      filterData: [],
    }
  },
  components: {
    AddBooksTags,
  },
  created() {
    this.filterData = this.searchDatasIs.map((item) => {
      if (item.labelName === '生产厂家') {
        item.typeis = 'select'
      }
      return item
    })
    this.addDatas = this.filterData.concat(this.addDatas)
    // console.log(this.addDatas)
  },
  mounted() {
    const _this = this
    _this.$bus.$on('dialogVisibleval', function (msg) {
      // console.log(msg)
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
.addBooks {
  width: 131.5rem;
  background-color: #07275d;
  position: absolute;
  top: 0rem;
  left: 16%;
  // height: 102rem;
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
    }
    .el-dialog__footer {
      background-color: #06255d;
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
  font-size: 1.6rem;
}

.titleIs {
  width: 131.5rem;
  height: 4.8rem;
  background-color: #1562ac;
  color: #fff;
  font-size: 1.6rem;
  box-sizing: border-box;
  padding: 1.2rem 2rem;
}
</style>
