<template>
  <div id="map"></div>
</template>

<script>
  import {useStore} from "vuex";
  import {computed, ref, watch, onMounted} from "vue";
  import L from "leaflet";
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
      let map = null;

      // methods
      const initMap = async () => {
        map = L.map("map");
        map.setView([40.876, 29.092], 15);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        const createGeoJSON = async (layerName, color) => {
          return L.geoJSON(await getFeatures(layerName), {
            style: (feature) => {
              return {color: color}
            },
            onEachFeature: (feature, layer) => {
              console.log("feature: ", feature)
              let popup = "";
              Object.keys(feature.properties).forEach(key => {
                popup += `
                  <p>
                    <span class="font-extrabold">${key}:</span>
                    ${feature.properties[key]}
                  </p>
                `
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
        const response = await axios.get(
            "http://localhost:3001/layer",
            {
              params: {
                layer: layerName
              }
            }
        );
        const data = await response.data;
        console.log(data);

        const featureCollection = [];
        data.forEach(feature => {
          const properties = {};

          Object.keys(feature).filter(key => {
            if (key !== "geom" && key !== "geometry") {
              console.log(key, feature[key])
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

      onMounted(async () => {
        await initMap();
      });

      watch(queryResult, change => {
        const result = Object.values(change).map(val => val.id);

        if (store.state.layer === "bina") {
          buildings.value.eachLayer(layer => {
            layer.setStyle({color: "black", fillColor: "black", fillOpacity: 0.2});
            if (result.includes(layer.feature.properties.id)) {
              layer.setStyle({color: "#42f5e9", fillColor: "#42f5e9", fillOpacity: 0.5});
            }
          })
        }

        if (store.state.layer === "mahalle") {
          neighborhoods.value.eachLayer(layer => {
            layer.setStyle({color: "black", fillColor: "black", fillOpacity: 0.2});
            if (result.includes(layer.feature.properties.id)) {
              layer.setStyle({color: "#42f5e9", fillColor: "#42f5e9", fillOpacity: 0.5});
            }
          })
        }
      });

      return {}
    }
  }
</script>