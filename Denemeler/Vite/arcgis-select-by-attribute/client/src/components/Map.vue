<template>
  <div id="map"></div>
</template>

<script>
  import {ref, computed, watch, onMounted} from "vue";
  import {useStore} from "vuex";
  import axios from "axios";


  export default {
    name: "Map",
    setup() {
      // store
      const store = useStore();

      // computed
      const layers = computed(() => {
        return store.state.layers;
      });

      const queryResult = computed(() => {
        return store.state.result;
      });

      const layerList = {};
      const featuresCollectionArray = {};
      let map = null

      // methods
      const initMap = () => {
        // myMap.value = L.map("map");
        map = L.map("map");
        // myMap.value.setView([41, 29.040], 15);
        map.setView([41, 29.040], 15);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // layers.value.forEach(async (l) => {
        //   layerList[l.value] = L.geoJSON(null, {
        //     style: (feature) => {
        //       return l.value === 'bina' ? { color: 'red'} : {color: 'blue'};
        //     },
        //     onEachFeature: (feature, layer) => {
        //       let popup = ``
        //       Object.keys(feature.properties).forEach(key => {
        //         popup += `<p><span class="font-extrabold">${key}:</span> ${feature.properties[key]}</p>`
        //       });
        //       layer.bindPopup(popup);
        //     }
        //   }).addTo(map);
        //   layerList[l.value].addData(await getFeatures(l.value));
        // });
        //
        // const overlays = {};
        //
        // Object.keys(layerList).forEach(key => {
        //   overlays[key] = layerList[key];
        // })
        //
        // L.control.layers(null, overlays).addTo(map);

        layers.value.forEach(lay => {
          getFeatures(lay.name);
        });

        const overlays = {};

        Object.keys(featuresCollectionArray).forEach(key => {
          console.log(key);
          overlays[key] = featuresCollectionArray[key];
        })

        L.control.layers(null, overlays).addTo(map);
      };

      const getFeatures = async (layerName) => {
        const response = await axios.post(`http://localhost:3001/layer`, null, {
          params: {
            layer: layerName
          }
        });
        const data = await response.data;

        const featureCollection = [];
        data.forEach(feature => {
          const properties = {};

          Object.keys(feature).filter(key => {
            if (key !== "geom" && key !== "geometry") {
              return properties[key] = feature[key];
            }
          });

          const geoFeature = {
            type: "Feature",
            properties: properties,
            geometry: {
              type: JSON.parse(feature.geometry).type,
              coordinates: JSON.parse(feature.geometry).coordinates
            }
          }
          featureCollection.push(geoFeature);
        });

        featuresCollectionArray[layerName] = {type: "FeatureCollection", features: featureCollection};

        L.geoJSON(featuresCollectionArray[layerName], {
          style: (feature) => {
            return layerName === "Bina" ? {color: 'green'} : {color: 'blue'};
          },
          onEachFeature: (feature, layer) => {
            let popup = ``
            Object.keys(feature.properties).forEach(key => {
              popup += `<p><span class="font-extrabold">${key}:</span> ${feature.properties[key]}</p>`
            });
            layer.bindPopup(popup);
          }
        }).addTo(map);

        map.eachLayer(l => console.log(l))
      };

      // mounted
      onMounted(async () => {
        await initMap();
      });

      // watch
      watch(queryResult, value => {
        console.log(store.state.layer, value);
        // layerList[store.state.layer].setStyle({
        //   fillOpacity: 0.5
        // });
        console.log(layerList[store.state.layer])
        layerList[store.state.layer].eachLayer(layer => {

        })

      });

      return {}
    }
  }
</script>