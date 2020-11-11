<template>
  <div class="hello">
    <h1>{{this.$store.state.count}}</h1>
    <button style="margin-right: 5px;" v-on:click="add(1)">+1</button>
    <button style="margin-right: 5px;" v-on:click="minus(1)">-1</button>
  </div>
</template>

<script>
  import {mapActions} from "vuex";


  export default {
    name: 'HelloWorld',

    methods: {
      ...mapActions({
        add: "aAdd",
        minus: "aMinus"
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
