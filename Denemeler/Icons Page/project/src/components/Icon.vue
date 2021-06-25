<template>
  <div>
    <v-btn elevation="0" color="grey lighten-3" height="100" width="120" class="button text-center ma-4">
      <v-icon class="icon" size="32">mdi-{{iconName}}</v-icon>
    </v-btn>
    <p class="text-center subtitle-2">{{iconName}}</p>
  </div>
</template>

<script>
  export default {
    name: "Icon",
    props: ["iconName"],
    data() {
      return {}
    }
  }
</script>

<style scoped lang="scss">
  .button:hover {
    .icon {
      color: dodgerblue;
    }
  }

</style>