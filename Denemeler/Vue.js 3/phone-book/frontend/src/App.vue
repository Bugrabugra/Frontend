<template>
  <div class="min-h-screen flex flex-col items-center bg-gradient-to-b from-blue-900 to-blue-500">
    <div class="max-w-3xl bg-blue-100 flex justify-between w-11/12 h-64 rounded-lg mt-10 shadow-xl">
      <EntryForm :entry="entryObj"/>
    </div>

    <div class="max-w-3xl bg-blue-100/25 flex justify-between w-11/12 h-full rounded-lg mt-10 shadow-xl">
      <EntryList @selectEntry="printEntry"/>
    </div>
  </div>
</template>

<script>
  import EntryForm from "./components/EntryForm.vue";
  import EntryList from "./components/EntryList.vue";
  import {ref} from "vue";

  export default {
    components: {
      EntryList,
      EntryForm
    },
    setup() {
      const entryObj = ref({});

      const printEntry = (entry) => {
        entryObj.value = entry;
      }

      return {printEntry, entryObj}
    }
  }
</script>
