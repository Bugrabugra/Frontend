<template>
  <v-container>
    <v-autocomplete
        :search-input.sync="address"
        :items="foundAddresses"
        item-text="description"
        item-value="reference"
        v-model="selected"
        @input="showSelected"
        dense
        label="Address"
    ></v-autocomplete>

    <div>
      <p class="font-weight-black">
        {{location.name}}
      </p>
    </div>
  </v-container>
</template>

<script>
  import axios from "axios";


  export default {
    name: "Address",

    data() {
      return {
        address: "",
        foundAddresses: [],
        selected: "",
        location: ""
      }
    },

    watch: {
      address() {
        if (this.address) {
          this.searchAddress();
        }
      }
    },

    methods: {
      async searchAddress() {
        const result = await axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${this.address}&key=AIzaSyAFlUfBZOnqaEaGUjlqvriDBgnredJzj2A`);
        this.foundAddresses = await result.data.predictions;
      },

      async showSelected() {
        const result = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${this.selected}&fields=name,geometry&key=AIzaSyAFlUfBZOnqaEaGUjlqvriDBgnredJzj2A`)

        const name = result.data.result.name;
        const coordinates = result.data.result.geometry.location

        this.location = {name: name, coordinates: coordinates};

        await this.$store.dispatch("setLocation", this.location);
      }
    }
  }
</script>

<style scoped>

</style>