<template>
  <div class="gallery-item-container">
    <div class="gallery-header-img">
      <slot name="img"
        ><img
          src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
          class="image"
      /></slot>
    </div>
    <div class="gallery-item-title">
      <slot name="title"
        ><span>{{ props.property.title }}</span></slot
      >
    </div>
    <div class="gallery-item-body">
      <slot name="body">
        <template v-for="sc in props.schema" :key="sc.name">
          <template v-if="sc.type === 'Date'">
            <div class="date-container">
              <span>{{ props.property[sc.name] }}</span>
            </div>
          </template>
          <template v-if="sc.type === 'Url'">
            <div class="link-container">
              <el-link
                :href="props.property[sc.name]"
                type="primary"
                target="_blank"
                >{{ props.property[sc.name] }}</el-link
              >
            </div>
          </template>
          <template v-if="sc.type === 'Multip_Select'">
            <div class="tag-container mutlip-tag">
              <el-tag v-for="tag in props.property[sc.name]" :key="tag.id">{{
                tag.value
              }}</el-tag>
            </div>
          </template>
          <template v-if="sc.type === 'Single_Select'">
            <div class="tag-container single-tag">
              <el-tag>{{ props.property[sc.name].value }}</el-tag>
            </div>
          </template>
          <template v-if="sc.type === 'Checkbox'">
            <div class="checkbox-container">
              <el-checkbox :model-value="props.property[sc.name]"></el-checkbox>
            </div>
          </template>
          <template v-if="sc.type === 'Number'">
            <div class="number-container">
              <span>{{ props.property[sc.name] }}</span>
            </div>
          </template>
          <template v-if="sc.type === 'Email'">
            <div class="email-container">
              <span>{{ props.property[sc.name] }}</span>
            </div>
          </template>
          <template v-if="sc.type === 'Text'">
            <div class="text-container">
              <span>{{ props.property[sc.name] }}</span>
            </div>
          </template>
        </template>
      </slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  property: {
    type: Object,
    default() {
      return {}
    },
  },
  schema: {
    type: Object,
    default() {
      return {}
    },
  },
})
</script>

<style lang="scss" scoped></style>
