<template>
  <div class="drawer-form-container">
    <el-drawer v-model="drawerVisible" :show-close="false"
      ><el-form :model="formData.properties" :rules="rules" ref="formRef">
        <template v-for="item in props.schema" :key="item.name">
          <el-form-item :label="item.name">
            <template v-if="item.type === 'Checkbox'"></template>
            <template v-else>
              <el-input v-model="formData.properties[item.name]"
            /></template>
          </el-form-item>
        </template>
      </el-form>
    </el-drawer>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
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
const emit = defineEmits(['update:drawerVisible', 'update:modelValue'])
const formRef = ref(null)

const formData = computed(() => {
  return props.modelValue
})

watch(
  formData,
  (newVal) => {
    emit('update:modelValue', newVal)
  },
  { deep: true } //vue3的监听器的深度监听的配置属性
)

defineExpose({
  handleOpen,
  handleClose,
})
</script>

<style lang="scss" scoped></style>
