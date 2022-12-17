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
import { getAllPages } from '@/api/page/index'
import { getSingleCollectionById } from '@/api/collection/index'
const data = reactive([])
const collectionSchema = reactive({})
const rules = reactive({})
onMounted(() => {
  getAllPages().then((res) => {
    data.push(...res)
  })
  getSingleCollectionById(1, 1).then((res) => {
    Object.assign(collectionSchema, res)
  })
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
</script>

<style lang="scss" scoped></style>
