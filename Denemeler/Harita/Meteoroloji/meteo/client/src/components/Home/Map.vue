<template>
  <!--left menu-->
  <!--<div class="absolute h-full z-20 top-5 left-5 flex space-y-2">-->
  <!--  <div class="w-80 h-full bg-gray-700 opacity-75">-->

  <!--  </div>-->
  <!--</div>-->

  <!--right menu-->
  <div class="absolute z-20 top-5 right-5 flex flex-col space-y-2">
    <!--search-->
    <button
        class="map-button"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </button>

    <!--logout-->
    <button
        class="map-button"
        @click="logout"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
    </button>

    <!--admin-->
    <router-link
        v-if="user && user.is_admin"
        class="map-button group"
        to="/admin"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    </router-link>

    <!--zoom in-->
    <button
        class="map-button"
        @click="zoomIn"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    </button>

    <!--zoom out-->
    <button
        class="map-button"
        @click="zoomOut"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M18 12H6" />
      </svg>
    </button>

    <!--weather-->
    <button
        class="map-button"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    </button>

    <!--warnings-->
    <button
        class="map-button"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    </button>

    <!--legend-->
    <button
        class="map-button"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
      </svg>
    </button>

    <!--risk points-->
    <button
        class="map-button"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    </button>

    <!--simulation-->
    <button
        class="map-button"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </button>
  </div>

  <!--map-->
  <div id="map" class="z-10 top-0 bottom-0 w-full absolute"></div>
</template>

<script setup>
  import mapboxgl from "mapbox-gl";
  import {ColumnLayer} from '@deck.gl/layers';
  import { MapboxLayer } from '@deck.gl/mapbox';
  import turfCircle from '@turf/circle';
  import {computed, onMounted, ref} from "vue";
  import {useStore} from "vuex";
  mapboxgl.accessToken = "pk.eyJ1IjoiYnV1cmEiLCJhIjoiY2tmZG15d3FpMDJiMTM0bXNjaTFnMzVqNSJ9.JN4zgUGd9sJ_j5enKZ4g9A"

  // store
  const store = useStore();
  store.dispatch("map/getPOIs");

  // references
  const map = ref(null)

  // computed
  const user = computed(() => {
    if (store.state.auth.userLoggedIn) {
      return store.state.auth.userLoggedIn;
    }
  });

  // methods
  const logout = async () => {
    await store.dispatch("auth/logoutUser");
  };

  const zoomIn = () => {
    map.value.zoomIn({duration: 1000});
  }

  const zoomOut = () => {
    map.value.zoomOut({duration: 1000});
  }

  const initMap = async () => {
    map.value = new mapboxgl.Map({
      container: 'map',
      interactive: true,
      style: 'mapbox://styles/buura/ckfdn1lxl6dt019npcbm0ypx6',
      center: [32.8, 39.9],
      zoom: 12,
      pitch: 40,
    });

    // const response = await axios.get(
    //     "https://ankara.iklim.co/api/v1/filter_dot/abb"
    // );

    // console.log(featureCollection.features);

    map.value.on('load', () => {
      const dotData = store.state.map.POIs;

      map.value.addSource('dot-names', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: dotData.map((item) => ({
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [item.lng, item.lat],
            },
            properties: {
              title: `${item.location}`,
              icon: 'harbor',
            },
          })),
        },
      });

      map.value.addSource('dot-circle', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: dotData.map((item) => {
            const center = [item.lng, item.lat];
            // https://www.usna.edu/Users/oceano/pguth/md_help/html/approx_equivalents.htm
            // approx 20 km
            let radius = 0.05;
            const options = { steps: 20, units: 'degrees' };
            // @ts-ignore
            const circle = turfCircle(center, radius, options);
            return {
              type: 'Feature',
              geometry: circle.geometry,
            };
          }),
        },
      });

      const layer = new MapboxLayer({
        id: 'dot-layer',
        type: ColumnLayer,
        data: dotData,
        wireframe: false,
        diskResolution: 20,
        opacity: 0.5,
        radius: 120,
        extruded: true,
        pickable: true,
        elevationScale: 1,
        getPosition: (d) => [d.lng, d.lat],
        // getFillColor: [203, 203, 203],
        getFillColor: [254, 178, 162],
        getLineColor: [0, 0, 0],
        getElevation: (d) => 2500,
        transitions: {
          // transition with a duration of 3000ms
          getFillColor: 3000,
        },
      })

      map.value.addLayer(layer);
    });



    // for (const { geometry, properties } of featureCollection.features) {
    //   const el = document.createElement('div');
    //   el.className = 'marker';
    //
    //   new mapboxgl.Marker(el)
    //       .setLngLat(geometry.coordinates)
    //       .setPopup(
    //           new mapboxgl.Popup({ offset: 25 }) // add popups
    //               .setHTML(
    //                   `<h3>${properties.id}</h3>`
    //               )
    //       )
    //       .addTo(map);
    // }

    // map.on('load', function() {
    //   map.addLayer({
    //     "id": "grnicy_ao_w1251_id",
    //     "type": "fill",
    //     "source": {
    //       "type": "vector",
    //       "scheme": "tms",
    //       // "tiles": ["http://194.58.104.84:8080/geoserver/gwc/service/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&LAYER=test:granicy_ao&STYLE=&TILEMATRIX=EPSG:900913:{z}&TILEMATRIXSET=EPSG:900913&FORMAT=application/x-protobuf;type=mapbox-vector&TILECOL={x}&TILEROW={y}"],
    //       "tiles": ["http://194.58.104.84:8080/geoserver/gwc/service/tms/1.0.0/test:grnicy_ao_w1251@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf"],
    //       "minzoom": 0,
    //       "maxzoom": 14
    //     },
    //     "source-layer": "grnicy_ao_w1251",
    //     "paint": {
    //       "fill-opacity": 0.6,
    //       "fill-color": "rgb(53, 175, 109)",
    //       'fill-outline-color': 'white'
    //     }
    //   });
    // });

    // map.on('click', 'grnicy_ao_w1251_id', function (e) {
    //   new mapboxgl.Popup()
    //       .setLngLat(e.lngLat)
    //       .setHTML(e.features[0].properties.county_nam)
    //       .addTo(map);
    // });
    //
    // map.on('mouseenter', 'grnicy_ao_w1251_id', function () {
    //   map.getCanvas().style.cursor = 'pointer';
    // });
    //
    // map.on('mouseleave', 'grnicy_ao_w1251_id', function () {
    //   map.getCanvas().style.cursor = '';
    // });
    //
    // map.addControl(new mapboxgl.NavigationControl());
    // map.addControl(new mapboxgl.ScaleControl());
    // map.addControl(new mapboxgl.FullscreenControl());
  };

  onMounted(() => {
    initMap();
  });

</script>

<style>

</style>
