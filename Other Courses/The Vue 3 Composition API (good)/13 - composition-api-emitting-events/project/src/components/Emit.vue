<template>
  <input type="text" @input="handleChange">
</template>

<script>
  export default {
    name: "Emit",

    setup(props, {emit}) {
      const handleChange = (e) => {
        emit("changed", e.target.value)
      }

      return {handleChange}
    }
  }
</script>

<style scoped>

</style>