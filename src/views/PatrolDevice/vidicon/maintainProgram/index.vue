<template>
  <div class="app-search">
    <div class="app-title">
      <i></i>
      <p>筛选条件</p>
      <span
        v-for="(item, index) in conditions"
        :key="index"
        @click="handleTags(item)"
        class="litTabs"
      >
        <a href="javascript:;">{{ item }}</a>
      </span>
    </div>

    <div class="searchIndex">
      <search-opts
        v-for="(item, index) in searchDatasOne"
        :key="index"
        :isOpts="item.opts != ''"
        style="display: flex"
        :itemType="item.typeis"
        :labName="item.labelName"
        :plaHolder="item.placeHolder"
        :optionIs="item.opts"
        ref="showRowDatas"
      >
      </search-opts>
    </div>

    <div class="app-title">
      <i></i>
      <p>计划列表</p>
      <span
        v-for="(item, index) in ParameterLists"
        :key="index"
        @click="handleTags(item)"
        class="litTabs"
      >
        <a> {{ item }}</a>
      </span>
    </div>
    <div class="is-table" @click="controlHight">
      <table-lists
        :tabTitle="mpTabTitles"
        ref="childTab"
        :mainTainDataIs="toTabDatas"
      ></table-lists>
      <!--    :selfHights="toTabHight" -->
    </div>
    <div class="pageIs">
      <page-contents></page-contents>
    </div>

    <mp-add-books
      ref="childAdd"
      v-show="addIsShows"
      @father="getFromGrason"
      :searchDatas="searchDatasOne"
    ></mp-add-books>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>确认删除所选内容吗?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="delTab">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import MpAddBooks from '../../commenDevice/contentPart/mpAddBooks.vue'
import SearchOpts from '../../commenDevice/search.vue'
import TableLists from '../../commenDevice/zztable.vue'
import PageContents from '../../commenDevice/pagecontents.vue'
import { mpmixin } from '@/utils/mixin/patrolDevice/mpmixin'
export default {
  name: 'maintainProgram',
  components: {
    SearchOpts,
    TableLists,
    PageContents,
    MpAddBooks,
    // MpEditBooks,
  },
  mixins: [mpmixin],
  provide() {
    return {
      mptipIs: { id: 0, tipsI: this.mptips },
    }
  },
  data() {
    return {
      mptips: '摄像机计划',
    }
  },
}
</script>
<style scoped>
@import '../../padcss/thiscommen.scss';
</style>
