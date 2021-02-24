<template>
  <div class="columns is-centered">
    <div class="column is-4 mt-3">
      <input @keyup.enter="save" v-model="data" class="input is-info is-narrow" type="text" placeholder="Add new name">
    </div>
  </div>
</template>

<script>
  import {ref} from "vue";


  export default {
    name: "NewRow",

    setup(props, context) {
      const data = ref("");

      const save = () => {
        context.emit("newName", data.value);
      }

      return {data, save}
    }
  }
</script>

<style scoped>

</style>