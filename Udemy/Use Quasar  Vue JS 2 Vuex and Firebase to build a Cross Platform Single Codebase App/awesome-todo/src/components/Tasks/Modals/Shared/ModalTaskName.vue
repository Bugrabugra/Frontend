<template>
  <div class="row q-mb-sm">
    <q-input
      class="col"
      :value="name"
      @input="$emit('update:name', $event)"
      label="Task name"
      :rules="[val => !!val || 'Field is required']"
      ref="name"
      v-select-all
      outlined
      autofocus
      clearable
    />
  </div>
</template>

<script>
  import {selectAll} from "src/directives/directive-select-all";


  export default {
    name: "ModalTaskName",

    props: ["name"],

    directives: {
      selectAll
    }

  }
</script>

<style scoped>

</style>
