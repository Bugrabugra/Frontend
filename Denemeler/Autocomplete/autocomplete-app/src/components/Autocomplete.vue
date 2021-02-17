<template>
  <div class="container">
    <!--Input-->
    <div class="input-group mb-3">
      <span class="input-group-text" id="basic-addon1">@</span>
      <input v-model="search" type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
    </div>

    <!--List-->
    <ul class="list-group">
      <li v-for="result in filteredResults" class="list-group-item list-group-item-dark">{{result.text}}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "Autocomplete",

    data() {
      return {
        results: [],
        search: ""
      }
    },

    computed: {
      filteredResults() {
        return this.results.filter(result => {
          return result.text.toLowerCase().includes(this.search.toLowerCase());
        })
      }
    },

    methods: {
      async getResults() {
        const response = await fetch("http://localhost:3000/results");
        this.results = await response.json();
      }
    },

    mounted() {
      this.getResults();
    }
  }
</script>

<style scoped>

</style>