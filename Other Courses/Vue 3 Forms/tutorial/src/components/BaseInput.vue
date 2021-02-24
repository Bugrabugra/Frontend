<template>
  <label>{{label}}</label>
  <input
      v-bind="$attrs"
      :placeholder="label"
      class="field"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
  >
</template>

<script>
  export default {
    name: "BaseInput",

    props: {
      label: {
        type: String,
        default: ""
      },

      modelValue: {
        type: [String, Number],
        default: ""
      }
    }
  }
</script>

<style scoped>

</style>