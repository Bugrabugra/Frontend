<template>
  <BaseLayout page-title="All Memories">
    <template v-slot:actions-end>
      <IonButton router-link="/memories/add">
        <IonIcon
            slot="icon-only"
            :icon="add"
        />
      </IonButton>
    </template>
    <MemoriesList :memories="memories"/>
  </BaseLayout>
</template>

<script>
  import MemoriesList from "../components/memories/MemoriesList";
  import {IonButton, IonIcon} from "@ionic/vue";
  import {add} from "ionicons/icons"


  export default {
    name: "MemoriesPage",

    components: {MemoriesList, IonButton, IonIcon},

    data() {
      return {
        add
      }
    },

    computed: {
      memories() {
        return this.$store.getters.memories;
      }
    }
  }
</script>

<style scoped>

</style>