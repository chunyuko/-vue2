<template>
  <div class="block">
    <slot></slot>
    <el-date-picker
      v-if="typeIsShow == 'mulCheck'"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      class="el-date-picker"
    >
      <!-- v-model="value1" -->
    </el-date-picker>
    <el-date-picker
      v-if="typeIsShow == 'sigCheck'"
      type="date"
      placeholder="选择日期"
    ></el-date-picker>
    <!--  v-model="value1" -->
  </div>
</template>
<script>
export default {
  name: 'DateTime',
  props: ['typeShow'],
  data() {
    return {
      typeIsShow: this.typeShow,
    }
  },
}
</script>
<style scoped lang="scss">
.el-date-picker {
  background-color: #14357b;
  border: 0;
}
:deep(.el-input__inner) {
  background-color: #14357b !important;
  width: 500px;
}
:deep(.el-range-input) {
  background-color: #14357b !important;
}
:deep(.el-range-separator) {
  color: #fff;
}
:deep(.el-input__icon) {
  line-height: 30px;
}
:deep(.dl-range-editor .el-range-input) {
  background-color: #14357b;
  color: #fff;
  font-size: 14px;
  line-height: 1;
  appearance: none;
  border: none;
  outline: none;
  display: inline-block;
  height: 100%;
  margin: 0;
  padding: 0;
  width: 39%;
  text-align: center;
}
</style>
