<template>
  <div class="about flex flex-column center">
    <div class="bg-red-300 absolute inset-0 z-0" v-on:click="modal = false">

    </div>

    <input
        type="text"
        v-model="state"
        class="bg-gray-300 px-4 py-2 z-10"
        autocomplete="off"
        v-on:input="filterStates"
        v-on:focus="modal = true"
    >
    <div v-if="filteredStates && modal" class="z-10">
      <ul class="w-48 bg-gray-800 text-white">
        <li
            v-for="filteredState in filteredStates"
            v-bind:key="filteredState.id"
            v-on:click="setState(filteredState.city)"
            class="py-2 border-b cursor-pointer"
        >{{filteredState.city}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        modal: false,
        state: "",
        states: [
          {id: 1, city: "Florida"},
          {id: 2, city: "Alabama"},
          {id: 3, city: "Alaska"},
          {id: 4, city: "Texas"}
        ],
        filteredStates: []
      }
    },

    methods: {
      filterStates() {
        if (this.state.length === 0) {
          this.filteredStates = this.states;
        }
        this.filteredStates = this.states.filter(state => {
          return state.city.toLowerCase().startsWith(this.state.toLowerCase());
        })
      },

      setState(state) {
        this.state = state;
        this.modal = false;
      }
    },

    mounted() {
      this.filterStates();
    }
  }
</script>
