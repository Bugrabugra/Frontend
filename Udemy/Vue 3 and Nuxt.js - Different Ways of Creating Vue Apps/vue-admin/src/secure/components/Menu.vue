<template>
  <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
    <div class="position-sticky pt-3">
      <ul class="nav flex-column">
        <li class="nav-item">
          <router-link to="/dashboard" active-class="active" class="nav-link">
            Dashboard
          </router-link>
        </li>

        <li class="nav-item" v-if="user.canView('users')">
          <router-link to="/users" active-class="active" class="nav-link">
            Users
          </router-link>
        </li>

        <li class="nav-item" v-if="user.canView('roles')">
          <router-link to="/roles" active-class="active" class="nav-link">
            Roles
          </router-link>
        </li>

        <li class="nav-item" v-if="user.canView('products')">
          <router-link to="/products" active-class="active" class="nav-link">
            Products
          </router-link>
        </li>

        <li class="nav-item" v-if="user.canView('orders')">
          <router-link to="/orders" active-class="active" class="nav-link">
            Orders
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
  import {computed} from "vue";
  import {useStore} from "vuex";


  export default {
    name: "Menu",

    setup() {
      const store = useStore();
      const user = computed(() => {
        return store.state.User.user;
      })

      return {user}
    }
  }
</script>

<style scoped>
  body {
    font-size: .875rem;
  }

  .feather {
    width: 16px;
    height: 16px;
    vertical-align: text-bottom;
  }

  /*
   * Sidebar
   */

  .sidebar {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 100; /* Behind the navbar */
    padding: 48px 0 0; /* Height of navbar */
    box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
  }

  @media (max-width: 767.98px) {
    .sidebar {
      top: 5rem;
    }
  }

  .sidebar-sticky {
    position: relative;
    top: 0;
    height: calc(100vh - 48px);
    padding-top: .5rem;
    overflow-x: hidden;
    overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
  }

  @supports ((position: -webkit-sticky) or (position: sticky)) {
    .sidebar-sticky {
      position: -webkit-sticky;
      position: sticky;
    }
  }

  .sidebar .nav-link {
    font-weight: 500;
    color: #333;
  }

  .sidebar .nav-link .feather {
    margin-right: 4px;
    color: #999;
  }

  .sidebar .nav-link.active {
    color: #007bff;
  }

  .sidebar .nav-link:hover .feather,
  .sidebar .nav-link.active .feather {
    color: inherit;
  }

  .sidebar-heading {
    font-size: .75rem;
    text-transform: uppercase;
  }

  /*
   * Navbar
   */

  .navbar-brand {
    padding-top: .75rem;
    padding-bottom: .75rem;
    font-size: 1rem;
    background-color: rgba(0, 0, 0, .25);
    box-shadow: inset -1px 0 0 rgba(0, 0, 0, .25);
  }

  .navbar .navbar-toggler {
    top: .25rem;
    right: 1rem;
  }

  .navbar .form-control {
    padding: .75rem 1rem;
    border-width: 0;
    border-radius: 0;
  }

  .form-control-dark {
    color: #fff;
    background-color: rgba(255, 255, 255, .1);
    border-color: rgba(255, 255, 255, .1);
  }

  .form-control-dark:focus {
    border-color: transparent;
    box-shadow: 0 0 0 3px rgba(255, 255, 255, .25);
  }

</style>
