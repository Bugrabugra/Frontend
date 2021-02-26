<template>
  <div class="word">
    <span class="letter" v-for="(letter, index) in letters" :key="index">
      {{correctLetters.includes(letter) ? letter : ""}}
    </span>
  </div>
</template>

<script>
  export default {
    name: "Word",

    props: {
      letters: {
        type: Array,
        required: true
      },

      correctLetters: {
        type: Array,
        default: () => []
      }
    }
  }
</script>

<style scoped>

</style>