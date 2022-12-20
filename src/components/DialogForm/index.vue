<template>
  <div class="dialog-form-container">
    <el-dialog v-model="dialogVisible">
      <template #header>
        <el-button type="primary" @click="handleAdd"> 创建 </el-button>
      </template>
      <el-form
        :model="formData"
        ref="formRef"
        label-width="40px"
        label-position="left"
        :hide-required-asterisk="true"
      >
        <el-form-item label="名称" prop="name" :rules="formData.rules.name">
          <el-input v-model="formData.name" />
        </el-form-item>
        <template v-for="(item, index) in formData.properties">
          <el-form-item
            :prop="'properties.' + index + '.name'"
            :rules="formData.rules.name"
          >
            <template #label>
              <el-dropdown trigger="contextmenu" @command="handleCommand">
                <property-icon :property-type="item.type" />
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item
                      :command="{ name: 'delete', property: item }"
                      >删除属性</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </template>
            <el-input v-model="item.name" />
            <template
              v-if="
                item.type === 'Multip_Select' || item.type === 'Single_Select'
              "
            >
              <div class="select-container">
                <el-tag
                  v-for="tag in item.options"
                  :key="tag"
                  class="mx-1"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(tag, item.options)"
                >
                  {{ tag.name }}
                </el-tag>
                <el-input
                  v-if="inputVisible"
                  ref="InputRef"
                  v-model="inputValue"
                  class="ml-1 w-20"
                  size="small"
                  @keyup.enter="handleInputConfirm(item.options)"
                  @blur="handleInputConfirm(item.options)"
                />
                <el-button
                  v-else
                  class="button-new-tag ml-1"
                  size="small"
                  @click="showInput"
                >
                  + New Tag
                </el-button>
              </div>
            </template>
          </el-form-item>
        </template>
        <el-form-item>
          <el-popover placement="bottom" :width="200" trigger="click">
            <template #reference>
              <el-button class="m-2">增加新属性</el-button>
            </template>
            <el-select
              v-model="property"
              class="m-2"
              placeholder="Select"
              size="large"
              @change="addProperty"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-popover>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, toRaw, ref, nextTick } from 'vue'
import { addCollection } from '@/api/collection/index'
const formData = reactive({
  name: '',
  properties: [{ type: 'Title', name: '' }],
  rules: {
    name: {
      required: true,
      message: '属性名不能为空',
      trigger: 'blur',
    },
  },
})
const formRef = ref(null)
const dialogVisible = ref(true)
const handleCommand = (command) => {
  console.log(toRaw(command.property))
}

const property = ref('')
const options = [
  {
    value: 'Date',
    label: '日期',
  },
  {
    value: 'Text',
    label: '文本',
  },
  {
    value: 'Number',
    label: '数字',
  },
  {
    value: 'Checkbox',
    label: '单选框',
  },
  {
    value: 'Email',
    label: '邮箱',
  },
  {
    value: 'Url',
    label: '链接',
  },
  {
    value: 'Single_Select',
    label: '单选',
  },
  {
    value: 'Multip_Select',
    label: '多选',
  },
]
const addProperty = (val) => {
  if (val !== 'Single_Select' && val !== 'Multip_Select') {
    formData.properties.push({ type: val, name: '' })
  } else {
    formData.properties.push({ type: val, name: '', options: [] })
  }
  property.value = ''
}

const handleAdd = () => {
  if (!formRef.value) return
  formRef.value.validate((valid, b) => {
    if (valid) {
      addCollection(formData.name, '', formData.properties)
      formRef.value.resetFields()
      dialogVisible.value = false
    } else {
      console.log(valid, b)
      return false
    }
  })
}
const inputValue = ref('')

const inputVisible = ref(false)
const InputRef = ref(null)

const handleClose = (tag, item) => {
  item.splice(item.indexOf(tag), 1)
}

const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    InputRef.value.input.focus()
  })
}

const handleInputConfirm = (item) => {
  if (inputValue.value) {
    item.push({ name: inputValue.value, color: 'white' })
  }
  inputVisible.value = false
  inputValue.value = ''
}
</script>

<style lang="scss" scoped>
.dialog-form-container {
  .el-form {
    :deep(.el-form-item) {
      label {
        align-items: center;
      }
    }

    .select-container {
      margin-top: 10px;
      display: flex;
      .el-tag {
        margin: 0 5px 0 0;
      }
    }
  }
}
</style>
