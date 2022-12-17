<template>
  <div class="list-item-container">
    <!-- {{ props.schema }} -->
    <div class="list-item-icon">
      <slot name="icon"></slot>
    </div>
    <div class="list-item-title">
      <slot name="title"
        ><span>{{ props.rowData.title }}</span></slot
      >
    </div>
    <div class="list-item-body">
      <slot name="body">
        <template v-for="sc in props.schema" :key="sc.name">
          <template v-if="sc.type === 'Date'">
            <div class="date-container">
              <span>{{ props.rowData[sc.name] }}</span>
            </div>
          </template>
          <template v-if="sc.type === 'Url'">
            <div class="link-container">
              <el-link
                :href="props.rowData[sc.name]"
                type="primary"
                target="_blank"
                >{{ props.rowData[sc.name] }}</el-link
              >
            </div>
          </template>
          <template v-if="sc.type === 'Multip_Select'">
            <div class="tag-container mutlip-tag">
              <el-tag v-for="tag in props.rowData[sc.name]" :key="tag.id">{{
                tag.value
              }}</el-tag>
            </div>
          </template>
          <template v-if="sc.type === 'Single_Select'">
            <div class="tag-container single-tag">
              <el-tag>{{ props.rowData[sc.name].value }}</el-tag>
            </div>
          </template>
          <template v-if="sc.type === 'Checkbox'">
            <div class="checkbox-container">
              <el-checkbox :model-value="props.rowData[sc.name]"></el-checkbox>
            </div>
          </template>
          <template v-if="sc.type === 'Number'">
            <div class="number-container">
              <span>{{ props.rowData[sc.name] }}</span>
            </div>
          </template>
          <template v-if="sc.type === 'Email'">
            <div class="email-container">
              <span>{{ props.rowData[sc.name] }}</span>
            </div>
          </template>
          <template v-if="sc.type === 'Text'">
            <div class="text-container">
              <span>{{ props.rowData[sc.name] }}</span>
            </div>
          </template>
        </template>
      </slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  schema: {
    type: Array,
    default() {
      return []
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

<style lang="scss" scoped>
.list-item-container {
  .list-item-body {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    padding: 0 20px 0 px;
    div {
      padding: 0 5px 0 5px;
    }
  }
}
</style>
