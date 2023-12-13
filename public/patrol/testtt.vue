<template>
  <div class="main_div">
    <div>测试成功</div>
    <span>{{ barObject.title }}</span>
    <span class="span_more">更多</span>
    <el-divider></el-divider>
    <ul style="padding: 0">
      <li v-for="(item, index) in dataList" :key="item.sno">{{ item.title }}</li>
    </ul>
  </div>
</template>

<script>
module.exports = {
  name: 'testtt',
  props: {
    barObject: {
      sno: String,
      stitle: String,
    },
    dataList: {
      type: Array,
    },
  },
}
</script>

<style scoped>
ul li {
  list-style: none;
}
.main_div {
  width: 256px;
  position: absolute;
}

.span_more {
  position: relative;
  right: 0;
  color: red;
}
</style>
