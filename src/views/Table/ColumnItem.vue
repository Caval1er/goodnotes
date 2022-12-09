<template>
  <el-table-column
    v-for="column in props.tableColumnScheme"
    :column-key="column.name"
    :key="column.name"
    :prop="column.name"
    :label="toFristLetterUpper(column.name)"
  >
  </el-table-column>
</template>

<script setup>
const props = defineProps({
  scheme: {
    type: Array,
    default() {
      return []
    },
  },
})
const toFristLetterUpper = (s) => {
  return s.replace(s.charAt(0), s.charAt(0).toUpperCase())
}
</script>
<style lang="scss" scoped></style>
