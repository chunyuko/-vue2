<template>
  <div class="pageCon">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-size="10"
      layout="prev, pager, next, jumper"
      :total="totalPages"
      :current-page.sync="currentPage1"
    >
    </el-pagination>
    <div @click="handleCurrentChange" class="litTabs">确定</div>
  </div>
</template>

<script>
export default {
  name: 'PageContents',
  data() {
    return {
      isActive: false,
      totalPages: 0,
      currentPage1: 1,
    }
  },
  methods: {
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.currentPage1 = val
      // console.log(`当前页: ${val}`)
      const _this = this

      _this.$bus.$emit('pageNow', val)
      _this.$emit('pageNow', val)
    },
  },
  mounted() {
    const _this = this
    _this.$bus.$on('pagecontents', function (msg) {
      // console.log(Number(msg), '99999999页码')
      _this.totalPages = Number(msg)
    })
    _this.$bus.$on('filterPage1', function (msg) {
      _this.currentPage1 = msg
    })
  },
  beforeDestroy() {
    const _this = this
    // 销毁事件（重要）
    _this.$bus.$off('pagecontents')
    _this.$bus.$off('filterPage1')
  },
}
</script>
<style scoped lang="scss">
.litTabs {
  font-size: 1.4rem;
  color: #82c3ff;
  border-radius: 0.2rem;
  border: 0.1rem solid #0a437c;
  margin-left: 3rem;
  cursor: pointer;
  line-height: 2rem;
  padding: 0.6rem;
  height: 2rem;
  align-self: self-end;
}
.pageCon {
  display: flex;
}
:deep(.el-pagination) {
  text-align: right;
}
</style>
