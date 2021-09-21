<template>
  <div>
    <h1>Hello from the Contact Page</h1>
    <input type="text" placeholder="Enter Your Message">
    <input type="button" value="Send">
  </div>
</template>

<script>
  import {onActivated, onDeactivated, onMounted} from "vue";


  export default {
    name: "Contact",
    setup() {
      onMounted(() => {
        console.log("Contact has been mounted");
      });

      onActivated(() => {
        console.log("Contact has been activated");
      });

      onDeactivated(() => {
        console.log("Contact has been deactivated");
      });

      return {}
    }
  }
</script>