<template>
  <div class="home">
    <Search @searchText="search"/>
    <Table
        :newData="newData"
        :searchText="searchText"
    />
    <NewRow @newName="saveNewName"/>
  </div>
</template>

<script>
  import {ref} from "vue";
  import Table from "../components/Table";
  import NewRow from "../components/NewRow";
  import Search from "../components/Search";

  export default {
    name: 'Home',

    components: {
      Search,
      NewRow,
      Table,
    },

    setup() {
      const newData = ref("");
      const searchText = ref("");

      const saveNewName = (e) => {
        newData.value = e;
      }

      const search = (e) => {
        searchText.value = e;
      }

      return {saveNewName, newData, searchText, search}
    }
  }
</script>
