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
        :searchDatas="searchDatasOne"
        :labName="item.labelName"
        :plaHolder="item.placeHolder"
        :optionIs="item.opts"
        :addTitleI="addTabTitle"
        ref="showRowDatas"
      >
      </search-opts>
    </div>

    <div class="app-title">
      <i></i>
      <p>维保记录</p>
      <span
        v-for="(item, index) in ParameterLists"
        :key="index"
        @click="handleTags(item)"
        class="litTabs"
      >
        <a> {{ item }}</a>
      </span>
    </div>
    <div class="is-table">
      <table-lists :tabTitle="mpTabTitles" ref="childTab"></table-lists>
    </div>
    <div class="pageIs">
      <page-contents></page-contents>
    </div>

    <mr-add-books
      v-show="addIsShows"
      @father="getFromGrason"
      :addTitle="addTabTitle"
      :searchDatas="searchDatasOne"
    ></mr-add-books>
  </div>
</template>
<script>
import MrAddBooks from '../../commenDevice/contentPart/mrAddBooks.vue'
import SearchOpts from '../../commenDevice/search.vue'
import TableLists from '../../commenDevice/zztable.vue'
import PageContents from '../../commenDevice/pagecontents.vue'
import { mrmixin } from '@/utils/mixin/patrolDevice/mrmixin'
export default {
  name: 'sounMaintainRecord',
  components: {
    SearchOpts,
    TableLists,
    PageContents,
    MrAddBooks,
  },
  mixins: [mrmixin],
  provide() {
    return {
      mrtipIs: { id: 0, tipsI: this.mrtips },
    }
  },
  data() {
    return {
      mrtips: '声音采集计划',
    }
  },
}
</script>
<style scoped>
@import '../../padcss/thiscommen.scss';
</style>
