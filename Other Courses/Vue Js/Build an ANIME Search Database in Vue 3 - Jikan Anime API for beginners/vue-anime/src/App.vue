<template>
  <div class="app">
    <header>
      <h1>The<strong>Anime</strong>Database</h1>

      <form class="search-box" @submit.prevent="handleSearch">
        <input
            type="search"
            class="search-field"
            placeholder="Search for an anime..."
            v-model="searchQuery"
            required
        >
      </form>
    </header>

    <main>
      <div class="cards" v-if="animeList.length > 0">
        <Card
            v-for="anime in animeList"
            :key="anime.mal_id"
            :anime="anime"
        />
      </div>

      <div v-else class="no-results">
        <h3>Sorry, we have no results...</h3>
      </div>
    </main>
  </div>
</template>

<script>
  import Card from "./components/Card";
  import {ref} from "vue";


  export default {
    name: 'App',
    components: {Card},
    setup() {
      const searchQuery = ref("");
      const animeList = ref([]);

      const handleSearch = async () => {
        const response = await fetch(`https://api.jikan.moe/v3/search/anime?q=${searchQuery.value}`);
        const data = await response.json();
        animeList.value = data.results;

        searchQuery.value = "";
      }

      return {searchQuery, handleSearch, animeList}
    }
  }
</script>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    font-family: "Fira Sans", sans-serif;
  }

  a {
    text-decoration: none;
  }

  header {
    padding-top: 50px;
    padding-bottom: 50px;

    h1 {
      color: #888;
      font-size: 42px;
      font-weight: 400;
      text-align: center;
      text-transform: uppercase;
      margin-bottom: 30px;

      strong {
        color: #313131;
      }

      &:hover {
        color: #313131;
      }
    }

    .search-box {
      display: flex;
      justify-content: center;
      padding-left: 30px;
      padding-right: 30px;

      .search-field {
        appearance: none;
        border: none;
        outline: none;

        background: #f3f3f3 none;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);

        display: block;
        width: 100%;
        max-width: 600px;
        padding: 15px;
        border-radius: 8px;

        color: #313131;
        font-size: 20px;

        transition: 0.4s;
        
        &::placeholder {
          color: #aaa;
        }
        
        &:focus, &:valid {
          color: #fff;
          background-color: #313131;
          box-shadow: 0 0 0 rgba(0, 0, 0, 0.15);
        }
      }
    }
  }

  main {
    max-width: 1200px;
    margin: 0 auto;
    padding-left: 30px;
    padding-right: 30px;

    .cards {
      display: flex;
      flex-wrap: wrap;
      margin: 0 -8px;
    }
  }
</style>
