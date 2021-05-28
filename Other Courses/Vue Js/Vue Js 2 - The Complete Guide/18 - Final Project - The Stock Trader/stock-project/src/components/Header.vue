<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link class="navbar-brand" to="/">Stock Treader</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link to="/portfolio" active-class="active" tag="li"><a class="nav-link">Portfolio</a></router-link>
        </li>
        <li class="nav-item">
          <router-link to="/stocks" active-class="active" tag="li"><a class="nav-link">Stocks</a></router-link>
        </li>
      </ul>
      <ul class="navbar-nav">
        <li><a class="nav-link" href="" @click="endDay">End Day</a></li>
        <li class="nav-item dropdown" :class="{open: isDropdownOpen}" @click="isDropdownOpen = !isDropdownOpen">
          <a
              id="navbarDropdown"
              href="#"
              class="nav-link dropdown-toggle"
              data-toggle="dropdown"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
          >Save & Load <span class="caret"></span></a>

          <div class="dropdown-menu">
            <a class="dropdown-item" href="#" @click="saveData">Save Data</a>
            <a class="dropdown-item" href="#" @click="loadData">Load Data</a>
          </div>

        </li>
        <strong class="navbar-text float-right">Funds: {{funds | currency}}</strong>
 
      </ul>
    </div>
  </nav>
</template>

<script>
  import {mapActions} from "vuex";
  import {loadData} from "../store/actions";


  export default {
    name: "Header",

    data() {
      return {
        isDropdownOpen: false
      }
    },

    computed: {
      funds() {
        return this.$store.getters.funds;
      }
    },

    methods: {
      ...mapActions({
        randomizeStocks: "randomizeStocks",
        fetchData: "loadData"
      }),

      endDay() {
        this.randomizeStocks();
      },

      saveData() {
        const data = {
          funds: this.$store.getters.funds,
          stockPortfolio: this.$store.getters.stockPortfolio,
          stocks: this.$store.getters.stocks
        };
        this.$http.put("data.json", data);
      },

      loadData() {
        this.fetchData();
      }
    }
  }
</script>

<style scoped>

</style>