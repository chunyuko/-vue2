<template>
  <div class="tableDiv">
    <el-table
      :data="tableData"
      stripe
      style="width: 100%; color: #193b82"
      @selection-change="handleSelectionChange"
      :header-cell-style="{ textAlign: 'center' }"
      :cell-style="{ textAlign: 'center' }"
      @row-dblclick="rowdbclick"
      highlight-current-row
      @current-change="handleCurrentChange"
    >
      <el-table-column type="selection" width="50" v-if="isShowCheck"></el-table-column>

      <el-table-column
        v-for="(valTable, index) in tableTitles"
        :key="index"
        :label="valTable.label"
        :prop="valTable.prop"
        :width="valTable.width"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <span v-if="valTable.prop === 'id'">{{ (currentPage - 1) * 10 + scope.$index + 1 }}</span>
          <!-- 操作相关 -->
          <span v-else-if="valTable.prop === 'HintStatus'">
            <el-popover
              v-if="!scope.row.HintStatusFlag"
              placement="top"
              width="160"
              trigger="click"
              :ref="`popover1-${scope.$index}`"
            >
              <p>是否检修完成？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="HintStatusClose(scope.$index)"
                  >取消</el-button
                >
                <el-button
                  type="primary"
                  size="mini"
                  @click="HintStatusSubmit(scope.$index, scope.row.AreaHintCode)"
                  >确定</el-button
                >
              </div>
              <span slot="reference" class="spanClass" style="margin-left: 6px">{{
                scope.row[valTable.prop]
              }}</span>
            </el-popover>
            <span v-else>{{ scope.row[valTable.prop] }}</span>
          </span>
          <div v-else-if="valTable.prop === 'operation'">
            <span @click="detailClick(scope.row)" class="spanClass">详情</span>
            <el-popover
              placement="top"
              width="160"
              trigger="click"
              :ref="`popover2-${scope.$index}`"
            >
              <p>确定删除此巡检区域？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="DeleteClose(scope.$index)"
                  >取消</el-button
                >
                <el-button
                  type="primary"
                  size="mini"
                  @click="DeleteSubmit(scope.$index, scope.row.AreaHintCode)"
                  >确定</el-button
                >
              </div>
              <span slot="reference" class="spanClass" style="margin-left: 6px">删除</span>
            </el-popover>
            <span
              @click="
                stopClick(
                  scope.row.AreaHintCode,
                  scope.row.HintStatusFlag,
                  scope.$index,
                  scope.row.AreaHintFlag
                )
              "
              :class="{
                fontColor: scope.row.HintStatusFlag || scope.row.AreaHintFlag === '已停用',
              }"
              class="spanClass"
              style="margin: 0px 6px"
              >{{ scope.row.AreaHintFlag }}</span
            >
            <span
              @click="startClick(scope.row.AreaHintCode, scope.row.HintStatusFlag)"
              class="spanClass"
              :class="{ fontColor: scope.row.HintStatusFlag }"
              >下发</span
            >
            <!-- 停用 -->
          </div>

          <span v-else>{{ scope.row[valTable.prop] }}</span>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <div>
      <el-dialog
        title="详情"
        :visible.sync="isShowDetail"
        :append-to-body="true"
        class="detailDialog"
      >
        <el-form label-position="right" label-width="15rem" :inline="true" :disabled="true">
          <el-form-item label="变电站名称">
            <el-input v-model="detailData.stationName"></el-input>
          </el-form-item>
          <el-form-item label="检修内容">
            <el-input v-model="detailData.content"></el-input>
          </el-form-item>
          <el-form-item label="检修开始时间">
            <el-input v-model="detailData.startTime"></el-input>
          </el-form-item>
          <el-form-item label="检修结束时间">
            <el-input v-model="detailData.endTime"></el-input>
          </el-form-item>
          <el-form-item label="检修状态">
            <el-input v-model="detailData.status"></el-input>
          </el-form-item>
          <el-form-item label="区间坐标">
            <el-input v-model="detailData.coordinate"></el-input>
          </el-form-item>
        </el-form>
        <div class="devChangeBox">
          <div class="topTitle">
            <span style="margin-left: 1.7rem">检修设备</span>
          </div>
          <div class="bottomContext">
            <el-tree
              ref="mapDevTree"
              :data="detailData.treeData"
              show-checkbox
              node-key="id"
              check-on-click-node
            >
            </el-tree>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { queryAreaHintApi } from '@/service/api/views/insDevSet/getAreaInfo'
export default {
  data() {
    return {
      multipleSelection: [],
      gridData: [],
      dialogVisible: false,
      devIds: [],
      currentRow: null,
      //展示详情
      isShowDetail: false,
      detailData: {
        stationName: '',
        content: '',
        startTime: '',
        endTime: '',
        status: '',
        treeData: [],
        coordinate: '',
      },
    }
  },
  name: 'insResultTables',
  props: ['tableTitles', 'tableData', 'currentPage', 'isShowCheck'],
  methods: {
    handleSelectionChange(selectArr) {
      selectArr.forEach((tbObj) => {
        this.devIds.push(tbObj.Device_Id)
      })

      this.multipleSelection = selectArr
      this.$emit('selectID', this.multipleSelection)
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {
          console.log('1')
        })
    },
    rowdbclick(a) {
      this.$emit('rowdbclick', a)
    },
    handleCurrentChange(val) {
      this.currentRow = val
    },
    //详情
    detailClick(row) {
      this.detailData.stationName = row.stationName
      this.detailData.content = row.AreaHintContent
      this.detailData.startTime = row.AreaHintStart
      this.detailData.endTime = row.AreaHintEnd
      this.detailData.status = row.HintStatus
      this.detailData.treeData = []
      this.detailData.coordinate = row.AreaHintCoor
      console.log(row)
      const arrayDev = row.AreaHintDevStr.split(',')
      arrayDev.forEach((val, index) => {
        const miaddleData = {}
        miaddleData.id = index
        miaddleData.label = val
        this.detailData.treeData.push(miaddleData)
      })
      this.isShowDetail = true
    },
    //检修区域结束提交取消
    HintStatusClose(index) {
      document.body.click() // 模拟点击页面其它部分关掉弹层，因为该页面列表使用懒加载导致doClose无效
      this.$refs[`popover1-${index}`].doClose
    },
    //检修区域结束提交
    async HintStatusSubmit(index, AreaHintCode) {
      const params = {
        getType: 'ModifyHintStatus',
        AreaHintCode: AreaHintCode,
        HintStatus: '1',
      }
      const res = await queryAreaHintApi(params)
      if (res.msg === 'OK') {
        this.$message.success('检修完成确认成功！')
        this.$emit('operation', 'Hintend', index)
      } else {
        this.$message.error('检修完成确认失败！')
      }

      document.body.click() // 模拟点击页面其它部分关掉弹层，因为该页面列表使用懒加载导致doClose无效
      this.$refs[`popover1-${index}`].doClose
    },
    //删除提交取消
    DeleteClose(index) {
      document.body.click() // 模拟点击页面其它部分关掉弹层，因为该页面列表使用懒加载导致doClose无效
      this.$refs[`popover2-${index}`].doClose
    },
    //删除提交
    async DeleteSubmit(index, AreaHintCode) {
      const params = {
        getType: 'DelHint',
        AreaHintCode: AreaHintCode,
      }
      const res = await queryAreaHintApi(params)
      if (res.msg === 'OK') {
        this.$message.success('删除成功')
        this.$emit('operation', params.getType)
      } else {
        this.$message.error('删除失败')
      }
      document.body.click() // 模拟点击页面其它部分关掉弹层，因为该页面列表使用懒加载导致doClose无效
      this.$refs[`popover2-${index}`].doClose
    },
    //停用
    async stopClick(AreaHintCode, HintStatusFlag, index, AreaHintFlag) {
      if (!HintStatusFlag && AreaHintFlag === '停用') {
        console.log(AreaHintCode)
        const params = {
          getType: 'Stop',
          AreaHintCode: AreaHintCode,
        }
        const res = await queryAreaHintApi(params)
        if (res.msg === 'OK') {
          this.$message.success('停用成功')
          this.$emit('operation', params.getType, index)
        } else {
          this.$message.error('停用失败')
        }
      }
    },
    //下发
    async startClick(AreaHintCode, HintStatusFlag) {
      if (!HintStatusFlag) {
        console.log(AreaHintCode)
        const params = {
          getType: 'Issued',
          AreaHintCode: AreaHintCode,
        }
        const res = await queryAreaHintApi(params)
        console.log(res)
        if (res.msg === 'OK') {
          this.$message.success('下发成功')
        } else if (res.msg) {
          this.$message.error(res.msg)
        } else {
          this.$message.error('下发失败')
        }
      }
    },
  },
}
</script>

<style scoped lang="scss">
.detailDialog {
  caret-color: rgba(0, 0, 0, 0);
  :deep(.el-dialog) {
    width: 60rem;
    height: 29rem;
    margin-top: 16rem !important;
    .el-dialog__header {
      background-color: #0d60ae;
      line-height: 2.4rem;
      height: 2.4rem;
      .el-dialog__title {
        line-height: 1.8rem;
        font-size: 1.8rem;
        color: #fff;
      }
    }
    .el-dialog__headerbtn {
      font-size: 2rem;
      .el-dialog__close,
      .el-icon,
      .el-icon-close {
        color: #fff;
      }
    }
    .el-dialog__body {
      background-color: #06255d;
      color: #fff;
      .el-form-item {
        margin-left: 50px;
      }
    }
  }
  :deep(.el-input.is-disabled .el-input__inner) {
    background-color: #14357b;
  }
}
.devChangeBox {
  width: 34rem;
  height: 22rem;
  margin: 0 auto;
  border: 1px #004687 solid;
  border-radius: 5px;
  .topTitle {
    height: 4rem;
    line-height: 4rem;
    background: #004687;
    :deep(.el-checkbox) {
      margin-left: 2rem;
      // .el-checkbox__inner {
      //   width: 1.8rem;
      //   height: 1.8rem;
      // }
      .el-checkbox__label {
        color: #fff;
      }
    }
  }
  .bottomContext {
    :deep(.el-tree) {
      background: none;
      height: 18rem;
      overflow: auto;
      .el-checkbox {
        display: none;
      }
      .el-tree-node__label {
        color: #fff;
      }
      .is-checked + .el-tree-node__label {
        color: #fff;
      }
      .el-tree-node__content {
        &:hover {
          background: none; //节点hover后的背景样式
        }
      }
      .el-tree-node:focus > .el-tree-node__content {
        background: rgba($color: #001d5a, $alpha: 0); //背景色
      }
    }
  }
}
.fontColor {
  color: #a3a3a3 !important;
}
:deep(.el-table__empty-block) {
  width: 100% !important;
}
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

  .spanClass {
    color: #08def0;
    cursor: pointer;
    caret-color: rgba(0, 0, 0, 0);
  }
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
