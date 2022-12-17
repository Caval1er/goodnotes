<template>
  <div class="layout-container">
    <el-container>
      <el-aside width="200px"
        ><el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-sub-menu index="1">
            <template #title>
              <el-icon><location /></el-icon>
              <span>首页</span>
            </template>

            <el-sub-menu index="1-2">
              <template #title>日常计划</template>
              <el-menu-item index="1-2-1">list view</el-menu-item>
              <el-menu-item index="1-2-2">table view</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="1-3">
              <template #title>学习笔记</template>
              <el-menu-item index="1-3-1">gallery view</el-menu-item>
              <el-menu-item index="1-3-2">calendar view</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
        </el-menu></el-aside
      >
      <el-container>
        <el-header
          ><el-breadcrumb separator="/">
            <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
            <template v-for="item in breadList" :key="item.path">
              <el-breadcrumb-item v-if="item.name" :to="item.path">{{
                item.name
              }}</el-breadcrumb-item>
            </template>
          </el-breadcrumb></el-header
        >
        <el-main><page-content></page-content></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import PageContent from '../page/index.vue'
import { useRoute } from 'vue-router'
import { onMounted, ref, watch } from 'vue'

const route = useRoute()
const breadList = ref([])
onMounted(() => {
  const breadRes = Array.prototype.filter.call(route.matched, (item) => {
    return item.name !== 'Home' && item.name !== 'Dashboard'
  })
  console.log(breadRes)
  breadList.value = breadRes
})
watch(route, () => {
  const breadRes = Array.prototype.filter.call(route.matched, (item) => {
    return item.name !== 'Home' && item.name !== 'Dashboard'
  })
  breadList.value = breadRes
})
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}
</script>

<style lang="scss" scoped></style>
