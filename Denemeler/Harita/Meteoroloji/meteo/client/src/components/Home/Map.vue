<template>
  <div id="map" class="top-0 bottom-0 w-full absolute">
    <button class="top-20 right-20 bg-red-400 px-2 py-1 rounded-md">
      Admin
    </button>
  </div>
</template>

<script setup>
  import mapboxgl from "mapbox-gl";
  import {ColumnLayer} from '@deck.gl/layers';
  import { MapboxLayer } from '@deck.gl/mapbox';
  import turfCircle from '@turf/circle';
  import {onMounted} from "vue";
  import {useStore} from "vuex";
  mapboxgl.accessToken = "pk.eyJ1IjoiYnV1cmEiLCJhIjoiY2tmZG15d3FpMDJiMTM0bXNjaTFnMzVqNSJ9.JN4zgUGd9sJ_j5enKZ4g9A"

  // store
  const store = useStore();
  store.dispatch("map/getPOIs");

  const initMap = async () => {
    const map = new mapboxgl.Map({
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

    map.on('load', () => {
      const dotData = store.state.map.POIs;

      map.addSource('dot-names', {
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

      map.addSource('dot-circle', {
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

      map.addLayer(layer);




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
  .marker {
    background-color: aqua;
    background-size: cover;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
  }
  .mapboxgl-popup {
    max-width: 200px;
  }
  .mapboxgl-popup-content {
    text-align: center;
    font-family: 'Open Sans', sans-serif;
  }
</style>
