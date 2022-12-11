<template>
  <div class="">
    <List :data-source="data">
      <template #renderItem="{ item }">
        <list-item :schema="collectionSchema.schema" :rowData="item">
          <template #title
            ><span>{{ item.title }}</span></template
          >
        </list-item>
      </template>
    </List>
  </div>
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
