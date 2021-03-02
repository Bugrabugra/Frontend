<template>
  <div>
    {{name}} {{password}} {{number}}
  </div>
</template>

<script>
  import {reactive, toRefs, ref} from "vue";


  export default {
    name: 'Home',

    setup() {
      const form = reactive({
        name: "alex",
        password: "password"
      })

      const number = ref(0);

      setTimeout(() => {
        form.name = "Billy"
        number.value = 1
      }, 1000)

      console.log(toRefs(form))

      return {...toRefs(form), number}
    }
  }
</script>