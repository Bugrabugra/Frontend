<template>
  <div>
    <div id="editMap" style="height: 88vh;"></div>
    <EditTerritory
        style="height: 10vh; margin-bottom: 20px;"
        @evtSaveTerritory="saveTerritory"
    />
    <EditField
        style="height: 10vh;"
        @evtSaveField="saveField"
        @evtPlaceField="placeField"
    />
  </div>
</template>

<script>
  import EditTerritory from "../components/EditTerritory";
  import EditField from "../components/EditField";


  export default {
    name: 'EditMap',

    components: {
      EditField,
      EditTerritory
    },

    data() {
      return {
        map: null,
        drawingManager: null,
        geometry: null,
        territories: [],
        fields: []
      }
    },

    mounted() {
      this.initMap();
    },

    methods: {
      // This example creates a simple polygon representing the Bermuda Triangle.
      initMap() {
        const _this = this;
        setTimeout(() => {
          _this.map = new window.google.maps.Map(document.getElementById("editMap"), {
            zoom: 5,
            center: { lat: 24.886, lng: -70.268 },
            mapTypeId: "terrain",
          });

          _this.getTerritories();
          _this.getFields();

          _this.drawingManager = new window.google.maps.drawing.DrawingManager({
            drawingControl: true,
            drawingControlOptions: {
              position: window.google.maps.ControlPosition.BOTTOM_CENTER,
              drawingModes: [
                window.google.maps.drawing.OverlayType.POLYGON,
              ],
            },
          });

          this.drawingManager.setMap(_this.map);

          window.google.maps.event.addListener(_this.drawingManager, 'polygoncomplete', function(polygon) {
            _this.geometry = window.google.maps.geometry.encoding.encodePath(polygon.getPath());
            console.log(window.google.maps.geometry.encoding.encodePath(polygon.getPath()));
          });
        }, 1000)
      },

      getTerritories() {
        (async () => {
          const res = await fetch(`http://localhost:3000/territories`, {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
          })
          if (res.status === 200) {
            this.territories = await res.json();

            this.territories.forEach(territory => {
              const feature = {
                geometry: new window.google.maps.Data.Polygon([window.google.maps.geometry.encoding.decodePath(territory.geometry)]),
              }
              let color = "#FF0000";

              let data = new window.google.maps.Data();
              data.add(feature)
              data.setMap(this.map);

              data.setStyle(function(feature) {
                return /** @type {!google.maps.Data.StyleOptions} */ ({
                  fillColor: color,
                  strokeColor: "#323131",
                  strokeWeight: 2,
                  editable: true
                });
              });
            })
          }
        })();
      },

      getFields() {
        (async () => {
          const res = await fetch(`http://localhost:3000/fields`, {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
          })
          if (res.status === 200) {
            this.fields = await res.json();

            this.fields.forEach(field => {
              const feature = {
                geometry: new window.google.maps.Data.Polygon([window.google.maps.geometry.encoding.decodePath(field.geometry)]),
              }
              let color = "#00d9ff";

              let data = new window.google.maps.Data();
              data.add(feature)
              data.setMap(this.map);

              data.setStyle(function(feature) {
                return /** @type {!google.maps.Data.StyleOptions} */ ({
                  fillColor: color,
                  strokeColor: "#323131",
                  strokeWeight: 2,
                  editable: true
                });
              });
            })
          }
        })();
      },

      saveTerritory(payload) {
        payload = {...payload, geometry: this.geometry};
        console.log(payload);

        (async () => {
          const res = await fetch("http://localhost:3000/territories/new", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify(payload),
          })
          if (res.status === 200) {
            const result = await res.json();
            console.log(result);
          }
        })();
      },

      saveField(payload) {
        payload = {...payload, geometry: this.geometry};
        console.log(payload);

        (async () => {
          const res = await fetch("http://localhost:3000/fields/new", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify(payload),
          })
          if (res.status === 200) {
            const result = await res.json();
            console.log(result);
          }
        })();
      },

      placeField(payload) {
        console.log(payload);

        const coefWidth = payload.width * 0.0000089;
        const newLat = payload.lat + coefWidth;

        // constnewLong = payload.lon + coef / Math.cos(my_lat * 0.018);

        var bermudaTriangle = new google.maps.Polygon({
          paths: [
            new google.maps.LatLng(25.774, -80.190),
            new google.maps.LatLng(18.466, -66.118),
            new google.maps.LatLng(32.321, -64.757)
          ]
        });

      }
  }

  }
</script>


<style scoped>

</style>
