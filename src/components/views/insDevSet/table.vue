<template>
  <div class="posTable">
    <!-- 点位表 -->
    <el-table
      :data="tableData"
      stripe
      style="width: 100%; color: #fff"
      :max-height="maxHight"
      @selection-change="handleSelectionChange"
      :header-cell-style="{ textAlign: 'center' }"
      :cell-style="{ textAlign: 'center' }"
    >
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column type="index" width="50" label="序号"></el-table-column>
      <el-table-column
        v-for="(valTable, index) in tableTitles"
        :key="index"
        :label="valTable.label"
        :prop="valTable.prop"
        :width="valTable.width"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <el-progress
            v-if="valTable.prop === '数据库字段9'"
            :text-inside="true"
            :stroke-width="16"
            :percentage="parseFloat(scope.row.数据库字段9)"
          ></el-progress>
          <a href="###" v-else-if="valTable.prop === 'detail'" @click="dialogVisible = true"
            >查看</a
          >
          <span v-else>{{ scope.row[valTable.prop] }}</span>
        </template>
      </el-table-column>
    </el-table>

    <!-- 提示框 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      multipleSelection: [],
      gridData: [],
      dialogVisible: false,
    }
  },
  name: 'devListTables',
  props: ['tableTitles', 'tableData', 'maxHight'],
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
      this.$emit('cellClick', val)
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
  },
}
</script>

<style lang="scss">
// 测试覆盖默认样式  .blueTheme #app .el-table th  的样式
.posInfoList {
  color: green;
  // outline: 1px solid rgb(0, 255, 13);
  margin-top: 0.5rem;

  // 尝试覆盖全局样式
  :deep(.el-table) {
    text-align: center;
    color: #26f8f8 !important;
    // background: #0c41b1;
    .el-table__header,
    .el-table thead,
    .el-table th {
      color: #26f8f8 !important;
    }
  }

  // 临时测试样式覆盖
  :deep(.test1122) {
    outline: red 1px solid;
    border: red 5px solid;
    text-align: center;
    color: green;

    // outline: red 1px solid;
    // background: #0c41b1;
    .el-table__header {
      color: green;
    }
    .blueTheme #app .el-table th {
      color: green;
    }
    .el-table thead {
      color: green;
    }
    .has-gutter {
      color: green;
      outline: red 1px solid;
    }
  }
}
</style>
