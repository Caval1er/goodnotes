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
            <template v-for="item in asideCollection" :key="item.id">
              <el-sub-menu :index="'1-' + item.id">
                <template #title>{{ item.name }}</template>
                <template v-for="view in item.list">
                  <el-menu-item :index="'1-' + item.id + '-' + view.id">{{
                    view.name
                  }}</el-menu-item>
                </template>
              </el-sub-menu>
            </template>
          </el-sub-menu>
          <el-menu-item index="2">
            <el-icon><icon-menu /></el-icon>
            <span>新建数据</span>
          </el-menu-item>
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
import { getAsideCollection } from '@/api/collection/index'
const route = useRoute()
const breadList = ref([])
const asideCollection = ref([])
onMounted(() => {
  const breadRes = Array.prototype.filter.call(route.matched, (item) => {
    return item.name !== 'Home' && item.name !== 'Dashboard'
  })
  console.log(breadRes)
  breadList.value = breadRes
  getAsideCollection().then((res) => {
    asideCollection.value = res
    console.log(res)
  })
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
