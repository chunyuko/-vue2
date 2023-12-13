<template>
  <div class="tableDiv">
    <el-table
      :data="tableData"
      stripe
      height="500"
      style="width: 100%; color: #193b82"
      @selection-change="handleSelectionChange"
      :header-cell-style="{ textAlign: 'center' }"
      :cell-style="{ textAlign: 'center' }"
      @row-dblclick="rowdbclick"
      @select="alarmSelectFun"
      highlight-current-row
      @current-change="handleCurrentChange"
    >
      <el-table-column type="selection" width="50"></el-table-column>

      <el-table-column
        v-for="(valTable, index) in tableTitles"
        :key="index"
        :label="valTable.label"
        :prop="valTable.prop"
        show-overflow-tooltip
        :width="valTable.width"
      >
        <!-- :width="valTable.width" -->
        <template slot-scope="scope">
          <el-progress
            v-if="valTable.prop === ''"
            :text-inside="true"
            :stroke-width="16"
            :percentage="parseFloat(scope.row)"
          >
          </el-progress>

          <!-- 操作相关 -->
          <el-button v-if="valTable.prop === 'operation'" type="text" size="small">
            <!-- 停用 -->
          </el-button>

          <span href="###" v-else-if="valTable.prop === 'detail'" @click="dialogVisible = true">
            返回页码
          </span>

          <!-- <span v-else-if="valTable.prop === 'AreaHintFlag'"> -->
          <!-- 检查状态 -->
          <!-- </span> -->

          <!-- 静默监视页面的列表改成静态列表 操作改到上面的功能按钮 -->
          <!-- 新添加其他表头判断 变电站 守望位设置 回归守望时间 守望状态 启用静默监视 静默监视频次 -->
          <!-- <el-select v-else-if="valTable.prop === 'stationName2'" placeholder="变电站">
            <el-option label="XX变电站1" value="station1"></el-option>
            <el-option label="XX变电站2" value="station2"></el-option>
          </el-select>
          <el-select v-else-if="valTable.prop === 'watchPositionSet'" placeholder="守望位设置">
            <el-option label="1-守望位" value="position1"></el-option>
            <el-option label="2-守望位" value="position2"></el-option>
          </el-select>
          <el-select v-else-if="valTable.prop === 'watchBackTime'" placeholder="回归时间">
            <el-option label="30分钟" value="time30"></el-option>
            <el-option label="60分钟" value="time60"></el-option>
          </el-select>
          <el-select v-else-if="valTable.prop === 'watchState'" placeholder="状态">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
          <el-select v-else-if="valTable.prop === 'silentWatchToggle'" placeholder="启用静默监视">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
          <el-select
            v-else-if="valTable.prop === 'silentWatchFrequency'"
            placeholder="静默监视频次"
          >
            <el-option label="30分钟" value="time30"></el-option>
            <el-option label="60分钟" value="time60"></el-option>
          </el-select> -->

          <span v-else>{{ scope.row[valTable.prop] }}</span>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
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
      devIds: [],
      currentRow: null,
    }
  },
  name: 'insResultTables',
  props: ['tableTitles', 'tableData'],
  methods: {
    handleSelectionChange(selectArr) {
      selectArr.forEach((tbObj) => {
        this.devIds.push(tbObj.Device_Id)
      })

      this.multipleSelection = selectArr
      this.$emit('selectID', this.multipleSelection)
    },
    rowdbclick(a) {
      this.$emit('rowdbclick', a)
    },
    handleCurrentChange(val) {
      this.currentRow = val
    },

    //修改数据回显
    alarmSelectFun(selection, row) {
      // console.log('row', row, '告警阈值--修改数据回显')
      setTimeout(() => {
        this.$bus.$emit('showAlarm', row)
      }, 1800)
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
}
/* 在table不设置高度时，有空白 ，采用下面两个样式*/
.tableDiv .el-table__header {
  width: 100% !important;
}
.tableDiv .el-table__header th {
  text-align: center;
}
// .tableDiv .el-table__header th:nth-child(1),
// .tableDiv .el-table__header th:nth-child(2) {
//   // border-right: 1px #0a284c solid !important;
// }
.tableDiv .el-table__body {
  width: 100% !important;
  caret-color: rgba(0, 0, 0, 0);
}
.tableDiv .el-table__body td {
  text-align: center;
}
// .tableDiv .el-table__body td:nth-child(1),
// .tableDiv .el-table__body td:nth-child(2) {
//   // border-right: 1px #0a284c solid !important;
// }
.tableDiv .el-table__body .el-tooltip {
  width: 100% !important;
}
</style>
