<template>
  <div class="px-4 py-4 rounded-lg bg-white/30 w-full mb-4 last:mb-0 cursor-pointer shadow-lg">
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <img
            src="https://www.pphfoundation.ca/wp-content/uploads/2018/05/default-avatar.png"
            alt="avatar"
            class="rounded-full h-12 w-12 mr-4 shadow-lg"
        >

        <div>
          <h2 class="text-2xl font-bold text-gray-700">{{state.name}}</h2>
          <p class="text-xl font-semibold text-gray-500">{{formattedPhoneNumber}}</p>
        </div>
      </div>

      <div>
        <button @click.stop="deleteEntry(state._id)">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

    </div>



  </div>
</template>

<script>
  import store from "../store";
  import {computed} from "vue";


  export default {
    name: "Entry",
    props: {
      state: Object
    },
    setup(props, context) {
      const formattedPhoneNumber = computed(() => {
        return `${String(props.state.phoneNumber).slice(0, 3)}-${String(props.state.phoneNumber).slice(3)}`
      })

      const deleteEntry = (id) => {
        store.dispatch("deleteEntry", id);
      }

      return {deleteEntry, formattedPhoneNumber}
    }
  }
</script>