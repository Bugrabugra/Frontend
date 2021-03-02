<template>
  <div>
    <User v-for="user in users" :key="user.id" :user="user"/>
  </div>
</template>

<script>
  import {ref} from "vue";
  import User from "./User";


  export default {
    name: 'Home',

    components: {User},

    setup() {
      const users = ref([
        {id: 1, name: "Alex", points: 10},
        {id: 2, name: "Billy", points: 20}
      ])

      setTimeout(() => {
        users.value = users.value.map(user => {
          if (user.id === 1) {
            user.points = 1000;
          }

          return user
        })
      }, 2000)

      return {users}
    }
  }
</script>
