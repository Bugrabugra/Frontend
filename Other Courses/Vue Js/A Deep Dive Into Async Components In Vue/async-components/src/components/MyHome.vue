<template>
  <div class="home">
    <h3>My Home</h3>
    <button @click="toggleShow">
      Show List
    </button>
    <div v-if="show">
      <List/>
    </div>
  </div>
</template>

<script>
  export default {
    name: "MyHome",
    components: {
      List: () => import("@/components/List")
    },
    data() {
      return {
        show: false
      }
    },
    methods: {
      toggleShow() {
        this.show = !this.show;
      }
    }
  }
</script>

<style scoped>
  .home {
    border: 1px solid red;
  }
</style>