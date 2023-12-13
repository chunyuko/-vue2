<template>
  <div class="detail">
    <add-books-tags
      v-on="$listeners"
      :searchIs="newDatas"
      :dateShows="dateShow"
      :buttonShowIs="false"
      hasTitle="true"
      :className="wrongClss"
      :titleIs="topTitles"
      :allDisableId="allDisableId"
      >基本信息</add-books-tags
    >
    <!-- 转缺陷 -->
    <div class="defBtn">
      <el-button @click="transToDefeat">转缺陷</el-button>
    </div>
    <!-- :dateTypeIs="datesType" -->
    <div class="" v-if="trasDefeat === true">
      <add-books-tags
        v-on="$listeners"
        :searchIs="newData"
        :dateShows="dateShow"
        :buttonShowIs="true"
        hasTitle="true"
        :className="wrongClss"
        :butTop="butTopTo"
        :titleIs="topTitles"
        :allDisableId="allDisableDefInfo"
        >缺陷信息</add-books-tags
      >
      <!--   :dateTypeIs="datesType" -->
    </div>
  </div>
  <!-- 基本信息 -->
</template>
<script>
import { dialgDrag } from '@/utils/mixin/patrolDevice/dialog'
export default {
  name: 'DefectPreview',
  props: ['addTitle', 'searchDatas'],
  mixins: [dialgDrag],
  data() {
    return {
      allDisableId: true,
      allDisableDefInfo: false,
      trasDefeat: false,
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
            { id: 0, vals: '摄像头' },
            { id: 1, vals: '云台' },
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
      dialogVisible: false,
      topTitles: '告警详情',
    }
  },

  methods: {
    //转缺陷
    transToDefeat() {
      //显示缺陷填写信息
      this.trasDefeat = true
    },
    showAddBooks() {
      this.dialogVisible = true
    },
  },
  created() {
    this.newDatas = this.searchDatas.concat(this.newDatas)
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
  },
}
</script>
<style scoped lang="scss">
.defBtn {
  margin-left: 109rem;
  :deep(.el-button) {
    background-color: #14357b;
    border: 0;
    color: #fff;
  }
}
</style>
