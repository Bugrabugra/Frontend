<template>
  <div class="flex">
    <v-row justify="center">
      <v-col cols="9">
        <h2 class="float-left">Icons</h2>
        <v-text-field
            v-model="filter"
            class="float-right"
            label="Start typing to filter..."

            outlined
            dense
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="9">
        <div class="d-flex flex-wrap justify-start">
          <Icon v-for="icon in filteredIcons" :icon-name="icon"/>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  import Icon from "./Icon";
  export default {
    name: "IconsSection",

    components: {Icon},

    data() {
      return {
        filter: "",
        icons: [
          "account",
          "content-copy",
          "copyright",
          "baby-carriage",
          "bag-carry-on",
          "card-account-details",
          "cards-spade",
          "halloween",
          "smart-card-outline"
        ]
      }
    },

    computed: {
      filteredIcons() {
        return this.icons.filter(icon => {
          return icon.includes(this.filter);
        })
      }
    }
  }
</script>

<style scoped>

</style>