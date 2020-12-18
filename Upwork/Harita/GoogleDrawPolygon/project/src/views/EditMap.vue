<template>
  <div>
    <div id="editMap" style="height: 88vh;"></div>
    <EditForm
        style="height: 10vh;"
        @evtSavePolygon="savePolygon"
    />
  </div>
</template>

<script>
  import EditForm from "../components/EditForm";


  export default {
    name: 'EditMap',

    components: {EditForm},

    data() {
      return {
        map: null,
        drawingManager: null,
        geometry: null,
        territories: [],
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

              let color = "";
              let data1 = null;
              let data3 = null;

              if (territory.layer_name === "Layer 1") {
                data1 = new window.google.maps.Data();
                data1.add(feature)
                data1.setMap(this.map);
                color = "#FF0000";

                data1.setStyle(function(feature) {
                  return /** @type {!google.maps.Data.StyleOptions} */ ({
                    fillColor: color,
                    strokeColor: "#323131",
                    strokeWeight: 2,
                    editable: true
                  });
                });

              } else if (territory.layer_name === "Layer 3") {
                data3 = new window.google.maps.Data();
                data3.add(feature)
                data3.setMap(this.map);
                color = "#2fff00"

                data3.setStyle(function(feature) {
                  return /** @type {!google.maps.Data.StyleOptions} */ ({
                    fillColor: color,
                    strokeColor: "#323131",
                    strokeWeight: 2,
                    editable: true
                  });
                });
              }
            })
          }
        })();
      },

      savePolygon(payload) {
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
      }
  }

  }
</script>


<style scoped>

</style>
