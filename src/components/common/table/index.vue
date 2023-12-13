<script>
import { defineComponent, defineProps, toRefs, defineEmits } from 'vue'
import usePagination from './usePagination'
export default defineComponent({
  name: '',
})
</script>

<script setup>
const emits = defineEmits([
  'size-change',
  'page-change',
  'toInspectionTaskPage',
  'exportSingleTaskDetails',
  'startTask',
  'endTask',
  'pauseTask',
  'restartTask',
  'selectionChange',
  'cell-dblclick',
  'row-click',
])
const locationHref = window.location.href.indexOf('isOut')
const { tableData, pagination, url, flag, changeTask, loading } = toRefs(props)
const { handleSizeChange, handleCurrentChange } = usePagination(pagination, url, emits)
const props = defineProps({
  tableData: {
    type: Array,
    default: () => [],
  },
  columns: {
    type: Array,
    default: () => [],
    require: true,
  },
  //分页配置项，默认为空时不开启分页
  pagination: {
    type: Object,
    default: () => {},
  },
  url: {
    type: String,
    default: '',
  },
  flag: {
    type: Boolean,
    default: null,
  },
  changeTask: {
    type: Boolean,
    default: null,
  },
  loading: {
    type: Boolean,
    default: null,
  },
  // ispagination: {
  //   type: Boolean,
  //   default: true,
  // },
})
const toInspectionTaskPage = (scope) => {
  emits('toInspectionTaskPage', scope)
}
const exportSingleTaskDetails = (scope) => {
  emits('exportSingleTaskDetails', scope)
}
const startTask = (scope) => {
  emits('startTask', scope)
}
const endTask = (scope) => {
  emits('endTask', scope)
}
const pauseTask = (scope) => {
  emits('pauseTask', scope)
}
const restartTask = (scope) => {
  emits('restartTask', scope)
}
const format = (percentage) => {
  return percentage == 0 ? '' : Number(percentage)
}
const handleSelectionChange = (val) => {
  emits('selectionChange', val)
}
const handleDbRow = (row) => {
  emits('cell-dblclick', row)
}
const handleTableRow = (row) => {
  emits('row-click', row)
}

// console.log('通用table组件', tableData, pagination, url)
</script>

<template>
  <!--简单封装有需求复杂可以添加  -->
  <div>
    <!-- 巡视任务管理表单处理 -->
    <el-table
      :data="tableData"
      :height="locationHref == -1 ? '640' : '720'"
      style="width: 100%"
      v-if="flag"
    >
      <template v-for="(item, index) in columns">
        <el-table-column
          :key="item.stationName"
          v-bind="item"
          show-overflow-tooltip
          v-if="item.prop == 'details'"
          width="280%"
        >
          <div slot-scope="scope">
            <div style="display: flex; justify-content: space-around" id="detail">
              <span @click="toInspectionTaskPage(scope.row.UUID)"> 查看 </span>
              <span @click="exportSingleTaskDetails(scope.row.UUID)"> 导出 </span>
              <span @click="startTask(scope.row.Task_Path_Id)"> 启动 </span>
              <span @click="endTask(scope.row.UUID)"> 终止 </span>
              <span @click="pauseTask(scope.row.UUID)"> 暂停 </span>
              <span @click="restartTask(scope.row.UUID)"> 继续 </span>
            </div>
          </div>
        </el-table-column>
        <el-table-column
          :key="index.inspectStartTime"
          v-bind="item"
          show-overflow-tooltip
          v-else-if="item.prop == 'inspectStartTime'"
          width="120%"
        >
          <div slot-scope="scope">
            {{ scope.row.inspectStartTime }}
          </div>
        </el-table-column>
        <el-table-column
          :key="index.inspectEndTime"
          v-bind="item"
          show-overflow-tooltip
          v-else-if="item.prop == 'inspectEndTime'"
          width="120%"
        >
          <div slot-scope="scope">{{ scope.row.inspectEndTime }}</div>
        </el-table-column>
        <el-table-column
          :key="index.taskName"
          v-bind="item"
          v-else-if="item.prop == 'inspectResult'"
          width="380%"
        >
          <div slot-scope="scope">
            <div style="display: flex; justify-content: space-around">
              <span>总测点: {{ scope.row.inspectResult.total }}</span>
              <span class="inspectResult_normal">正常: {{ scope.row.inspectResult.normal }}</span>
              <span class="inspectResult_warning">告警: {{ scope.row.inspectResult.warning }}</span>
              <span class="inspectResult_fail">失败: {{ scope.row.inspectResult.fail }}</span>
              <span class="inspectResult_fail"
                >识别异常: {{ scope.row.inspectResult.exceptions }}</span
              >
            </div>
          </div>
        </el-table-column>
        <el-table-column :key="item.areaName" v-bind="item" v-else-if="item.prop == 'inspectSpeed'">
          <div slot-scope="scope">
            <el-progress
              :text-inside="true"
              :stroke-width="20"
              :percentage="Number(scope.row.inspectSpeed)"
              :format="format"
            ></el-progress>
          </div>
        </el-table-column>
        <el-table-column
          :key="item.inspectStatus"
          v-bind="item"
          v-else-if="item.prop == 'inspectStatus'"
        >
          <div slot-scope="scope">
            {{
              scope.row.inspectStatus == 1
                ? '终止'
                : scope.row.inspectStatus == 2
                ? '待执行'
                : scope.row.inspectStatus == 3
                ? '巡视中'
                : scope.row.inspectStatus == 4
                ? '暂停'
                : scope.row.inspectStatus == 5
                ? '超期'
                : scope.row.inspectStatus == 6
                ? '已完成'
                : ''
            }}
          </div>
        </el-table-column>
        <el-table-column :key="index" v-bind="item" show-overflow-tooltip v-else> </el-table-column>
      </template>
      <template #empty>
        <div class="table-empty" v-loading="loading">
          <slot name="empty">
            <div v-if="tableData == ''">暂无数据</div>
          </slot>
        </div>
      </template>
    </el-table>
    <!-- 普通表单处理 -->
    <el-table
      v-else
      :data="tableData"
      :height="changeTask ? '210' : locationHref == -1 ? '640' : '720'"
      style="width: 100%"
      @row-click="handleTableRow"
      @selection-change="handleSelectionChange"
      @cell-dblclick="handleDbRow"
    >
      <slot name="header"></slot>
      <el-table-column
        v-for="(item, index) in columns"
        :key="index"
        v-bind="item"
        show-overflow-tooltip
      >
      </el-table-column>
      <!-- 操作部分的插槽 -->
      <slot name="table"></slot>
      <template #empty>
        <div class="table-empty" v-loading="loading">
          <slot name="empty">
            <div v-if="tableData == ''">暂无数据</div>
          </slot>
        </div>
      </template>
    </el-table>
    <el-pagination
      v-if="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagination.pageNum"
      :page-sizes="pagination.pageSizes"
      :page-size="pagination.pageSize"
      :pager-count="pagination.pagerCount"
      v-bind="$attrs"
      layout="total, sizes, prev, pager, next"
      :total="pagination.total"
    >
    </el-pagination>
  </div>
</template>

<style scoped lang="scss">
.blueTheme .el-pagination .el-pagination__total {
  color: black;
}
#detail span {
  cursor: pointer;
}
#detail span:hover {
  color: #0c82ff;
}
.inspectResult_normal {
  color: #008000;
  margin-left: 0.5rem;
}
.inspectResult_warning {
  color: #ff0000;
  margin-left: 0.5rem;
}
.inspectResult_fail {
  color: #ffa500;
  margin-left: 0.5rem;
}
</style>
