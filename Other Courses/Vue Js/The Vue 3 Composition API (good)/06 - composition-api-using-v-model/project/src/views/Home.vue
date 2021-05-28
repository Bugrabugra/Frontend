<template>
  <div>
    <form>
      <input type="text" v-model="form.name">
      <input type="password" v-model="form.password">
    </form>

    {{form}}
  </div>
</template>

<script>
  import {reactive, toRefs, ref} from "vue";


  export default {
    name: 'Home',

    setup() {
      const form = reactive({
        name: "alex",
        password: "123"
      })

      const data = {...form}

      return {form}
    }
  }
</script>