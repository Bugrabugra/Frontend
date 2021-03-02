<template>
  <input
      type="text"
      :value="value"
      @input="handleInput"
  >
</template>

<script>
  export default {
    name: "AppInput",

    props: {
      value: {
        required: false
      }
    },

    setup(props, {emit}) {
      const handleInput = (e) => {
        emit('input', e.target.value);
      }

      return {handleInput}
    }
  }
</script>

<style scoped>

</style>