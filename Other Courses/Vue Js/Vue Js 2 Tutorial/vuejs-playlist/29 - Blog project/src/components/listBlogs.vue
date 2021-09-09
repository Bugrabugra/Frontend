<template>
  <div id="show-blogs">

    <h1>List Blog Titles</h1>
    <input type="text" v-model="search" placeholder="search blogs">
    <div v-for="blog in filteredBlogs" class="single-block">
      <h2 v-rainbow>{{blog.title|toUppercase}}</h2>
      <article>{{blog.body|snippet}}</article>
    </div>
  </div>
</template>

<script>
  import searchMixin from "../mixins/searchMixin";

  export default {
    data () {
      return {
        blogs: [],
        search: ""
      }
    },
    methods: {

    },
    created() {
      this.$http.get("https://jsonplaceholder.typicode.com/posts")
        .then(data => {
          this.blogs = data.body.slice(0, 10);
        })
    },
    computed: {
      // filteredBlogs() {
      //   return this.blogs.filter(blog => {
      //     return blog.title.match(this.search);
      //   })
      // }
    },
    filters: {
      // Local filter
      toUppercase(value) {
        return value.toUpperCase();
      }
    },
    directives: {
      "rainbow": {
        bind(el, binding, vnode) {
          el.style.color = "#" + Math.random().toString(16).slice(2, 8);
        }
      }
    },
    mixins: [searchMixin]


  }
</script>

<style scoped>
  * {
    font-family: "Arial", JetBrains Mono;
  }
  #show-blogs {
    max-width: 800px;
    margin: 0 auto;
  }

  .single-block {
    padding: 20px;
    margin: 20px 0;
    box-sizing: border-box;
    background: #eee;
  }
</style>
