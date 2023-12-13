<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Sidebar',
})
</script>

<script setup>
const props = defineProps({
  item: Object,
  index: String,
})
</script>

<template>
  <div class="sidebarItem">
    <!-- 是否存在 children -->
    <template v-if="item.children">
      <el-submenu :index="index + '-' + item.meta.sort">
        <template slot="title">
          {{ item.label }}
        </template>
        <!-- 循环遍历 children  -->
        <template v-for="child in item.children">
          <!-- 如果 children 内还存在 children ，则调用自身组件递归 -->
          <Sidebar
            v-if="child.children && child.children.length > 0"
            :item="child"
            :key="child.path"
          >
          </Sidebar>
          <!-- 不存在则直接输出菜单 -->
          <el-menu-item v-else :key="child.path" :index="child.path">
            {{ child.label }}
          </el-menu-item>
        </template>
      </el-submenu>
    </template>
    <!-- 如果没有 children 则直接输出菜单 -->
    <template v-else>
      <el-menu-item :index="item.path">{{ item.label }}</el-menu-item>
    </template>
  </div>
</template>

<style scoped lang="scss"></style>
