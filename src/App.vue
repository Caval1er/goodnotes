<script setup>
import { RouterView } from 'vue-router'
import { getSingleCollectionById } from '@/api/collection/index'
getSingleCollectionById(1, 1).then((res) => {
  console.log(res)
})
</script>

<template>
  <RouterView />
</template>
