<template>
  <div>
    <!--<add-blog></add-blog>-->
    <!--<show-blogs></show-blogs>-->
    <!--<list-blogs></list-blogs>-->
    <router-view></router-view>
  </div>
</template>

<script>
  import addBlog from "./components/addBlog";
  import showBlogs from "./components/showBlogs";
  import listBlogs from "./components/listBlogs";


  export default {
    components: {
      "add-blog": addBlog,
      "show-blogs": showBlogs,
      "list-blogs": listBlogs
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
  body {
    margin: 0;
    font-family: "Nunito SemiBold", sans-serif;
  }
</style>
