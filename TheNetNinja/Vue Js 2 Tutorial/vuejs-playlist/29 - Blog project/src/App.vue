<template>
  <div>
    <!--<add-blog></add-blog>-->
    <!--<show-blogs></show-blogs>-->
    <!--<list-blogs></list-blogs>-->
    <app-header></app-header>
    <router-view></router-view>
  </div>
</template>

<script>
  import addBlog from "./components/addBlog";
  import showBlogs from "./components/showBlogs";
  import listBlogs from "./components/listBlogs";
  import header from "./components/header";


  export default {
    components: {
      "add-blog": addBlog,
      "show-blogs": showBlogs,
      "list-blogs": listBlogs,
      "app-header": header
    },
    data () {
      return {

      }
    },
    methods: {

    }
  }
</script>

<style scoped>
  * {
    margin: 0;
    font-family: "JetBrains Mono", sans-serif;
  }
</style>
