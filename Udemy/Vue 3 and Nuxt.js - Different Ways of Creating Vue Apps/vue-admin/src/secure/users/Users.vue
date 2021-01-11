<template>
  <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    <div class="btn-toolbar mb-2 mb-md-0" v-if="user.canEdit('users')">
      <router-link to="/users/create" class="btn btn-sm btn-outline-secondary">Add</router-link>
    </div>
  </div>

  <div class="table-responsive">
    <table class="table table-striped table-sm">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{user.id}}</td>
          <td>{{user.first_name}} {{user.last_name}}</td>
          <td>{{user.email}}</td>
          <td>{{user.role.name}}</td>
          <td>
            <div class="btn-group mr-2" v-if="authenticatedUser.canEdit('users')">
              <router-link :to="`/users/${user.id}/edit`" class="btn btn-sm btn-outline-secondary">Edit</router-link>
              <a href="javascript:void(0)" class="btn btn-sm btn-outline-secondary" @click="del(user.id)">Delete</a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <Paginator :last-page="lastPage" @page-changed="load($event)"/>

</template>

<script lang="ts">
  import {ref, onMounted, computed} from "vue";
  import axios from "axios";
  import {Entity} from "@/interfaces/entity";
  import Paginator from "@/secure/components/Paginator.vue";
  import {useStore} from "vuex";


  export default {
    name: "Users",
    components: {Paginator},
    setup() {
      const users = ref([]);
      const lastPage = ref(0);
      const store = useStore();

      const authenticatedUser = computed(() => {
        return store.state.User.user;
      })

      const load = async (page = 1) => {
        const response = await axios.get(`users?page=${page}`);
        users.value = response.data.data;
        lastPage.value = response.data.meta.last_page;
      }

      const del = async (id: number) => {
        if (confirm("Are you sure you want to delete this record?")) {
          await axios.delete(`users/${id}`);

          users.value = users.value.filter((e: Entity) => e.id !== id);
        }
      }

      onMounted(load);

      return {
        users,
        lastPage,
        del,
        load,
        authenticatedUser
      }
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
