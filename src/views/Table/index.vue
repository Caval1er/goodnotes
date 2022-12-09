<template>
  <div class="table-container">
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column
        v-for="column in tableColumnScheme"
        :column-key="column.name"
        :key="column.name"
        :prop="column.name"
        :label="toFristLetterUpper(column.name)"
      >
        <template #default="scope">
          <template v-if="column.type === 'Date'">
            <el-date-picker
              v-model="scope.row[column.name]"
              type="datetime"
              placeholder="Select date and time"
            />
          </template>
          <template
            v-else-if="
              column.type === 'Single_Select' || column.type === 'Multip_Select'
            "
          >
            <el-select
              v-model="scope.row[column.name]"
              :multiple="column.type === 'Multip_Select'"
            >
              <el-option
                v-for="item in column.options"
                :key="item.id"
                :name="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </template>
          <template v-else-if="column.type === 'Number'">
            <el-input-number
              v-model="scope.row[column.name]"
              controls-position="right"
            />
          </template>
          <template v-else-if="column.type === 'Email'">
            <el-input v-model="scope.row[column.name]" type="email" />
          </template>
          <template v-else-if="column.type === 'Url'">
            <el-input v-model="scope.row[column.name]" type="url" />
          </template>
          <template v-else-if="column.type === 'Text'">
            <el-input v-model="scope.row[column.name]" type="text" />
          </template>
          <template v-else-if="column.type === 'Checkbox'">
            <el-checkbox v-model="scope.row[column.name]" size="large" />
          </template>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { getSingleCollectionById } from '@/api/collection/index'
const tableColumnScheme = reactive([])
const tableData = reactive([
  {
    date: '2022-12-01 17:46:38',
    title: 'title1',
    tags: '',
    number: 0,
    email: '',
    url: '',
    text: '',
  },
  {
    date: '2022-12-01 17:46:36',
    title: 'title2',
    tags: '',
    number: 0,
    email: '',
    url: '',
    text: '',
  },
  {
    date: '2022-12-01 17:46:38',
    title: 'title3',
    tags: '',
    number: 0,
    email: '',
    url: '',
    text: '',
  },
  {
    date: '2022-12-01 17:46:38',
    title: 'title4',
    tags: '',
    number: 0,
    email: '',
    url: '',
    text: '',
  },
])
getSingleCollectionById(1, 1).then((res) => {
  tableColumnScheme.push(...JSON.parse(res.schema))
})
const toFristLetterUpper = (s) => {
  return s.replace(s.charAt(0), s.charAt(0).toUpperCase())
}
</script>

<style lang="scss" scoped></style>
