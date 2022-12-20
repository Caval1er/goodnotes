<template>
  <div class="table-container">
    <el-form :model="formData" :rules="formData.rules" ref="formRef">
      <el-table
        :data="formData.data"
        border
        stripe
        style="width: 100%"
        max-height="350"
      >
        <el-table-column
          v-for="column in tableColumnScheme"
          :column-key="column.name"
          :key="column.name"
          :prop="column.name"
          :width="column.width || 200"
        >
          <template #header
            ><property-icon
              :property-type="column.type"
              :property-name="column.name"
          /></template>
          <template #default="scope">
            <template v-if="column.type === 'Title'">
              <div class="editable-cell">
                <div
                  v-if="
                    (formData.editableData[scope.row.id] &&
                      formData.editableData[scope.row.id][column.name]) ||
                    (formData.editableData[scope.row.id] &&
                      formData.editableData[scope.row.id][column.name] === '')
                  "
                  class="editable-cell-input-wrapper"
                >
                  <el-form-item
                    :prop="'editableData.' + scope.row.id + '.' + column.name"
                    :rules="formData.rules.title"
                  >
                    <el-input
                      v-model="formData.editableData[scope.row.id][column.name]"
                      type="text"
                    />
                  </el-form-item>
                  <el-icon @click="save(scope.row.id, column.name)"
                    ><Select
                  /></el-icon>
                </div>

                <div
                  v-else
                  class="editable-cell-text-wrapper editable-cell-title"
                >
                  <span>{{ scope.row.properties[column.name] }}</span>
                  <div class="editable-cell-text-icon">
                    <el-icon @click="openDrawer(scope.row.id)"
                      ><Postcard
                    /></el-icon>
                    <el-icon @click="edit(scope.row.id, column.name)"
                      ><Edit
                    /></el-icon>
                  </div>
                </div>
              </div>
            </template>
            <template v-else-if="column.type === 'Date'">
              <div class="editable-cell">
                <div
                  v-if="
                    formData.editableData[scope.row.id] &&
                    formData.editableData[scope.row.id][column.name]
                  "
                >
                  <el-date-picker
                    v-model="formData.editableData[scope.row.id][column.name]"
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
                  <span>{{ scope.row.properties[column.name] }}</span>
                  <el-icon @click="edit(scope.row.id, column.name)"
                    ><Edit
                  /></el-icon>
                </div>
              </div>
            </template>
            <template
              v-else-if="
                column.type === 'Single_Select' ||
                column.type === 'Multip_Select'
              "
            >
              <div class="editable-cell">
                <div
                  v-if="
                    formData.editableData[scope.row.id] &&
                    formData.editableData[scope.row.id][column.name]
                  "
                  class="editable-cell-input-wrapper"
                >
                  <el-select
                    v-model="formData.editableData[scope.row.id][column.name]"
                    :multiple="column.type === 'Multip_Select'"
                    allow-create
                    default-first-option
                    filterable
                  >
                    <el-option
                      v-for="item in column.options"
                      :key="item.id"
                      :name="item.name"
                      :value="item.name"
                    ></el-option>
                  </el-select>

                  <el-icon @click="save(scope.row.id, column.name)"
                    ><Select
                  /></el-icon>
                </div>
                <div v-else class="editable-cell-text-wrapper">
                  <template v-if="column.type === 'Multip_Select'">
                    <el-tag
                      v-for="tag in scope.row.properties[column.name]"
                      :key="tag.id"
                      >{{ tag.value }}</el-tag
                    ></template
                  >
                  <template v-else>
                    <!-- <el-tag>{{ tag.value }}</el-tag> -->
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
                    (formData.editableData[scope.row.id] &&
                      formData.editableData[scope.row.id][column.name]) ||
                    (formData.editableData[scope.row.id] &&
                      formData.editableData[scope.row.id][column.name] === 0)
                  "
                  class="editable-cell-input-wrapper"
                >
                  <el-form-item
                    :prop="'editableData.' + scope.row.id + '.' + column.name"
                    :rules="formData.rules.number"
                  >
                    <el-input-number
                      v-model="formData.editableData[scope.row.id][column.name]"
                      controls-position="right"
                    />
                  </el-form-item>

                  <el-icon @click="save(scope.row.id, column.name)"
                    ><Select
                  /></el-icon>
                </div>
                <div v-else class="editable-cell-text-wrapper">
                  <span>{{ scope.row.properties[column.name] }}</span>
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
                    (formData.editableData[scope.row.id] &&
                      formData.editableData[scope.row.id][column.name]) ||
                    (formData.editableData[scope.row.id] &&
                      formData.editableData[scope.row.id][column.name] === '')
                  "
                  class="editable-cell-input-wrapper"
                >
                  <el-form-item
                    :prop="'editableData.' + scope.row.id + '.' + column.name"
                    :rules="formData.rules.email"
                  >
                    <el-input
                      v-model="formData.editableData[scope.row.id][column.name]"
                      type="email"
                    />
                  </el-form-item>
                  <el-icon @click="save(scope.row.id, column.name)"
                    ><Select
                  /></el-icon>
                </div>
                <div v-else class="editable-cell-text-wrapper">
                  <span>{{ scope.row.properties[column.name] }}</span>
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
                    (formData.editableData[scope.row.id] &&
                      formData.editableData[scope.row.id][column.name]) ||
                    (formData.editableData[scope.row.id] &&
                      formData.editableData[scope.row.id][column.name] === '')
                  "
                  class="editable-cell-input-wrapper"
                >
                  <el-form-item
                    :prop="'editableData.' + scope.row.id + '.' + column.name"
                    :rules="formData.rules.url"
                  >
                    <el-input
                      v-model="formData.editableData[scope.row.id][column.name]"
                      type="url"
                    />
                  </el-form-item>
                  <el-icon @click="save(scope.row.id, column.name)"
                    ><Select
                  /></el-icon>
                </div>
                <div v-else class="editable-cell-text-wrapper">
                  <span>{{ scope.row.properties[column.name] }}</span>
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
                    (formData.editableData[scope.row.id] &&
                      formData.editableData[scope.row.id][column.name]) ||
                    (formData.editableData[scope.row.id] &&
                      formData.editableData[scope.row.id][column.name] === '')
                  "
                  class="editable-cell-input-wrapper"
                >
                  <el-form-item
                    :prop="'editableData.' + scope.row.id + '.' + column.name"
                    :rules="formData.rules.text"
                  >
                    <el-input
                      v-model="formData.editableData[scope.row.id][column.name]"
                      type="text"
                    />
                  </el-form-item>
                  <el-icon @click="save(scope.row.id, column.name)"
                    ><Select
                  /></el-icon>
                </div>
                <div v-else class="editable-cell-text-wrapper">
                  <span>{{ scope.row.properties[column.name] }}</span>
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
                    formData.editableData[scope.row.id] &&
                    formData.editableData[scope.row.id][column.name]
                  "
                  class="editable-cell-input-wrapper"
                >
                  <el-checkbox
                    v-model="formData.editableData[scope.row.id][column.name]"
                    size="large"
                  />
                  <el-icon @click="save(scope.row.id, column.name)"
                    ><Select
                  /></el-icon>
                </div>
                <div v-else class="editable-cell-text-wrapper">
                  <el-checkbox
                    v-model="scope.row.properties[column.name]"
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
    </el-form>
    <drawer-form
      ref="drawerRef"
      v-model="rowData"
      :rules="formData.rules"
      :schema="tableColumnScheme"
    />
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, computed } from 'vue'
import { updateProperties, getPagesByCollectionId } from '@/api/page/index'
import { getCollectionViewById } from '@/api/collectionView/index'
import { cloneDeep } from 'lodash-es'

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
const tableColumnScheme = ref([])
const formData = reactive({
  data: [],
  editableData: {},
  rules: {
    email: [
      {
        required: true,
        message: '必须',
        trigger: 'change',
      },
    ],
  },
})

const currentIndex = ref(-1)
const drawerRef = ref(null)
const rowData = computed({
  get: () => formData.data.find((item) => item.id === currentIndex.value),
  set: (newVal) => {
    formData.data.filter((item) => item.id === currentIndex.value)[0] = newVal
  },
})
const formRef = ref(null)
onMounted(() => {
  getCollectionViewById(props.id).then((res) => {
    console.log(res)
    tableColumnScheme.value = res.schema
  })
  getPagesByCollectionId(props.collectionId).then((res) => {
    formData.data.push(...res)
  })
})

const openDrawer = (id) => {
  currentIndex.value = id
  console.log(currentIndex.value)
  drawerRef.value.handleOpen()
}

const edit = (id, field) => {
  const rowData = formData.data.filter((item) => id === item.id)[0]
  console.log(rowData)
  if (
    rowData &&
    rowData.properties &&
    Object.prototype.hasOwnProperty.call(rowData.properties, field)
  ) {
    if (Object.prototype.hasOwnProperty.call(formData.editableData, id)) {
      formData.editableData[id][field] = cloneDeep(rowData.properties[field])
    } else {
      formData.editableData[id] = {}
      formData.editableData[id][field] = cloneDeep(rowData.properties[field])
    }
  }
}
const save = (id, field) => {
  const rowData = formData.data.filter((item) => id === item.id)[0]
  if (
    rowData &&
    rowData.properties &&
    Object.prototype.hasOwnProperty.call(rowData.properties, field)
  ) {
    rowData.properties[field] = formData.editableData[id][field]
  }
  delete formData.editableData[id][field]
  formRef.value.validate((valid, prop) => {
    if (valid) {
      console.log(valid, prop)
      handleUpdate(id, rowData.properties)
    } else {
      console.log('1')
    }
  })
}

const handleUpdate = (id, page) => {
  updateProperties(id, page).then((res) => {
    console.log(res)
  })
}
</script>

<style lang="scss" scoped>
.table-container {
  .el-table {
    :deep(.el-table__row) {
      .el-table__cell {
        &:hover {
          .el-icon {
            display: flex !important;
          }
        }
        .editable-cell {
          position: relative;
          .editable-cell-input-wrapper {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .el-form-item {
              margin-bottom: 0px;
            }
            .el-icon {
              cursor: pointer;
              padding: 0px 2px 0px 5px;
              &:hover {
                color: #108ee9;
              }
            }
          }
          .editable-cell-text-wrapper {
            display: flex;
            align-items: center;
            padding: 0 18px 0 0;
            .editable-cell-text-icon {
              position: absolute;
              display: flex;
              right: 0;
              .el-icon {
                position: static;
              }
            }
            .el-icon {
              position: absolute;
              right: 0px;
              display: none;
              font-size: 18px;
              // padding: 0px 2px 0px 5px;
              cursor: pointer;
              &:hover {
                color: #108ee9;
              }
            }
          }
          .editable-cell-title {
            padding: 0 36px 0 0;
          }
        }
      }
    }
  }
}
</style>
