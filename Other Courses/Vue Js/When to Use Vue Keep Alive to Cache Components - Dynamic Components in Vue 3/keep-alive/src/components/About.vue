<template>
  <div>
    <h1>Hello from the About Page</h1>
  </div>
</template>

<script>
  import {onMounted} from "vue";


  export default {
    name: "About",
    setup() {
      onMounted(() => {
        console.log("About has been mounted");
      })

      return {}
    }
  }
</script>