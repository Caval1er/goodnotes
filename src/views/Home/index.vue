<template>
  <el-container class="layout-container">
    <el-aside width="200px">
      <el-scrollbar> 侧边栏 </el-scrollbar>
    </el-aside>
    <el-container>
      <el-header>头部</el-header>
      <el-main>正文</el-main>
    </el-container>
  </el-container>
</template>

<script setup></script>

<style lang="scss" scoped>
.layout-container {
  height: 300px;
}
</style>
