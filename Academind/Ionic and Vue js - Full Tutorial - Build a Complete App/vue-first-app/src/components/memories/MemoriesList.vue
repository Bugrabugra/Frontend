<template>
  <IonList>
    <MemoryListItem
        v-for="memory in memories"
        :key="memory.id"
        :memory="memory"
    />
  </IonList>
</template>

<script>
  import {IonList} from "@ionic/vue";
  import MemoryListItem from "./MemoryListItem";


  export default {
    name: "MemoriesList",

    components: {IonList, MemoryListItem},

    props: ["memories"],

    data() {
      return {}
    }
  }
</script>

<style scoped>

</style>