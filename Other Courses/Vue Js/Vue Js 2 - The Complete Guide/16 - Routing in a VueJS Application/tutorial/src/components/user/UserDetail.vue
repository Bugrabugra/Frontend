<template>
  <div>
    <h3>Some User Details</h3>
    <p>User loaded has ID: {{$route.params.id}}</p>
    <router-link
        class="btn btn-primary"
        tag="button"
        :to="link">Edit User</router-link>
  </div>
</template>

<script>
  export default {
    name: "UserDetail",

    data() {
      return {
        link: {
          name: 'UserEdit',
          params: {
            id: this.$route.params.id
          },
          query: {
            locale: 'en',
            q: 100
          },
          hash: "#data"
        }
      }
    },

    // Before mounted
    beforeRouteEnter(to, from, next) {
      next();
    }
  }
</script>