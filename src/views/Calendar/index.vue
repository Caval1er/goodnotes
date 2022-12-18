<template>
  <div class="calendar-container">
    <calendar-view :data-source="data" :schema="collectionSchema.schema" />
  </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue'
import { getAllPages } from '@/api/page/index'
import { getSingleCollectionById } from '@/api/collection/index'
const data = reactive([])
const collectionSchema = reactive({ schema: [] })
onMounted(() => {
  getAllPages().then((res) => {
    data.push(...res)
  })
  getSingleCollectionById(1, 1).then((res) => {
    Object.assign(collectionSchema, res)
  })
})
</script>

<style lang="scss" scoped></style>
