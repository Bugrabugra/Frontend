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

      // references
      const buildings = ref(null);
      const neighborhoods = ref(null);

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
      const initMap = async () => {
        // myMap.value = L.map("map");
        map = L.map("map");
        // myMap.value.setView([41, 29.040], 15);
        map.setView([41, 29.040], 15);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        const createGeoJSON = async (layerName, color) => {
          return L.geoJSON(await getFeatures(layerName), {
            style: (feature) => {
              return {color: color};
            },
            onEachFeature: (feature, layer) => {
              let popup = ``
              Object.keys(feature.properties).forEach(key => {
                popup += `<p><span class="font-extrabold">${key}:</span> ${feature.properties[key]}</p>`
              });
              layer.bindPopup(popup);
            }
          }).addTo(map);
        }

        neighborhoods.value = await createGeoJSON("mahalle", "purple");
        buildings.value = await createGeoJSON("bina", "black");

        L.control.layers(null, {
          "Bina": buildings.value,
          "Mahalle": neighborhoods.value
        }).addTo(map);
      };

      const getFeatures = async (layerName) => {
        const response = await axios.get(`http://localhost:3001/layer`, {
          params: {
            layer: layerName
          }
        });
        const data = await response.data;
        console.log(data)
        
        

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

        return {type: "FeatureCollection", features: featureCollection};
      };

      // mounted
      onMounted(async () => {
        await initMap();
      });

      // watch
      watch(queryResult, change => {
        const result = Object.values(change).map(val => {
          return val.id
        });

        if (store.state.layer === "bina") {
          buildings.value.eachLayer(layer => {
            layer.setStyle({color: "black", fillColor: "black", fillOpacity: 0.2})
            if (result.includes(layer.feature.properties.id)) {
              layer.setStyle({color: "#42f5e9", fillColor: "#42f5e9", fillOpacity: 0.5})
            }
          })
        }

        if (store.state.layer === "mahalle") {
          neighborhoods.value.eachLayer(layer => {
            layer.setStyle({color: "purple", fillColor: "purple", fillOpacity: 0.2})
            if (result.includes(layer.feature.properties.id)) {
              layer.setStyle({color: "#42f5e9", fillColor: "#42f5e9", fillOpacity: 0.5})
            }
          })
        };



      });

      return {}
    }
  }
</script>