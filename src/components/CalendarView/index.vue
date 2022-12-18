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
    :schema="props.schema"
  />
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import dayjs from 'dayjs'
const calendarRef = ref()
const selectDate = (val) => {
  calendarRef.value.selectDate(val)
}

const props = defineProps({
  dataSource: {
    type: Array,
    default() {
      return []
    },
  },
  schema: {
    type: Array,
    default() {
      return {}
    },
  },
})

const rules = reactive({})

const computedDate = computed(() => {
  return function (date) {
    return Array.prototype.filter.call(props.dataSource, (item) => {
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
  get: () => props.dataSource.find((item) => item.id === currentIndex.value),
  set: (newVal) => {
    props.dataSource.filter((item) => item.id === currentIndex.value)[0] =
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
