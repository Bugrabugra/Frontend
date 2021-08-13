<template>
  <div class="home">
    <BlogPost :post="welcomeScreen"/>
    <BlogPost :post="post" v-for="(post, index) in sampleBlogPosts" :key="index"/>
    <div class="blog-card-wrap">
      <div class="container">
        <h3>View More Recent Blogs</h3>
        <div class="blog-cards">
          <BlogCard :post="post" v-for="(post, index) in sampleBlogCards" :key="index"/>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import {ref} from "vue";
  import BlogPost from "../components/BlogPost";
  import BlogCard from "../components/BlogCard";


  export default {
    name: 'Home',
    components: {
      BlogCard,
      BlogPost},
    setup() {
      // References
      const welcomeScreen = ref({
        title: "Welcome!",
        blogPost: "Weekly blog articles with all things programming including HTML, CSS, JavaScript and more. Register today to never miss a post",
        welcomeScreen: true,
        photo: "coding"
      });

      const sampleBlogPosts = ref([
        {
          title: "This is a Filler Title!",
          blogHTML: "This is a filler blog post title!",
          blogCoverPhoto: "beautiful-stories"
        },
        {
          title: "This is a Filler Title!",
          blogHTML: "This is a filler blog post title!",
          blogCoverPhoto: "designed-for-everyone"
        }
      ]);

      const sampleBlogCards = ref([
        {blogTitle: "Blog Card #1", blogCoverPhoto: "stock-1", blogDate: "May 1, 2021"},
        {blogTitle: "Blog Card #2", blogCoverPhoto: "stock-2", blogDate: "May 1, 2021"},
        {blogTitle: "Blog Card #3", blogCoverPhoto: "stock-3", blogDate: "May 1, 2021"},
        {blogTitle: "Blog Card #4", blogCoverPhoto: "stock-4", blogDate: "May 1, 2021"},
      ]);

      return {welcomeScreen, sampleBlogPosts, sampleBlogCards}
    }
  }
</script>

<style lang="scss" scoped>
  .blog-card-wrap {
    h3 {
      font-weight: 300;
      font-size: 28px;
      margin-bottom: 32px;
    }
  }
</style>
