<template>
  <div class="mx-4 my-4 w-full h-full">
    <Entry
        @click="select(entry)"
        v-for="entry in fetchedEntries"
        :key="entry._id"
        :state="entry"
    />

  </div>
</template>

<script>
  import {onMounted, computed} from "vue";
  import Entry from "./Entry.vue";
  import store from "../store"


  export default {
    name: "EntryList",
    components: {Entry},
    setup(props, context) {
      onMounted(() => {
        store.dispatch("setEntries")
      });

      const fetchedEntries = computed(() => {
        return store.getters.getEntries;
      })

      const select = (entry) => {
        context.emit("selectEntry", entry);
      }

      return {fetchedEntries, select}
    }
  }
</script>