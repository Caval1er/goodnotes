<template>
  <div class="layout-container">
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main><page-content></page-content></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import PageContent from '../page/index.vue'
</script>

<style lang="scss" scoped></style>
