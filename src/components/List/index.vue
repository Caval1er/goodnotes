<template>
  <div class="list-view-container">
    <List :data-source="data">
      <template #renderItem="{ item }">
        <list-item :schema="collectionSchema.schema" :rowData="item.properties">
          <template #title>
            <div class="title-container">
              <span>{{ item.properties.title }}</span
              ><el-icon @click="openDrawer(item.id)"><Postcard /></el-icon>
            </div>
          </template>
        </list-item>
      </template>
    </List>
    <drawer-form
      ref="drawerRef"
      v-model="rowData"
      :rules="rules"
      :schema="collectionSchema.schema"
    />
  </div>
</template>

<script setup>
import { onMounted, reactive, computed, ref } from 'vue'

import { getCollectionViewById } from '@/api/collectionView/index'
import { getPagesByCollectionId } from '@/api/page/index'
import List from './list.vue'
const data = reactive([])
const collectionSchema = reactive({})
const rules = reactive({})
const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  collectionId: {
    type: Number,
    required: true,
  },
})

const currentIndex = ref(-1)
const drawerRef = ref(null)
const rowData = computed({
  get: () => data.find((item) => item.id === currentIndex.value),
  set: (newVal) => {
    data.filter((item) => item.id === currentIndex.value)[0] = newVal
  },
})
const openDrawer = (id) => {
  currentIndex.value = id
  console.log(currentIndex.value)
  drawerRef.value.handleOpen()
}
onMounted(() => {
  getCollectionViewById(props.id).then((res) => {
    Object.assign(collectionSchema, res)
  })
  getPagesByCollectionId(props.collectionId).then((res) => {
    data.push(...res)
  })
})
</script>

<style lang="scss" scoped></style>
