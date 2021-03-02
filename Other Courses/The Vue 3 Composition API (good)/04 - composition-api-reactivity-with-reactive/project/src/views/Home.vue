<template>
  <div>
    {{form.name}} {{form.password}}
  </div>
</template>

<script>
  import {reactive} from "vue";


  export default {
    name: 'Home',

    setup() {
      const state = reactive({
        form: {
          name: "alex",
          password: "password"
        }
      })

      return {...state}
    }
  }
</script>