<template>
  <div class="gallery-container">
    <el-card v-for="item in props.dataSource" :key="item.id">
      <slot name="renderItem" :item="item.properties"></slot>
    </el-card>
  </div>
</template>

<script setup>
const props = defineProps({
  dataSource: {
    type: Array,
    default() {
      return []
    },
  },
})
</script>

<style lang="scss" scoped></style>
