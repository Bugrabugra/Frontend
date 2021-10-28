<template>
  <div class="container">
    <h2>Change Query String</h2>
    <div class="input">
      <label for="fruit">Enter a fruit name</label>
      <input type="text" v-model="fruit" id="fruit">
    </div>

    <div v-if="correctAnswer">
      <p>{{message}}</p>
    </div>

    <button @click="changeQueryString">Update Query String</button>
    <button @click="removeQueryString">Remove Query String</button>
  </div>
</template>

<script>
  export default {
    name: "Home"
  }
</script>

<script setup>
  import {ref, watch} from "vue";
  import {useRoute, useRouter} from "vue-router";


  const router = useRouter();
  const route = useRoute();
  const fruit = ref("");
  const correctAnswer = ref(null);
  const message = ref("");

  const changeQueryString = () => {
    router.replace({query: {fruit: fruit.value.toLowerCase()}});
  };

  const removeQueryString = () => {
    router.replace({name: "Home"});
    fruit.value = "";
    correctAnswer.value = null;
  };

  watch(route, () => {
    if (route.query.fruit === "apple") {
      correctAnswer.value = !correctAnswer.value;
      message.value = "congrats, you found the lucky fruit!";
    } else {
      correctAnswer.value = null;
    }
  });
</script>

<style>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    max-width: 1200px;
    margin: 0 auto;
  }

  .input {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 300px;
    width: 100%;
  }

  input {
    width: 100%;
    font-size: 16px;
    margin-top: 5px;
  }

  button {
    margin-top: 5px;
  }
</style>
