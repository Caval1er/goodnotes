<template>
  <div class="card-container">
    <el-card shadow="hover"> {{ props.properties.date }} </el-card>
  </div>
</template>

<script setup>
const props = defineProps({
  properties: {
    type: Object,
    default() {
      return {}
    },
  },
})
</script>

<style lang="scss" scoped></style>
