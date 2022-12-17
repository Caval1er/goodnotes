<template>
  <div class="list-container">
    <ul class="list-container-body">
      <li v-for="item in props.dataSource" :key="item.id">
        <slot name="renderItem" :item="item" />
      </li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps({
  dataSource: {
    type: Array,
    default() {
      return []
    },
  },
})
</script>

<style lang="scss" scoped></style>
