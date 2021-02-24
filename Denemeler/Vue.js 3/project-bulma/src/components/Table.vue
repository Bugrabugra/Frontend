<template>
  <div class="columns is-centered">
    <div class="column is-4 mt-3">
      <table class="table is-bordered is-narrow is-hoverable is-fullwidth">
        <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Action</th>
        </tr>
        </thead>

        <tbody>
        <tr v-for="name in filteredNames" :key="name.id">
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
  import {ref, reactive, watch, computed} from "vue";


  export default {
    name: "Table",

    props: {
      newData: {
        type: String,
        default: ""
      },

      searchText: {
        type: String,
        default: ""
      }
    },

    setup(props) {
      const rows = reactive([{id: 1, name: "Buğra"}, {id: 2, name: "Burcu"}]);
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

      const filteredNames = computed(() => {
        if (props.searchText.value !== "") {
          return rows.filter(row => {
            return row.name.toLowerCase().includes(props.searchText.toLowerCase());
          })
        } else {
          return rows.value;
        }
      })

      watch(() => props.newData, (newValue, oldValue) => {
        const lastId = rows[rows.length - 1].id;
        rows.push({id: lastId + 1, name: newValue})
      })

      return {rows, editing, toggleEditing, filteredNames}
    }
  }
</script>