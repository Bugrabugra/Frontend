<template>
  <q-page-container>
    <q-page class="flex flex-center">
      <Map style="position:relative;"/>
      <SideMenu style="position:absolute; right: 50px;"/>
    </q-page>
  </q-page-container>
</template>

<script>
  import Map from "components/Map";
  import SideMenu from "components/SideMenu";


  export default {
    name: 'PageIndex',
    components: {
      SideMenu,
      Map}
  }
</script>
