<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-12">
        <button v-on:click="selectedComponent = 'Quote'">Quote</button>
        <button v-on:click="selectedComponent = 'Author'">Author</button>
        <button v-on:click="selectedComponent = 'New'">New</button>
        <hr>
        <p>{{selectedComponent}}</p>
        <keep-alive>
          <component :is="selectedComponent">
            <p>Default Content</p>
          </component>
        </keep-alive>
        <!--<Quote>-->
        <!--  <h2 slot="title">{{quoteTitle}}</h2>-->
        <!--  <p>A wonderful Quote</p>-->
        <!--</Quote>-->
      </div>
    </div>
  </div>
</template>

<script>
  import Quote from "./components/Quote";
  import Author from "./components/Author";
  import New from "./components/New";

  export default {
    name: 'App',

    components: {
      Quote: Quote,
      Author: Author,
      New: New
    },

    data() {
      return {
        quoteTitle: "The Quote",
        selectedComponent: "Quote"
      }
    }
  }
</script>

<style>

</style>
