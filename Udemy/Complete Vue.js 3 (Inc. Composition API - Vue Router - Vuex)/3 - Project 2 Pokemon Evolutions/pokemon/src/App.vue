<template>
  <PokemonCards
      style="position:relative; top: 30px;"
      :pokemons="starters"
      :selected-id="selectedId"
      @pokemonClicked="fetchEvolutions"
  />
  <PokemonCards :pokemons="evolutions"/>

</template>

<script>
  import Card from "./components/Card";
  import PokemonCards from "./components/PokemonCards";
  const api = "https://pokeapi.co/api/v2/pokemon";
  const STARTER_IDS = [1, 4, 7]


  export default {
    name: 'App',
    components: {
      PokemonCards,
      Card
    },

    data() {
      return {
        starters: [],
        evolutions: [],
        selectedId: null
      }
    },

    methods: {
      async fetchData(ids) {
        const response = await Promise.all(ids.map(id => fetch(`${api}/${id}`)));
        const data = await Promise.all(response.map(res => res.json()));
        return data.map(datum => ({
          id: datum.id,
          name: datum.name,
          sprite: datum.sprites.other["official-artwork"].front_default,
          types: datum.types.map(type => (type.type.name))
        }))
      },

      async fetchEvolutions(pokemon) {
        this.evolutions = await this.fetchData([pokemon.id + 1, pokemon.id + 2]);
        this.selectedId = pokemon.id;
      }
    },

    async created() {
      const starters = await this.fetchData(STARTER_IDS);
      this.starters = starters;
    }
  }
</script>

<style scoped>

</style>
