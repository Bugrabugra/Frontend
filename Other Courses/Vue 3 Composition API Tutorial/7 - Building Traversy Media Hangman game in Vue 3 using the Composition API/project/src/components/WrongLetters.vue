<template>
  <div class="wrong-letters-container">
    <div class="wrong-letters">
      <p v-show="wrongLetters.length > 0">Wrong</p>
      <span v-for="(letter, index) in wrongLetters" :key="index">
        {{letter}}
        {{index === wrongLetters.length - 1 ? "" : ", "}}
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "WrongLetters",

    props: {
      wrongLetters: {
        type: Array,
        default: () => []
      }
    }
  }
</script>

<style scoped>

</style>