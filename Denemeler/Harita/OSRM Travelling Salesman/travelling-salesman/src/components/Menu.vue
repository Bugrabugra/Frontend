<template>
  <div class="menu">
    <div>
      <v-text-field
          v-model="country"
          color="purple darken-2"
          label="Country"
          required
          class="ma-4"
          v-on:keydown.enter="searchCountry"
      ></v-text-field>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Menu"
  }
</script>

<style scoped>

</style>