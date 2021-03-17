<template>
  <q-page-container>
    <q-page>
      <div class="row">
       <div class="col col=10">
         <Map/>
       </div>

        <div class="col col-2">
          <SideMenu/>
        </div>

      </div>
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
      Map
    }
  }
</script>
