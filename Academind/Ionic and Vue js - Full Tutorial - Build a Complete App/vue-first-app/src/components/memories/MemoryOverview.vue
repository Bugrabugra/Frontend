<template>
  <IonImg :src="image" :alt="title"/>
  <h2 class="ion-text-center">{{title}}</h2>
  <p class="ion-text-center">{{description}}</p>
</template>

<script>
  import {IonImg} from "@ionic/vue";


  export default {
    name: "MemoryOverview",

    components: {IonImg},

    props: ["title", "image", "description"],

    data() {
      return {}
    }
  }
</script>

<style scoped>

</style>