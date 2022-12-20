<template>
  <div class="drawer-form-container">
    <el-drawer v-model="drawerVisible" :show-close="false"
      ><el-form
        :model="formData.properties"
        :rules="rules"
        ref="formRef"
        label-width="100px"
        label-position="left"
      >
        <template v-for="item in props.schema" :key="item.name">
          <el-form-item>
            <template #label
              ><el-dropdown trigger="contextmenu" @command="handleCommand">
                <property-icon
                  :property-type="item.type"
                  :property-name="item.name"
                />
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item
                      :command="{ name: 'rename', property: item }"
                      divided
                      >重命名属性</el-dropdown-item
                    >
                    <el-dropdown-item
                      :command="{ name: 'delete', property: item }"
                      >删除属性</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </template>
              </el-dropdown></template
            >

            <template v-if="item.type === 'Title'">
              <el-input v-model="formData.properties[item.name]" type="text"
            /></template>
            <template v-else-if="item.type === 'Date'">
              <el-date-picker
                v-model="formData.properties[item.name]"
                type="datetime"
                placeholder="Select date and time"
                value-format="YYYY-MM-DD HH:mm:ss"
                format="YYYY/MM/DD HH:mm:ss"
              >
              </el-date-picker>
            </template>
            <template
              v-else-if="
                item.type === 'Single_Select' || item.type === 'Multip_Select'
              "
            >
              <el-select
                v-model="formData.properties[item.name]"
                :multiple="item.type === 'Multip_Select'"
                allow-create
                default-first-option
                filterable
              >
                <el-option
                  v-for="option in item.options"
                  :key="option.id"
                  :name="option.label"
                  :value="option.value"
                ></el-option>
              </el-select>
            </template>
            <template v-else-if="item.type === 'Number'">
              <el-input-number
                v-model="formData.properties[item.name]"
                controls-position="right"
            /></template>
            <template v-else-if="item.type === 'Email'">
              <el-input v-model="formData.properties[item.name]" type="email"
            /></template>
            <template v-else-if="item.type === 'Url'">
              <el-input v-model="formData.properties[item.name]" type="url"
            /></template>
            <template v-else-if="item.type === 'Checkbox'">
              <el-checkbox v-model="formData.properties[item.name]"
            /></template>
            <template v-else>
              <el-input v-model="formData.properties[item.name]" type="text"
            /></template>
          </el-form-item>
        </template>
      </el-form>
    </el-drawer>
  </div>
</template>

<script setup>
import { computed, ref, toRaw } from 'vue'
const props = defineProps({
  modelValue: {
    type: Object,
  },
  rules: {
    type: Object,
    default() {
      return {}
    },
  },
  schema: {
    type: Array,
    default() {
      return []
    },
  },
})

const drawerVisible = ref(false)
const handleOpen = () => {
  drawerVisible.value = true
}

const handleClose = () => {
  drawerVisible.value = false
}
const emit = defineEmits(['update:modelValue'])
const formRef = ref(null)

const formData = computed({
  get: () => props.modelValue,
  set: (newVal) => {
    emit('update:modelValue', newVal)
  },
})
const handleCommand = (command) => {
  console.log(toRaw(command.property))
}
defineExpose({
  handleOpen,
  handleClose,
})
</script>

<style lang="scss" scoped>
.drawer-form-container {
  .el-form {
    :deep(.el-form-item) {
      label {
        align-items: center;
      }
    }
  }
}
</style>
