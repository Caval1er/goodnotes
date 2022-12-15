<template>
  <div class="card-container">
    <el-card shadow="hover"> {{ props.property.date }} </el-card>
  </div>
</template>

<script setup>
const props = defineProps({
  property: {
    type: Object,
    default() {
      return {}
    },
  },
})
</script>

<style lang="scss" scoped></style>
