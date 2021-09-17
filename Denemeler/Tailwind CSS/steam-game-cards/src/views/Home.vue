<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-900">
    <div class="flex justify-start items-center">
      <Card/>
    </div>
  </div>
</template>

<script>
  import Card from "../components/Card.vue";


  export default {
    name: "Home",
    components: {Card},
  }
</script>