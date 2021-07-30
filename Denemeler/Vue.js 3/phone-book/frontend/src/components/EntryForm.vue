<template>
  <div class="w-2/3 mx-4 my-4 bg-blue-400 rounded-lg">
    <div class="px-4 py-4 h-full flex flex-col justify-around">
      <div class="flex flex-col">
        <label class="text-2xl font-semibold text-gray-700" for="name">Name</label>
        <input
            class="h-10 px-4 py-4 text-2xl text-gray-500 rounded-lg bg-gray-300 focus:bg-gray-50 focus:outline-none focus:shadow-lg hover:bg-gray-50 hover:shadow-lg appearance-none transition placeholder-gray-400"
            type="text"
            id="name"
            v-model="name"
        >
      </div>

      <div class="flex flex-col">
        <label class="text-2xl font-semibold text-gray-700" for="phone-number">Number</label>
        <input
            class="h-10 px-4 py-4 text-2xl text-gray-500 rounded-lg bg-gray-300 focus:bg-gray-50 focus:outline-none focus:shadow-lg hover:bg-gray-50 hover:shadow-lg appearance-none transition placeholder-gray-400"
            type="text"
            id="phone-number"
            v-model="phoneNumber"
        >
      </div>
    </div>
  </div>

  <div class="w-1/3 mx-4 -ml-2 my-4 px-4 py-4 bg-gray-700 rounded-lg flex flex-col items-center justify-around">
    <button
        @click="create"
        class="h-1/2 mb-4 px-4 py-2 bg-green-400 rounded-lg w-full font-semibold text-gray-700 hover:bg-green-600 hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-400 disabled:hover:text-gray-700"
        :disabled="disabledCreate"
    >
      Create
    </button>

    <button
        @click="update(entry._id)"
        class="h-1/2 px-4 py-2 bg-yellow-400 rounded-lg w-full font-semibold text-gray-700 hover:bg-yellow-600 hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-yellow-400 disabled:hover:text-gray-700"
        :disabled="disabledUpdate"
    >
      Update
    </button>
  </div>

</template>

<script>
  import {ref, watch} from "vue";
  import store from "../store";


  export default {
    name: "EntryForm",
    props: {
      entry: Object
    },
    setup(props) {
      const name = ref("");
      const phoneNumber = ref();
      const disabledCreate = ref(false);
      const disabledUpdate = ref(true);

      const create = () => {
        store.dispatch("createEntry", {
          name: name.value,
          phoneNumber: phoneNumber.value
        });

        name.value = "";
        phoneNumber.value = null;
      }

      const update = (id) => {
        store.dispatch("updateEntry", {
          entry: {
            name: name.value,
            phoneNumber: phoneNumber.value
          },
          id: id
        });

        name.value = "";
        phoneNumber.value = null;
        disabledCreate.value = false;
        disabledUpdate.value = true;
      }

      watch(() => props.entry, (data) => {
        name.value = data.name;
        phoneNumber.value = data.phoneNumber;
        disabledUpdate.value = false;
        disabledCreate.value = true;
      });

      watch(() => store.getters.getClear, () => {
        name.value = "";
        phoneNumber.value = null;
      })

      return {name, phoneNumber, create, update, props, disabledCreate, disabledUpdate}
    }
  }
</script>