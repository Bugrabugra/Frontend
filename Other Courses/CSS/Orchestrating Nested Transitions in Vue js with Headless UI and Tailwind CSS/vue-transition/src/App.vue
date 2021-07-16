<template>
  <div class="min-h-screen bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center">
    <TransitionRoot
        as="template"
        :show="show"
        enter="transition transform duration-300 ease-out"
        enter-from="translate-x-4 opacity-0"
        enter-to="translate-x-0 opacity-100"
        leave="transition transform duration-300 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
    >
      <div class="bg-white rounded-2xl shadow-xl flex items-center p-4 w-96 space-x-4">
        <TransitionChild
            as="template"
            enter="transition transform duration-300 ease-out"
            enter-from="rotate-90 scale-50 opacity-0"
            enter-to="rotate-0 scale-100 opacity-100"
            leave="transition transform duration-300 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
        >
          <img
              class="h-16 w-16 rounded-full ring ring-offset-2 ring-indigo-500 ring-opacity-50"
              src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1049&q=80"
              alt=""
          >
        </TransitionChild>

        <TransitionChild
            enter="transition transform duration-300 ease-out"
            enter-from="translate-x-12 opacity-0"
            enter-to="translate-x-0 opacity-100"
            leave="transition transform duration-300 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
        >
          <h2 class="font-medium text-gray-900">Floofy McFloof</h2>
          <p class="mt-0.5 text-gray-500">Hey! I'm McFloof and I have been a very good boi this year!</p>
        </TransitionChild>
      </div>
    </TransitionRoot>
  </div>
  <div class="absolute top-0 my-4 inset-x-0 w-full flex items-center justify-center">
    <button
        class="bg-blue-200 px-4 py-1.5 rounded-lg text-sm font-medium text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 hover:bg-blue-100"
        @click="show = !show"
    >
      {{show ? "Hide" : "Show"}} profile
    </button>
  </div>
</template>

<script>
  import {ref} from "vue";
  import {TransitionRoot, TransitionChild} from "@headlessui/vue";


  export default {
    components: {TransitionRoot, TransitionChild},
    setup() {
      const show = ref(false);

      return {show}
    }
  }
</script>
