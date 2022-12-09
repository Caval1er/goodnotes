<!-- <template>
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
</style> -->
<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    @cell-click="onhandle"
    row-key="id"
  >
    <el-table-column prop="date" label="Date" width="180">
      <template #default="scope">
        <el-input v-if="scope.row.isSelected" v-model="scope.row.date" />
        <span>{{ scope.row.date }}</span>
      </template>
    </el-table-column>

    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" />
  </el-table>
</template>

<script setup>
const tableData = [
  {
    id: 1,
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 2,
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 3,
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 4,
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
const onhandle = (row, column, cell, event) => {
  console.log(row, column, cell, event)
  console.log(row.show)
}
</script>
