<template>
  <div class="bg-purple-500">
    <nav class="flex justify-between items-center h-18 py-4 lg:max-w-screen-xl lg:mx-auto">
      <!--Menu-->
      <div class="flex justify-between space-x-4 text-white">
        <a href="#">Home</a>
        <a href="#">Docs</a>
        <a href="#">Examples</a>
        <a href="#">Icons</a>
        <a href="#">Themes</a>
        <a href="#">Blog</a>
      </div>

      <!--Icons-->
      <div class="flex justify-between items-center space-x-3 text-white">
        <a href="#">Github</a>
        <a href="#">Twitter</a>
        <a href="#">Slack</a>
        <a href="#">Collective</a>

        <button class="text-yellow-200 font-semibold px-3 py-2 border border-yellow-200 rounded leading-5">Download</button>
      </div>

    </nav>
  </div>
</template>

<script>
  export default {
    name: "Navbar",
    data() {
      return {}
    }
  }
</script>

<style scoped>

</style>