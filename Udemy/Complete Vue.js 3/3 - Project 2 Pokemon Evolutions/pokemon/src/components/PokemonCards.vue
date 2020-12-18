<template>
  <div class="cards">
    <Card
        v-for="pokemon in pokemons"
        @click="click(pokemon)"
        :class="{opace: selectedId && pokemon.id !== selectedId}"
        class="card"
    >
      <template v-slot:title>
        {{pokemon.name}}
      </template>

      <template v-slot:content>
        <img :src="pokemon.sprite">
      </template>

      <template v-slot:description>
        <div v-for="type in pokemon.types">
          {{type}}
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
  import Card from "./Card";


  export default {
    name: 'PokemonCards',

    components: {Card},

    props: {
      pokemons: {
        type: Array
      },

      selectedId: {
        type: Number
      }
    },

    methods: {
      click(pokemon) {
        this.$emit("pokemonClicked", pokemon)
      }
    }
  }
</script>

<style scoped>
  .cards {
    display: flex;
  }

  .opace {
    opacity: 0.5;
  }

  .card:hover {
    opacity: 1.0;
  }

  img {
    width: 100%;
  }
</style>
