<template>
  <div>
    <div v-for="user in users" :key="user.id">{{user.name}}</div>
    <div v-for="user in users2" :key="user.id">{{user.name}}</div>
  </div>
</template>

<script>
  import {ref, onMounted, reactive, toRefs} from "vue";


  export default {
    name: 'Home',

    setup() {
      const users = ref([]);
      const state = reactive({
        users2: []
      })

      const getUsers = () => {
        users.value = [
          {id: 1, name: "Alex"},
          {id: 2, name: "Billy"}
        ]

        state.users2 = [
          {id: 1, name: "Alex"},
          {id: 2, name: "Billy"}
        ]
      }

      onMounted(() => {
        getUsers()
      })

      return {users, ...toRefs(state)}
    }

  }
</script>
