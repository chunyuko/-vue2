<template>
  <div
    style="width: 16rem; height: 4rem; font-size: 14px; position: absolute"
    :style="{ top: countNum.top, left: countNum.left }"
  >
    <div>
      <span style="color: #a4f54e; margin-right: 19px">在线：{{ countNum.online }}</span>
      <span style="color: #f54e4e; text-align: right">离线：{{ countNum.offline }}</span>
    </div>
    <div style="margin-left: 17%">
      <span style="color: #fff">总数：{{ countNum.total }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['countNum'],
}
</script>

<style></style>
