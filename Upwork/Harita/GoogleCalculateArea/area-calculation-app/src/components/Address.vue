<template>
  <v-container>
    <input type="text" placeholder="Address Search" ref="origin" id="address"/>

    <div style="margin-top: 15px;">
      <p class="font-weight-black pb-0 ma-0">
        {{selectedLongAddress}}
      </p>
    </div>

  </v-container>
</template>

<script>
  import {loadedGoogleMapsAPI} from "../main";


  export default {
    name: "Address",

    mounted() {
      loadedGoogleMapsAPI.then(()=>{
        const autocomplete = new window.google.maps.places.Autocomplete(this.$refs["origin"], {
          fields: ["geometry", "name", "formatted_address"],
        });

        autocomplete.addListener("place_changed", () => {
          this.$refs["origin"].value = "";
          const place = autocomplete.getPlace();
          this.selectedLongAddress = place.formatted_address;
          const name = place.name;
          const coordinates = place.geometry.location;

          this.location = {name: name, coordinates: coordinates};

          this.$store.dispatch("setLongAddress", this.selectedLongAddress)
          this.$store.dispatch("setLocation", this.location);
          console.log(place);
        })
      });
    },

    data() {
      return {
        location: "",
        selectedLongAddress: ""
      }
    },
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