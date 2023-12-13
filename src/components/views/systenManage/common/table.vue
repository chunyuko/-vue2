<template>
  <div class="tableFlex" :class="{ flex: bool }">
    <div class="tableDiv" :style="{ marginLeft: classData[0] }">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%"
        :cell-style="locationCell"
        :header-cell-style="locationHeader"
        :row-style="rowColor"
        :max-height="classData[2]"
      >
        <el-table-column type="selection" width="55" v-if="classData[1] === 'true'">
        </el-table-column>
        <el-table-column
          v-for="(valTable, index) in tableTitles"
          :key="index"
          :label="valTable.label"
          :width="valTable.width"
        >
          <template slot-scope="scope">
            <!-- 菜单管理的四个操作 -->
            <div v-if="valTable.prop === 'operateMenuManage'">
              <el-button
                @click="MenuPermissionClick(scope.row, scope.$index)"
                :ref="`bt-M-${scope.$index}`"
                >权限</el-button
              >
              <el-divider direction="vertical" class="dividerColor"></el-divider>
              <el-button @click="groupClick(scope.row, scope.$index)" :ref="`bt-G-${scope.$index}`"
                >用户组</el-button
              >
              <el-divider direction="vertical" class="dividerColor"></el-divider>
              <span @click="MenuEditClick(scope.row)" class="spanClass">编辑</span>
              <el-divider direction="vertical" class="dividerColor"></el-divider>
              <el-popover
                placement="top"
                width="160"
                trigger="click"
                :ref="`popover2-${scope.$index}`"
              >
                <p>确定删除此角色？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="MenuDeleteClose(scope.$index)"
                    >取消</el-button
                  >
                  <el-button
                    type="primary"
                    size="mini"
                    @click="MenuDeleteSubmit(scope.$index, scope.row.id)"
                    >确定</el-button
                  >
                </div>
                <span slot="reference" class="spanClass">删除</span>
              </el-popover>
            </div>
            <!--   日志管理操作 -->
            <span
              v-else-if="valTable.prop === 'operateLogManage'"
              class="spanClass"
              @click="detailClick(scope.row)"
              >详细</span
            >
            <!--   人员管理的四个操作 -->
            <span v-else-if="valTable.prop === 'operatePeopleManage'" class="spanClass">
              <i class="el-icon-edit" @click="PeopleEditClick(scope.row)"></i>
              <!--   <el-divider direction="vertical" class="dividerColor"></el-divider>
              <i class="el-icon-refresh-right" @click="PeopleRefreshClick()"></i> -->
              <el-divider direction="vertical" class="dividerColor"></el-divider>
              <el-popover
                placement="top"
                width="160"
                trigger="click"
                :ref="`popover3-${scope.$index}`"
              >
                <p>确定删除此用户？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="peopleDeleteClose(scope.$index)"
                    >取消</el-button
                  >
                  <el-button
                    type="primary"
                    size="mini"
                    @click="peopleDeleteSubmit(scope.$index, scope.row.id)"
                    >确定</el-button
                  >
                </div>
                <i class="el-icon-delete" slot="reference"></i>
              </el-popover>
              <el-divider direction="vertical" class="dividerColor"></el-divider>
              <i class="el-icon-lock" @click="PeopleEditPassword(scope.row.id)"></i>
            </span>
            <span v-else>{{ scope.row[valTable.prop] }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="paginationDiv">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage1"
        :page-size="10"
        :page-sizes="[5, 10, 15]"
        layout="total, prev, pager, next, sizes"
        :total="total"
      >
      </el-pagination>
    </div>
    <el-popover
      v-if="showPop"
      placement="bottom-end"
      :reference="reference"
      width="400"
      trigger="click"
      :visible-arrow="false"
      popper-class="roletablePopover"
      title="功能授权"
      ref="pop"
    >
      <div class="popoverBody">
        <!--   <div class="popoverLeft">
          <div class="popoverLeftTop">
            <div class="leftTopTitle">
              <i></i>
              <p>功能菜单</p>
            </div>
          </div>
          <div class="popoverLeftBottom">
            <tree :data="treeData1"> </tree>
          </div>
        </div> -->
        <div class="popoverRight">
          <div class="popoverRightTop">
            <div class="rightTopTitle">
              <i></i>
              <p>具体菜单</p>
              <button style="margin-right: 3rem" @click="menuSaveClick()">保存</button>
              <button style="margin-right: 1rem" @click="menuAllClick()">全选</button>
            </div>
          </div>
          <div class="popoverRightBottom">
            <tree ref="menuTree"> </tree>
          </div>
        </div>
      </div>
    </el-popover>
    <el-popover
      v-if="showPop2"
      placement="bottom-end"
      :reference="reference2"
      width="400"
      trigger="click"
      :visible-arrow="false"
      popper-class="roletablePopover"
      title="用户组"
      ref="pop2"
    >
      <div class="popoverBody">
        <div class="popoverRight">
          <div class="popoverRightTop">
            <div class="rightTopTitle">
              <i></i>
              <p>人员名单</p>
            </div>
          </div>
          <div class="popoverRightBottom">
            <!-- 人员数据 -->
            <tree ref="poepleTree"> </tree>
          </div>
        </div>
      </div>
    </el-popover>
  </div>
</template>

<script>
import Tree from '@/components/views/systenManage/common/tree.vue'
import {
  getUserByRole,
  modifyMenu,
} from '@/views/systemManage/js/sysMagPermissionsManage/sysMagMenuManage'
export default {
  components: {
    Tree,
  },
  name: 'sysMagtable',
  props: ['tableTitles', 'tableData', 'classData'],
  data() {
    return {
      reference: {},
      reference2: {},
      // 控制渲染条件 如果不用v-if会报错 具体可自行尝试
      showPop: false,
      // 控制渲染条件 如果不用v-if会报错 具体可自行尝试
      showPop2: false,
      // 保存当前激活的refrence id
      activeId: '',
      // 保存当前激活的refrence id
      activeId2: '',
      //界面样式不更新（手动加载一遍）
      bool: false,
      //数据总条数
      total: 0,
      //选中的角色Id
      roleID: '',
      //选中角色载tableData中的位置下标
      index: '',
      // 判断为点击后树showMenuTree方法执不执行做依据
      clickEditRole: true,
      //翻页器当前页
      currentPage1: 1,
      //翻页器当前每页多少数据
      pageSize: 10,
      treeData1: [
        [
          {
            TreeLevel: 0,
            level: 1,
            id: '1',
            label: '系统功能菜单',
            fId: '-1',
          },
        ],
      ],
    }
  },
  methods: {
    //有多选一列时居中(locationCell,locationHeader)
    locationCell({ row, column, rowIndex, columnIndex }) {
      if (this.classData[1] === 'true') {
        if (columnIndex === 0) {
          return { textAlign: 'center' }
        }
      }
    },
    locationHeader({ row, column, rowIndex, columnIndex }) {
      if (this.classData[1] === 'true') {
        if (columnIndex === 0) {
          return { textAlign: 'center' }
        }
      }
    },
    rowColor({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return { background: 'rgba(1, 19, 67, 0.4)' }
      }
    },
    //切换每页多少数据时触发此函数，val每页展示多少条数据
    handleSizeChange(val) {
      this.pageSize = val
      const _this = this
      // 切换每页多少条数据时访问后端刷新表格
      this.$nextTick(() => {
        _this.$emit('tableChange')
      })
    },
    //切换页数时触发此函数
    handleCurrentChange(val) {
      const _this = this
      //切换页数时访问后端刷新表格
      _this.$emit('tableChange')
    },
    //菜单管理操作中三个功能（用户组暂时没写）
    //1-1.设置权限
    MenuPermissionClick(row, index) {
      this.roleID = row.id
      this.index = index
      // 这个操作是为了避免与源码中的点击reference doToggle方法冲突
      if (this.activeId === index && this.showPop && this.clickEditRole) {
        return
      }
      this.bool = false
      this.showPop = false
      this.clickEditRole = true
      this.activeId = index
      // 因为reference是需要获取dom的引用 所以需要是$el
      this.reference = this.$refs['bt-M-' + index][0].$el
      this.$nextTick(() => {
        // 等待显示的popover销毁后再 重新渲染新的popover
        this.showPop = true
        this.bool = true
        this.$nextTick(() => {
          // 此时才能获取refs引用
          this.$refs.pop.doShow()
          const MenuList = row.MenuList.split(',')
          this.$refs.menuTree.showMenuTree(row)
          // 将MenuList转化成数组传到tree组件进行设置
          this.$refs.menuTree.setCheckedKeys(MenuList)
        })
      })
    },
    //1-2.菜单管理权限保存
    async menuSaveClick() {
      //因为要加一个判断为点击后树showMenuTree方法执不执行做依据
      this.clickEditRole = false
      //因为这个数据库对应好几个系统，菜单不同，避免干扰将自己定义的id===0菜单名去掉
      const keyList = this.$refs.menuTree.getCheckedKeys()
      if (keyList[0] === '0') {
        keyList.splice(0, 1)
      }
      const MenuList = keyList.toString()
      const res = await modifyMenu(this.roleID, MenuList)
      if (res.msg === 'OK') {
        this.$message.success('修改权限成功')
        //更改tableData,为下次点击菜单默认选中更新数据
        this.$emit('editTableData', this.index, MenuList)
      }

      this.$refs.pop.doClose()
    },
    //1-3.菜单管理权限全选
    menuAllClick() {
      this.$refs.menuTree.setChecked()
    },
    //2-1.用户组设置
    async groupClick(row, index) {
      const _this = this
      // 这个操作是为了避免与源码中的点击reference doToggle方法冲突
      if (this.activeId2 === index && this.showPop2) {
        return
      }
      this.bool = false
      this.showPop2 = false
      this.activeId2 = index
      // 因为reference是需要获取dom的引用 所以需要是$el
      this.reference2 = this.$refs['bt-G-' + index][0].$el
      this.$nextTick(() => {
        // 等待显示的popover销毁后再 重新渲染新的popover
        this.showPop2 = true
        this.bool = true
        this.$nextTick(() => {
          // 此时才能获取refs引用
          this.$refs.pop2.doShow()
        })
      })
      const data = await getUserByRole(row.id, row.IdentityName)
      this.$refs.poepleTree.showPeopleTree(data, row.id)
    },
    //3.修改角色信息
    MenuEditClick(row) {
      const _this = this
      //因为要加一个判断为点击后树showMenuTree方法执不执行做依据
      this.clickEditRole = false
      //显示form表单
      _this.$emit('editMenuData', row)
      // _this.$bus.$emit('initSelected', row)
    },
    //4-1.菜单管理删除取消
    MenuDeleteClose(index) {
      document.body.click() // 模拟点击页面其它部分关掉弹层，因为该页面列表使用懒加载导致doClose无效
      this.$refs[`popover2-${index}`].doClose
    },
    //4-2.菜单管理删除提交
    MenuDeleteSubmit(index, id) {
      this.$bus.$emit('delRoleData', id)
      //id还没传，等接口
      document.body.click() // 模拟点击页面其它部分关掉弹层，因为该页面列表使用懒加载导致doClose无效
      this.$refs[`popover2-${index}`].doClose
    },

    //人员管理操作中四个功能
    PeopleEditClick(row) {
      const _this = this
      _this.$emit('editPeopleData', row)
    },
    PeopleRefreshClick() {
      const _this = this
      _this.$message.success('刷新结果提示')
    },
    //修改密码
    PeopleEditPassword(id) {
      const _this = this
      _this.$emit('editPassword', id)
    },
    //人员管理删除取消
    peopleDeleteClose(index) {
      document.body.click() // 模拟点击页面其它部分关掉弹层，因为该页面列表使用懒加载导致doClose无效
      this.$refs[`popover3-${index}`].doClose
    },
    //人员管理删除提交
    peopleDeleteSubmit(index, id) {
      this.$bus.$emit('delUserData', id)
      //id还没传，等接口
      document.body.click() // 模拟点击页面其它部分关掉弹层，因为该页面列表使用懒加载导致doClose无效
      this.$refs[`popover3-${index}`].doClose
    },
    //日志管理详情点击
    detailClick(row) {
      this.$emit('clickDetail', row)
    },
  },
}
</script>

<style scoped lang="scss">
.tableFlex {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.flex {
  & > span {
    display: none;
  }
}
.tableDiv {
  .el-table {
    background: rgba(1, 19, 67, 0.4);
    background-image: linear-gradient(
      90deg,
      rgba(1, 19, 67, 0.4) 0%,
      rgba(32, 150, 224, 0.4) 50%,
      rgba(1, 19, 67, 0.4) 100%
    );
    .el-button {
      background: none;
      border: none;
      color: #08def0;
      padding: 0;
    }
  }
  .el-table::before {
    height: 0rem;
  }
  :deep(.el-table__body-wrapper) {
    background: none !important;
    .el-table__empty-block {
      width: 100% !important;
    }
  }
  /* margin-left: 3rem; */
  padding: 0.5rem;
  /*  border: 0.1rem #2096e0 solid; */
  box-shadow: 0rem 0rem 0.5rem 0.2rem #2096e0 inset;
  .spanClass {
    color: #08def0;
    cursor: pointer;
    caret-color: rgba(0, 0, 0, 0);
  }
  //操作竖线颜色
  .dividerColor {
    background: #08def0;
  }
  :deep(.el-table__header) {
    width: 100% !important;
    tr {
      th {
        background: none !important;
        color: #fff;
      }
      background: none;
    }
    th:nth-child(1) {
      text-align: left;
    }
  }
  :deep(.el-table__body) {
    width: 100% !important;
    tr.el-table__row {
      td {
        background: none !important;
      }
      background: none;
    }
    tr.el-table__row--striped {
      td {
        background: none !important;
      }
    }
    .el-table__row {
      td:nth-child(1) {
        text-align: left;
      }
    }
  }
}
.paginationDiv {
  caret-color: rgba(0, 0, 0, 0);
  :deep(.el-pagination__total) {
    color: #fff;
  }
  :deep(.el-pagination .el-select .el-input .el-input__inner) {
    color: #fff;
  }
}
</style>

<style lang="scss">
//功能授权样式
.el-popover.roletablePopover {
  background: #072640;
  padding: 0;
  width: 56rem !important;
  height: 59rem;
  border: none;
  .el-popover__title {
    color: #fff;
    height: 3rem;
    font-size: 2.2rem;
    line-height: 3rem;
    background: #0f61aa;
    padding-left: 0.8rem;
    margin: 0;
    margin-bottom: 0.4rem;
  }
  .popoverBody {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    /*  .popoverLeft {
      width: 18rem;
      margin-left: 0.8rem;
      .popoverLeftTop {
        color: #fff;
        height: 3rem;
        .leftTopTitle {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          height: 100%;
          i {
            width: 0.6rem;
            height: 2rem;
            display: inline-block;
            background: #1891ff;
            margin-right: 0.5rem;
          }
          p {
            margin: 0;
            -webkit-box-flex: 1;
            -ms-flex: 1;
            flex: 1;
            font-size: 1.4rem;
            color: #fff;
            font-weight: 500;
            margin-left: 0.2rem;
          }
        }
      }
      .popoverLeftBottom {
        height: 52.3rem;
        background: #001d3a;
        border-top: 0.3rem #2162c2 solid;
        border-left: 0.1rem #2162c2 solid;
        border-right: 0.1rem #2162c2 solid;
        .el-tree {
          background: none;
          color: #fff;
          .el-tree-node.is-current > .el-tree-node__content {
            background-color: #0f47a9;
          }
          // .el-tree-node__content,
          // .el-upload-list__item {
          //   background-color: #06245f;
          // }
          .el-tree-node__content:hover,
          .el-upload-list__item:hover {
            background-color: #2c4a7e;
          }
        }
      }
    } */
    .popoverRight {
      width: 55rem;
      margin-right: 0.8rem;
      /* 去除左边功能菜单新增 */
      margin-left: 0.8rem;

      .popoverRightTop {
        color: #fff;
        height: 3rem;
        .rightTopTitle {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          height: 100%;
          i {
            width: 0.6rem;
            height: 2rem;
            display: inline-block;
            background: #1891ff;
            margin-right: 0.5rem;
          }
          p {
            margin: 0;
            -webkit-box-flex: 1;
            -ms-flex: 1;
            flex: 1;
            font-size: 1.4rem;
            color: #fff;
            font-weight: 500;
            margin-left: 0.2rem;
          }
          button {
            cursor: pointer;
            color: #fff;
            border-radius: 0.3rem;
            width: 5.5rem;
            height: 2.2rem;
            border: 0.1rem #1891ff solid;
            background: #011e3b;
          }
        }
      }
      .popoverRightBottom {
        height: 52.3rem;
        overflow: auto;
        background: #001d3a;
        border-top: 0.3rem #2162c2 solid;
        border-left: 0.1rem #2162c2 solid;
        border-right: 0.1rem #2162c2 solid;
        .el-tree {
          background: none;
          color: #fff;
          .el-tree-node.is-current > .el-tree-node__content {
            background-color: #0f47a9;
          }
          .el-tree-node__content,
          .el-upload-list__item {
            background-color: #001d3a;
          }
          .el-tree-node__content:hover,
          .el-upload-list__item:hover {
            background-color: #2c4a7e;
          }
        }
      }
    }
  }
}
</style>
