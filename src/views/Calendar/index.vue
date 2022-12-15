<template>
  <div class="calendar-container"><Calendar :data-source="data" /></div>
</template>

<script setup>
import { onMounted, reactive } from 'vue'
import { getAllPages } from '@/api/page/index'
import { getSingleCollectionById } from '@/api/collection/index'
const data = reactive([])
const collectionSchema = reactive({})
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
