<template>
  <div class="addBooks">
    <div class="titleIs">{{ addTitles }}</div>
    <!-- 基本信息 -->
    <add-books-tags
      v-on="$listeners"
      :searchIs="searchData"
      :dateShows="dateShow"
      :buttonShowIs="buttonShow"
      hasTitle="true"
      >基本信息</add-books-tags
    >
    <!-- :dateTypeIs="datesType" -->
  </div>
</template>
<script>
import AddBooksTags from '../../commenDevice/addBooksTags.vue'
import { dialgDrag } from '@/utils/mixin/patrolDevice/dialog'
export default {
  name: 'MpAddBooks',
  props: ['addTitle'],
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
      grandfather: true,
      addTitles: this.addTitle,
      dateShow: true,
      buttonShow: true,
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
        },
        {
          labelName: '是否生产周期计划',
          placeHolder: '',
          opts: ['是', '否'],
          typeis: 'CheckBoxOne',
        },
      ],
    }
  },
  components: {
    AddBooksTags,
  },
  methods: {},
  created() {
    this.searchData = this.searchDatas.filter((item) => {
      return item.labelName !== '计划状态' && item.labelName !== '维保类型'
    })
    // console.log(this.searchData)
    this.searchData = this.searchData.concat(this.newDatas)
  },
}
</script>
<style scoped lang="scss">
.addBooks {
  width: 1318px;
  // height: calc(1050px * 0.8);
  background-color: #07275d;
  position: absolute;
  top: 130px;
  left: 13%;
}
:deep(.el-form-item__label) {
  width: 91px !important;
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
:deep(.el-form-item__label) {
  // width: 120px !important;
  // margin-right: 10px;
}
</style>
