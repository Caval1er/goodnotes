<template>
  <div>{{ props.scheme }}</div>
</template>

<script setup>
const props = defineProps({
  scheme: {
    type: Object,
    default() {
      return {}
    },
  },
})
</script>
<style lang="scss" scoped></style>
