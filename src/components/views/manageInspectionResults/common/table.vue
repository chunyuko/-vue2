<template>
  <div class="comTableDiv">
    <el-table
      :data="tableData"
      stripe
      @selection-change="handleSelectionChange"
      @cell-dblclick="dblclick"
      v-bind="MaxHeight"
      ref="commonTable"
    >
      <el-table-column label="选择" width="55" v-if="isShowRadio">
        <template slot-scope="scope">
          <el-radio v-model="radio" :label="scope.row.id" @change="returnId"
            ><span></span
          ></el-radio>
        </template>
      </el-table-column>

      <el-table-column type="selection" width="55" v-if="isShowCheck"> </el-table-column>
      <template v-for="(valTable, index) in tableTitles">
        <el-table-column
          :key="index"
          :label="valTable.label"
          :width="valTable.width"
          show-overflow-tooltip
          v-if="valTable.isShow"
        >
          <template slot-scope="scope">
            <span v-if="valTable.prop === 'id'">{{ pagenum * 10 + scope.$index + 1 }}</span>
            <el-progress
              v-else-if="valTable.prop === 'CheckDevPro'"
              :text-inside="true"
              :stroke-width="16"
              :percentage="
                parseFloat(scope.row.CheckDevPro) > 100 ? 100 : parseFloat(scope.row.CheckDevPro)
              "
              color="#2873f5"
            ></el-progress>
            <!-- 巡检异常确认详情 -->
            <a
              href="###"
              v-else-if="valTable.prop === 'detailConfirm'"
              @click="ConfirmShowDialog(scope.row.id)"
              >查看</a
            >
            <!-- 未处理异常详情 -->
            <a
              href="###"
              v-else-if="valTable.prop === 'detailUnprocessed'"
              @click="unprocessedShowDialog(scope.row.id)"
              >查看</a
            >
            <span v-else>{{ scope.row[valTable.prop] }}</span>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <!--   <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>巡视异常确认左半边</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      multipleSelection: [],
      gridData: [],
      /* dialogVisible: false, */
      //选中行id
      radio: '',
      MaxHeight: {},
    }
  },
  name: 'insResultTables',
  props: ['tableTitles', 'tableData', 'tableMaxHeight', 'isShowCheck', 'isShowRadio', 'pagenum'],
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    //巡检异常界面确认弹窗弹出
    ConfirmShowDialog(resultID) {
      this.radio = resultID
      this.$emit('clickShowDialog', resultID)
    },
    //未处理异常确认弹窗弹出
    unprocessedShowDialog(resultID) {
      const _this = this
      console.log('未处理异常确认弹窗弹出,ID: ', resultID)
      _this.$emit('clickShowDialog', resultID)
    },
    //表格单选时，改变触发将id传给父组件
    returnId() {
      const _this = this
      _this.$emit('returnResultID', this.radio)
    },
    //双击事件
    dblclick(row, column, cell, event) {
      console.log('121212')
      this.$emit('tableDblClick', row)
    },
  },
  watch: {
    tableData: {
      handler(newVal, oldVal) {
        this.$nextTick(() => {
          //解决设置最大高度出现的表头空白，还没测试
          if (this.$refs.commonTable.$el.offsetHeight > parseInt(this.tableMaxHeight)) {
            this.MaxHeight = { maxHeight: this.tableMaxHeight }
          }
        })
      },
      deep: true, //深度侦听，（对象里面层的值改变了）
      immediate: false, //立即侦听（网页打开handler执行一次）
    },
  },
}
</script>

<style scoped lang="scss">
.is-scrolling-none {
  background: #14357b;
}
.el-progress-bar__outer {
  background: #14357b;
}
.el-table {
  color: #fff;
  :deep(.el-table__empty-block) {
    width: 100% !important;
  }
}
/* 在table不设置高度时，有空白 ，采用下面两个样式*/
.comTableDiv :deep(.el-table__header) {
  width: 100% !important;
  th {
    text-align: center;
  }
  th:nth-child(1),
  th:nth-child(2) {
    border-right: 0.1rem #0a284c solid !important;
  }
}

.comTableDiv :deep(.el-table__body) {
  width: 100% !important;
  caret-color: rgba(0, 0, 0, 0);
  td {
    text-align: center;
  }
  td:nth-child(1),
  td:nth-child(2) {
    border-right: 0.1rem #0a284c solid !important;
  }
  .el-tooltip {
    width: 100% !important;
    a {
      color: #256df7;
    }
  }
  .el-progress-bar__outer {
    background-color: #4579be !important;
    .el-progress-bar__innerText {
      color: #fff !important;
    }
  }
}
</style>
