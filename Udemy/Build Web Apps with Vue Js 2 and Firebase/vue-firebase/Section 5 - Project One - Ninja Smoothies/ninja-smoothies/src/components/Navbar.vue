<template>
  <div class="navbar">
    <nav class="nav-extended indigo darken-2">
      <div class="nav-content">
        <router-link v-bind:to="{name: 'Index'}">
          <span class="nav-title">Ninja Smoothies</span>
        </router-link>
        <a href="" class="btn-floating btn-large halfway-fab">
          <router-link v-bind:to="{name: 'AddSmoothie'}">
            <!--Google fonts düzeltiyor-->
            <i class="material-icons">add</i>
          </router-link>
        </a>
      </div>
    </nav>
  </div>
</template>

<script>
  export default {
    name: "Navbar",
    data() {
      return {

      }
    }
  }
</script>

<style scoped>
  .navbar nav {
    padding: 0 20px;
  }
</style>
