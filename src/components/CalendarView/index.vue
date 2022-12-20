<template>
  <el-calendar ref="calendarRef">
    <template #header="{ date }">
      <span>{{ date }}</span>
      <el-button-group>
        <el-button size="small" @click="selectDate('prev-year')">
          去年
        </el-button>
        <el-button size="small" @click="selectDate('prev-month')">
          上月
        </el-button>
        <el-button size="small" @click="selectDate('today')">今天</el-button>
        <el-button size="small" @click="selectDate('next-month')">
          下月
        </el-button>
        <el-button size="small" @click="selectDate('next-year')">
          明年
        </el-button>
      </el-button-group>
    </template>

    <template #date-cell="{ data }">
      <div v-for="item in computedDate(data.day)" :key="item.id">
        <calendar-item
          :properties="item.properties"
          @click="openDrawer(item.id)"
        ></calendar-item></div
    ></template>
  </el-calendar>
  <drawer-form
    ref="drawerRef"
    v-model="rowData"
    :rules="rules"
    :schema="schema"
  />
</template>

<script setup>
import { ref, computed, reactive, onMounted } from 'vue'
import dayjs from 'dayjs'
import { getCollectionViewById } from '@/api/collectionView/index'
import { getPagesByCollectionId } from '@/api/page/index'
const calendarRef = ref()
const selectDate = (val) => {
  calendarRef.value.selectDate(val)
}

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
const schema = ref([])
const dataSource = ref([])
const rules = reactive({})
onMounted(() => {
  getCollectionViewById(props.id).then((res) => {
    schema.value = res.schema
  })
  getPagesByCollectionId(props.collectionId).then((res) => {
    dataSource.value = res
  })
})
const computedDate = computed(() => {
  return function (date) {
    return Array.prototype.filter.call(dataSource.value, (item) => {
      return date === dayjs(item.properties.date).format('YYYY-MM-DD')
    })
  }
})
const currentIndex = ref(-1)
const drawerRef = ref(null)
const openDrawer = (id) => {
  currentIndex.value = id
  console.log(currentIndex.value)
  drawerRef.value.handleOpen()
}
const rowData = computed({
  get: () => dataSource.value.find((item) => item.id === currentIndex.value),
  set: (newVal) => {
    dataSource.value.filter((item) => item.id === currentIndex.value)[0] =
      newVal
  },
})
</script>

<style lang="scss" scoped>
.el-calendar {
  :deep(.el-calendar-table) {
    .el-calendar-day {
      height: auto;
      min-height: 85px;
    }
  }
}
</style>
