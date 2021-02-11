<template>
  <v-container>
    <!--Address search bar-->
    <input type="text" placeholder="Address Search" ref="origin" id="address"/>

    <!--The chosen address-->
    <div style="margin-top: 15px;">
      <p class="font-weight-black pb-0 ma-0">
        {{address}}
      </p>
    </div>

  </v-container>
</template>

<script>
  import {loadedGoogleMapsAPI} from "../main";


  export default {
    name: "Address",

    mounted() {
      // Initializing the Places API with 3 fields which is supposed to be free
      loadedGoogleMapsAPI.then(()=>{
        const autocomplete = new window.google.maps.places.Autocomplete(this.$refs["origin"], {
          fields: ["geometry", "name", "formatted_address"],
        });

        // When user chooses an address
        autocomplete.addListener("place_changed", () => {
          this.$refs["origin"].value = "";
          const place = autocomplete.getPlace();
          // Setting the Long Address for request form
          this.selectedLongAddress = place.formatted_address;
          // Setting the Short Address for the marker
          const name = place.name;
          const coordinates = place.geometry.location;

          this.location = {name: name, coordinates: coordinates};

          // Setting the Long Address to the store
          this.$store.dispatch("setLongAddress", this.selectedLongAddress)

          // Setting the Short Address and Alias to the store
          this.$store.dispatch("setLocation", this.location);
        })
      });
    },

    data() {
      return {
        location: "",
        selectedLongAddress: ""
      }
    },

    computed: {
      address() {
        return this.$store.state.longAddress;
      }
    }
  }
</script>

<style scoped>
  #address {
    width: 100%;
    padding: 5px;
    border: #173c00 1px solid;
    border-radius: 5px;
  }
</style>