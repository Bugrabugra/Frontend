<template>
  <component
      v-for="option in options"
      :key="option.value"
      :is="vertical ? 'div' : 'span'"
      :class="{
        horizontal: !vertical
      }"
  />


  <BaseRadio
      v-for="option in options"
      :key="option.value"
      :label="option.label"
      :value="option.value"
      :name="name"
      :modelValue="modelValue"
      @update:modelValue="$emit('update:modelValue', $event)"
  />
</template>

<script>
  import BaseRadio from "./BaseRadio";
  export default {
    name: "BaseRadioGroup",
    components: {BaseRadio},
    props: {
      options: {
        type: Array,
        required: true
      },

      name: {
        type: String,
        required: true
      },

      modelValue: {
        type: [String, Number],
        required: true
      },

      vertical: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>
  .horizontal {
    margin-right: 20px;
  }
</style>