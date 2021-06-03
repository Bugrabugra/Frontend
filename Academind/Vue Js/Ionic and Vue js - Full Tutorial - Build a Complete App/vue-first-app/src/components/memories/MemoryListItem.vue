<template>
  <IonItem
      :router-link="`/memories/${memory.id}`"
      :key="memory.id"
  >
    <IonThumbnail slot="start">
      <IonImg :src="memory.image" :alt="memory.title"></IonImg>
    </IonThumbnail>

    <IonLabel>
      {{memory.title}}
    </IonLabel>

  </IonItem>
</template>

<script>
  import {IonItem, IonThumbnail, IonImg, IonLabel} from "@ionic/vue";


  export default {
    name: "MemoryListItem",

    components: {IonItem, IonThumbnail, IonImg, IonLabel},

    props: ["memory"],

    data() {
      return {}
    }
  }
</script>

<style scoped>

</style>