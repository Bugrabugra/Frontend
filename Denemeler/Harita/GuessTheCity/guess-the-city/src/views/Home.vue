<template>
  <div class="home">
    <v-row no-gutters>
      <!--Menu-->
      <!--<v-col cols="2">-->
      <!--  <Menu v-on:eventCountrySearch="passProp"/>-->
      <!--</v-col>-->

      <!--Map-->
      <v-col cols="12">
        <Map ref="referenceMap"/>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  import Map from "../components/Map";
  // import Menu from "../components/Menu";


  export default {
    name: 'Home',

    components: {
      "Map": Map,
      // "Menu": Menu
    },

    methods: {
      // passProp(payload) {
      //   this.$refs.referenceMap.zoomToCountry(payload);
      // }
    }
  }
</script>
