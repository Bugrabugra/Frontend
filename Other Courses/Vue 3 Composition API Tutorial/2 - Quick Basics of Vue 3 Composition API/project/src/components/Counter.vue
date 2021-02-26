<template>
  <div>
    <button @click="increment">Counter</button>
    <div>{{counter}}</div>
    <div>{{arrayOfEmojis}}</div>
  </div>
</template>

<script>
  import {ref, onMounted, watch, computed} from "vue";


  export default {
    name: "Counter",

    props: {
      emoji: {
        type: String,
        default: "O"
      }
    },

    setup(props) {
      console.log(props.emoji);

      onMounted(() => {
        console.log(`Counter component has been mounted!`)
      })

      const counter = ref(0);
      const increment = () => counter.value++;

      watch(counter, (current, previous) => {
        if (current === 5) {
          console.log("You have clicked five times!")
        }
      })

      const arrayOfEmojis = computed(() => {
        return Array.from(new Array(counter.value), () => {
          return props.emoji
        }).join(" ")
      })

      return {counter, increment, arrayOfEmojis}
    }
  }
</script>

<style scoped>

</style>