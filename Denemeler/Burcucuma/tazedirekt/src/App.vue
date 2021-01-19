<template>
  <div id="app">

  </div>
</template>

<script>
  import axios from "axios";


  export default {
    name: 'App',
    data() {
      return {
        baseURL: "https://www.tazedirekt.com/rest/products/search?category-id="
      }
    },

    components: {

    },

    methods: {
      async fetcher(categoryId) {
        const response = await axios.get(`${this.baseURL}${categoryId}`);
        const data = await response.data.data;
        const categoryName = data.metaData.title;
        console.log(categoryId, categoryName);
        const storeProductInfos = data.storeProductInfos;
        console.log(response.data);
        let counter = 0
        storeProductInfos.forEach(storeProductInfo => {
          counter++;
          console.log(`${counter} - (${storeProductInfo.shownPrice / 100} TL) - ${storeProductInfo.brand.name.toUpperCase()} - ${storeProductInfo.name} `)
        })
      },
    },

    mounted() {
      for (let i = 1; i < 5; i++) {
        this.fetcher(i);
      }

    }
  }
</script>

<style>

</style>
