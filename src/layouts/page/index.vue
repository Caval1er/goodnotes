<template>
  <router-view>
    <template #default="{ Component, route }">
      <transition :name="route.meta.transition || 'fade'" mode="out-in">
        <keep-alive>
          <suspense>
            <template #default>
              <component :is="Component" :key="route.fullPath"></component>
            </template>
            <template #fallback>Loading</template>
          </suspense>
        </keep-alive>
      </transition>
    </template>
  </router-view>
</template>

<script setup></script>

<style lang="scss" scoped></style>
