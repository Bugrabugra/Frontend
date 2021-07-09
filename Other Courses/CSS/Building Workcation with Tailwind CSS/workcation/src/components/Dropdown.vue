<template>
  <div class="relative">
    <button
        @click="toggle"
        @focus="buttonHasFocus = true"
        @blur="buttonHasFocus = false"
        type="button"
        class="block focus:outline-none"
    >
      <slot name="trigger" :hasFocus="buttonHasFocus" :isOpen="isOpen"/>
    </button>

    <div :class="[isOpen ? 'sm:block' : 'sm:hidden']">
      <button @click="isOpen = false" type="button" class="z-30 block fixed opacity-0 inset-0 w-full h-full cursor-default focus:outline-none"></button>
      <div class="sm:z-40 absolute right-0 ">
        <slot name="dropdown"/>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Dropdown",
    data() {
      return {
        isOpen: false,
        buttonHasFocus: false
      }
    },
    methods: {
      toggle() {
        this.isOpen = !this.isOpen;
      }
    },

    mounted() {
      const onEscape = (e) => {
        if (!this.isOpen || e.key !== "Escape") {
          return
        }
        console.log("closing");
        this.isOpen = false;
      }

      document.addEventListener("keydown", onEscape);

      this.$on("hook:destroyed", () => {
        document.removeEventListener("keydown", onEscape);
      })
    }
  }
</script>

<style scoped>

</style>