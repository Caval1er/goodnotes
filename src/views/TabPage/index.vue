<template>
  <div class="tab-page-container">
    <div style="margin-bottom: 20px">
      <el-button size="small" @click="addTab(editableTabsValue)">
        add tab
      </el-button>
    </div>
    <el-tabs
      v-model="editableTabsValue"
      type="card"
      class="demo-tabs"
      closable
      @tab-remove="removeTab"
    >
      <el-tab-pane
        v-for="item in tabsSchema"
        :key="item.id"
        :label="item.name"
        :name="item.name"
      >
        <template v-if="item.type === 'Table'">
          <table-view
            :id="item.id"
            :collection-id="item.collectionId"
          ></table-view>
        </template>
        <template v-else-if="item.type === 'Calendar'">
          <calendar-view
            :id="item.id"
            :collection-id="item.collectionId"
          ></calendar-view>
        </template>
        <template v-else-if="item.type === 'List'">
          <list-view
            :id="item.id"
            :collection-id="item.collectionId"
          ></list-view>
        </template>
      </el-tab-pane>
    </el-tabs>
    <el-dialog v-model="dialogFormVisible" title="增加视图">
      <el-form :model="form" ref="formRef" :rules="rules">
        <el-form-item
          label="视图名称"
          :label-width="formLabelWidth"
          prop="name"
        >
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth" prop="type">
          <el-select v-model="form.type" placeholder="Please select a zone">
            <el-option label="列表" value="List" />
            <el-option label="表格" value="Table" />
            <el-option label="日历" value="Calendar" />
            <el-option label="画廊" value="Gallery" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="submit()"> Confirm </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue'
import { useRoute } from 'vue-router'
import {
  getCollectionViewByCollectionId,
  add,
  deleteView,
} from '@/api/collectionView/index'
import TableView from '@/components/TableView/index.vue'
import CalendarView from '@/components/CalendarView/index.vue'
import ListView from '@/components/List/index.vue'
const route = useRoute()
onMounted(() => {
  getCollectionViewByCollectionId(Number.parseInt(route.params.id)).then(
    (res) => {
      tabsSchema.value = res
    }
  )
})
const editableTabsValue = ref('2')
const tabsSchema = ref([
  {
    title: 'Tab 1',
    name: '1',
    content: 'Tab 1 content',
  },
  {
    title: 'Tab 2',
    name: '2',
    content: 'Tab 2 content',
  },
])
const rules = reactive({
  name: [
    {
      required: true,
      message: '属性名不能为空',
      trigger: 'blur',
    },
  ],
  type: [
    {
      required: true,
      message: '属性名不能为空',
      trigger: 'blur',
    },
  ],
})
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
const form = reactive({
  name: '',
  type: '',
})
const formRef = ref(null)
const addTab = () => {
  dialogFormVisible.value = true
}
const submit = () => {
  formRef.value.validate((valid, field) => {
    if (valid) {
      add(form.name, form.type, Number.parseInt(route.params.id)).then(() => {
        formRef.value.resetFields()
        getCollectionViewByCollectionId(Number.parseInt(route.params.id)).then(
          (res) => {
            tabsSchema.value = res
          }
        )
      })
    } else {
      console.log(field)
      return false
    }
  })
}
const removeTab = (targetName) => {
  console.log(targetName)
  deleteView(targetName).then(() => {
    getCollectionViewByCollectionId(Number.parseInt(route.params.id)).then(
      (res) => {
        tabsSchema.value = res
      }
    )
  })
}
</script>

<style lang="scss" scoped></style>
