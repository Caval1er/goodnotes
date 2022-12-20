<template>
  <div class="property-icon-container">
    <template v-if="props.propertyType === 'Title'"><icon-title /> </template>
    <template v-if="props.propertyType === 'Date'"
      ><el-icon><Calendar /></el-icon>
    </template>
    <template v-else-if="props.propertyType === 'Text'"
      ><el-icon><Tickets /></el-icon>
    </template>
    <template v-else-if="props.propertyType === 'Number'"
      ><icon-hashtag />
    </template>
    <template v-else-if="props.propertyType === 'Multip_Select'"
      ><icon-multip />
    </template>
    <template v-else-if="props.propertyType === 'Email'"
      ><icon-email />
    </template>
    <template v-else-if="props.propertyType === 'Url'"><icon-url /> </template>
    <template v-else-if="props.propertyType === 'Checkbox'"
      ><icon-checkbox />
    </template>
    <template v-else-if="props.propertyType === 'Single_Select'"
      ><icon-single />
    </template>
    <span>{{ toFristLetterUpper(props.propertyName) }}</span>
  </div>
</template>

<script setup>
const props = defineProps({
  propertyType: {
    type: String,
    require: true,
  },
  propertyName: {
    type: String,
    default: '',
  },
})

const toFristLetterUpper = (s) => {
  return s.replace(s.charAt(0), s.charAt(0).toUpperCase())
}
</script>

<style lang="scss" scoped>
.property-icon-container {
  display: flex;
  align-items: center;
  .my-icon {
    width: 1em;
    height: 1em;
    line-height: 1em;
    font-style: normal;
    padding: 0px 3px 0 0;
  }
  .el-icon {
    padding: 0px 3px 0 0;
  }
}
</style>
