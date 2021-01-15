<template>
  <v-text-field
      class="mt-1 expanding-search"
      placeholder="Search"
      prepend-inner-icon="mdi-magnify"
      filled
      dense
      clearable
  ></v-text-field>
</template>

<script>
  export default {
    name: "Search"
  }
</script>

<style lang="sass">
  .expanding-search
    .v-input__slot
      &:before, &:after
        border-color: transparent !important
</style>