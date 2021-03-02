<template>
  <div>
    <AppInput v-model="name"/>

    {{name}}
  </div>
</template>

<script>
  import {ref} from "vue";
  import AppInput from "../components/AppInput";


  export default {
    name: 'Home',

    components: {
      AppInput,
    },

    setup() {
      const name = ref("alex");

      return {name}
    }
  }
</script>
