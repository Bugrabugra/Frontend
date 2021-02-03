<template>
  <v-container>
    <v-autocomplete
        :search-input.sync="address"
        :items="foundAddresses"
        item-text="description"
        v-model="selected"
        @change="showSelected"
        @click:clear="clearList"
        label="Address"
        return-object
        no-filter
        clearable
        dense
    ></v-autocomplete>

    <div>
      <p class="font-weight-black">
        {{this.selected.description}}
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
        location: "",
        selectedLongAddress: ""
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
        if (this.address) {
          const result = await axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${this.address}&key=AIzaSyAFlUfBZOnqaEaGUjlqvriDBgnredJzj2A`);
          this.foundAddresses = await result.data.predictions;
        }
      },

      async showSelected() {
        console.log(this.selected)
        if (this.selected !== null) {
          const result = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${this.selected.place_id}&fields=name,geometry&key=AIzaSyAFlUfBZOnqaEaGUjlqvriDBgnredJzj2A`)

          const name = result.data.result.name;
          const coordinates = result.data.result.geometry.location;

          this.location = {name: name, coordinates: coordinates};
          this.selectedLongAddress = this.selected.description;

          await this.$store.dispatch("setLongAddress", this.selectedLongAddress)
          await this.$store.dispatch("setLocation", this.location);
        }
      },

      clearList() {

      }
    }
  }
</script>