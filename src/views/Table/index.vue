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
          <template v-if="column.type === 'Title'">
            <div class="editable-cell">
              <div
                v-if="
                  (editableData[scope.row.id] &&
                    editableData[scope.row.id][column.name]) ||
                  (editableData[scope.row.id] &&
                    editableData[scope.row.id][column.name] === '')
                "
                class="editable-cell-input-wrapper"
              >
                <el-input
                  v-model="editableData[scope.row.id][column.name]"
                  type="text"
                />
                <el-icon @click="save(scope.row.id, column.name)"
                  ><Select
                /></el-icon>
              </div>
              <div v-else class="editable-cell-text-wrapper">
                <span>{{ scope.row[column.name] }}</span>
                <el-icon @click="edit(scope.row.id, column.name)"
                  ><Edit
                /></el-icon>
              </div>
            </div>
          </template>
          <template v-else-if="column.type === 'Date'">
            <div class="editable-cell">
              <div
                v-if="
                  editableData[scope.row.id] &&
                  editableData[scope.row.id][column.name]
                "
              >
                <el-date-picker
                  v-model="editableData[scope.row.id][column.name]"
                  type="datetime"
                  placeholder="Select date and time"
                  value-format="YYYY-MM-DD HH:mm:ss"
                  format="YYYY/MM/DD HH:mm:ss"
                >
                </el-date-picker>
                <el-icon @click="save(scope.row.id, column.name)"
                  ><Select
                /></el-icon>
              </div>
              <div v-else class="editable-cell-text-wrapper">
                <span>{{ scope.row[column.name] }}</span>
                <el-icon @click="edit(scope.row.id, column.name)"
                  ><Edit
                /></el-icon>
              </div>
            </div>
          </template>
          <template
            v-else-if="
              column.type === 'Single_Select' || column.type === 'Multip_Select'
            "
          >
            <div class="editable-cell">
              <div
                v-if="
                  editableData[scope.row.id] &&
                  editableData[scope.row.id][column.name]
                "
              >
                <el-select
                  v-model="editableData[scope.row.id][column.name]"
                  :multiple="column.type === 'Multip_Select'"
                >
                  <el-option
                    v-for="item in column.options"
                    :key="item.id"
                    :name="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-icon @click="save(scope.row.id, column.name)"
                  ><Select
                /></el-icon>
              </div>
              <div v-else class="editable-cell-text-wrapper">
                <template v-if="column.type === 'Multip_Select'">
                  <el-tag v-for="tag in scope.row[column.name]" :key="tag.id">{{
                    tag.value
                  }}</el-tag></template
                >
                <template v-else>
                  <el-tag>{{ tag.value }}</el-tag>
                </template>
                <el-icon @click="edit(scope.row.id, column.name)"
                  ><Edit
                /></el-icon>
              </div>
            </div>
          </template>
          <template v-else-if="column.type === 'Number'">
            <div class="editable-cell">
              <div
                v-if="
                  (editableData[scope.row.id] &&
                    editableData[scope.row.id][column.name]) ||
                  (editableData[scope.row.id] &&
                    editableData[scope.row.id][column.name] === 0)
                "
                class="editable-cell-input-wrapper"
              >
                <el-input-number
                  v-model="editableData[scope.row.id][column.name]"
                  controls-position="right"
                />
                <el-icon @click="save(scope.row.id, column.name)"
                  ><Select
                /></el-icon>
              </div>
              <div v-else class="editable-cell-text-wrapper">
                <span>{{ scope.row[column.name] }}</span>
                <el-icon @click="edit(scope.row.id, column.name)"
                  ><Edit
                /></el-icon>
              </div>
            </div>
          </template>
          <template v-else-if="column.type === 'Email'">
            <div class="editable-cell">
              <div
                v-if="
                  (editableData[scope.row.id] &&
                    editableData[scope.row.id][column.name]) ||
                  (editableData[scope.row.id] &&
                    editableData[scope.row.id][column.name] === '')
                "
                class="editable-cell-input-wrapper"
              >
                <el-input
                  v-model="editableData[scope.row.id][column.name]"
                  type="email"
                />
                <el-icon @click="save(scope.row.id, column.name)"
                  ><Select
                /></el-icon>
              </div>
              <div v-else class="editable-cell-text-wrapper">
                <span>{{ scope.row[column.name] }}</span>
                <el-icon @click="edit(scope.row.id, column.name)"
                  ><Edit
                /></el-icon>
              </div>
            </div>
          </template>
          <template v-else-if="column.type === 'Url'">
            <div class="editable-cell">
              <div
                v-if="
                  (editableData[scope.row.id] &&
                    editableData[scope.row.id][column.name]) ||
                  (editableData[scope.row.id] &&
                    editableData[scope.row.id][column.name] === '')
                "
                class="editable-cell-input-wrapper"
              >
                <el-input
                  v-model="editableData[scope.row.id][column.name]"
                  type="email"
                />
                <el-icon @click="save(scope.row.id, column.name)"
                  ><Select
                /></el-icon>
              </div>
              <div v-else class="editable-cell-text-wrapper">
                <span>{{ scope.row[column.name] }}</span>
                <el-icon @click="edit(scope.row.id, column.name)"
                  ><Edit
                /></el-icon>
              </div>
            </div>
          </template>
          <template v-else-if="column.type === 'Text'">
            <div class="editable-cell">
              <div
                v-if="
                  (editableData[scope.row.id] &&
                    editableData[scope.row.id][column.name]) ||
                  (editableData[scope.row.id] &&
                    editableData[scope.row.id][column.name] === '')
                "
                class="editable-cell-input-wrapper"
              >
                <el-input
                  v-model="editableData[scope.row.id][column.name]"
                  type="text"
                />
                <el-icon @click="save(scope.row.id, column.name)"
                  ><Select
                /></el-icon>
              </div>
              <div v-else class="editable-cell-text-wrapper">
                <span>{{ scope.row[column.name] }}</span>
                <el-icon @click="edit(scope.row.id, column.name)"
                  ><Edit
                /></el-icon>
              </div>
            </div>
          </template>
          <template v-else-if="column.type === 'Checkbox'">
            <div class="editable-cell">
              <div
                v-if="
                  editableData[scope.row.id] &&
                  editableData[scope.row.id][column.name]
                "
                class="editable-cell-input-wrapper"
              >
                <el-checkbox
                  v-model="editableData[scope.row.id][column.name]"
                  size="large"
                />
                <el-icon @click="save(scope.row.id, column.name)"
                  ><Select
                /></el-icon>
              </div>
              <div v-else class="editable-cell-text-wrapper">
                <el-checkbox
                  v-model="scope.row[column.name]"
                  size="large"
                  disabled
                />
                <el-icon @click="edit(scope.row.id, column.name)"
                  ><Edit
                /></el-icon>
              </div>
            </div>
          </template>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { getSingleCollectionById } from '@/api/collection/index'
import { cloneDeep } from 'lodash-es'
const tableColumnScheme = reactive([])
const tableData = reactive([
  {
    id: 1,
    date: '2022-12-01 17:46:38',
    title: 'title1',
    tags: [{ id: 1, value: '1' }],
    number: 0,
    email: '',
    url: '',
    text: '',
  },
  {
    id: 2,
    date: '2022-12-01 17:46:36',
    title: 'title2',
    tags: [{ id: 1, value: '1' }],
    number: 0,
    email: '',
    url: '',
    text: '',
  },
  {
    id: 3,
    date: '2022-12-01 17:46:38',
    title: 'title3',
    tags: [{ id: 1, value: '1' }],
    number: 0,
    email: '',
    url: '',
    text: '',
  },
  {
    id: 4,
    date: '2022-12-01 17:46:38',
    title: 'title4',
    tags: [{ id: 1, value: '1' }],
    number: 0,
    email: '',
    url: '',
    text: '',
  },
])
const editableData = reactive({})
getSingleCollectionById(1, 1).then((res) => {
  tableColumnScheme.push(...JSON.parse(res.schema))
})
const toFristLetterUpper = (s) => {
  return s.replace(s.charAt(0), s.charAt(0).toUpperCase())
}

const edit = (id, field) => {
  const obj = tableData.filter((item) => id === item.id)[0]
  if (obj && Object.prototype.hasOwnProperty.call(obj, field)) {
    if (Object.prototype.hasOwnProperty.call(editableData, id)) {
      editableData[id][field] = cloneDeep(obj[field])
    } else {
      editableData[id] = {}
      editableData[id][field] = cloneDeep(obj[field])
    }
  }
}
const save = (id, field) => {
  const obj = tableData.filter((item) => id === item.id)[0]
  if (obj && Object.prototype.hasOwnProperty.call(obj, field)) {
    obj[field] = editableData[id][field]
  }
  delete editableData[id][field]
}
</script>

<style lang="scss" scoped></style>
