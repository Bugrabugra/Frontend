<template>
  <div class="min-h-screen flex justify-center bg-gray-400">
    <div class="mt-10 w-2/3 md:w-3/4 lg:w-2/4 xl:w-2/4 2xl:w-1/3">
      <Users/>
    </div>
  </div>
</template>

<script>
  import Users from "../components/Admin/Users.vue";

  export default {
    name: "Admin",
    components: {Users},
    setup() {


      return {}
    }
  }
</script>

<style scoped>

</style>