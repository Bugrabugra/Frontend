<template>
  <div class="row q-mb-sm">
    <q-input
      class="col"
      :value="name"
      @input="$emit('update:name', $event)"
      label="Task name"
      :rules="[val => !!val || 'Field is required']"
      ref="name"
      outlined
      autofocus
      clearable
    />
  </div>
</template>

<script>
  export default {
    name: "ModalTaskName",
    props: ["name"]
  }
</script>

<style scoped>

</style>
