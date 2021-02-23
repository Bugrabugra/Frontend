<template>
  <div class="columns is-centered">
    <div class="column is-4 mt-6">
      <table class="table is-bordered is-narrow is-hoverable is-fullwidth">
        <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Action</th>
        </tr>
        </thead>

        <tbody>
        <tr v-for="name in names" :key="name.id">
          <th>{{name.id}}</th>
          <td>
            <input v-if="editing === name.id" v-model="name.name" class="input is-info border" type="text">
            <input v-else v-model="name.name" class="input is-primary is-half has-background-grey-light" type="text" readonly>
          </td>
          <td>
            <button v-if="editing !== name.id" @click="toggleEditing(name.id)" class="is-large">Edit</button>
            <button v-else @click="toggleEditing(name.id)" class="is-block">Done</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>

</template>

<script>
  import {ref} from "vue";


  export default {
    name: "Table",

    setup() {
      const names = ref([{id: 1, name: "Buğra"}, {id: 2, name: "Burcu"}]);
      const editing = ref(0);

      const toggleEditing = (id) => {
        if (editing.value === 0) {
          editing.value = id;
        } else if (editing.value !== 0) {
          editing.value = 0;
        } else {
          editing.value = 0;
        }
      };

      return {names, editing, toggleEditing}
    }
  }
</script>