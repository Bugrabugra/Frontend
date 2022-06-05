<script setup>
  import { useUserStore } from "./stores/users";
  import { ref } from "vue";


  const userStore = useUserStore();

  const userInput = ref({
    name: "",
    email: ""
  });
  const sort = ref(false);

  const CreateUser = () => {
    if (!userInput.value.name || !userInput.value.email) {
      return alert("Please enter both name and email")
    }
    userStore.create(userInput.value);

    userInput.value = {
      name: "",
      email: ""
    }
  };

  const DeleteUser = id => {
    userStore.delete(id);
    alert("User Deleted with id: " + id);
  };

</script>

<template>
  <main>
    <h1>Team Manager</h1>
    <form @submit.prevent="CreateUser">
      <input
          v-model="userInput.name"
          placeholder="e.g. Naruto Uzumaki"
          type="text"
      >
      <input
          v-model="userInput.email"
          placeholder="e.g. hokage@ninja.com"
          type="email"
      >
      <input type="submit" value="Create User">
    </form>

    <label><span>Sort</span><input v-model="sort" type="checkbox"></label>

    <div v-if="!sort" class="users">
      <div v-for="user in userStore.users" class="user">
        <div>ID: {{ user.id }}</div>
        <h3>{{ user.name }}</h3>
        <p>{{ user.email }}</p>
        <button @click="DeleteUser(user.id)">Delete</button>
      </div>
    </div>

    <div v-else class="users">
      <div v-for="user in userStore.usersByName" class="user">
        <div>ID: {{ user.id }}</div>
        <h3>{{ user.name }}</h3>
        <p>{{ user.email }}</p>
        <button @click="DeleteUser(user.id)">Delete</button>
      </div>
    </div>
  </main>
</template>

<style>

</style>
