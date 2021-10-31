<template>
  <div class="home">
    <h3>My Home</h3>
    <button @click="show = !show">Show List</button>
    <div v-if="show">
      <List/>
    </div>
  </div>
</template>

<script>
  import LoadingComponent from "./LoadingComponent";
  import ErrorComponent from "./ErrorComponent";

  const List = () => ({
    component: import(/* webpackChunkName: "list" */ "./List.vue"),
    loading: LoadingComponent,
    error: ErrorComponent,
    timeout: 3000
  });
  export default {
    data() {
      return {
        show: false
      }
    },
    components: {
      // List: () => import(/* webpackChunkName: "list" */ "@/components/List.vue").catch()
      List
    }
  }
</script>

<style scoped>
  .home {
    border: 1px solid red;
  }
</style>