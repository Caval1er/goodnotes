<template>
  <div class="list-item-container">
    <!-- {{ props.schema }} -->
    <div class="list-item-icon">
      <slot name="icon"></slot>
    </div>
    <div class="list-item-title">
      <slot name="title"></slot>
    </div>
    <div class="list-item-body">
      <slot name="body">
        <template v-for="sc in props.schema" :key="sc.name">
          <template v-if="sc.type === 'Multip_Select'">
            <el-tag v-for="tag in props.rowData[sc.name]" :key="tag.id">{{
              tag.value
            }}</el-tag>
          </template>
        </template>
      </slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  schema: {
    type: Object,
    default() {
      return {}
    },
  },
  rowData: {
    type: Object,
    default() {
      return {}
    },
  },
})
</script>

<style lang="scss" scoped></style>
