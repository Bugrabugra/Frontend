<template>
  <div>
    <div id="editMap" style="height: 100vh;"></div>
  </div>
</template>

<script>
export default {
  name: 'EditMap',

  data() {
    return {
      map: null,
      drawingManager: null
    }
  },

  mounted() {
    this.initMap();
  },

  methods: {
    // This example creates a simple polygon representing the Bermuda Triangle.
    initMap() {
      setTimeout(() => {
        this.map = new window.google.maps.Map(document.getElementById("editMap"), {
          zoom: 5,
          center: { lat: 24.886, lng: -70.268 },
          mapTypeId: "terrain",
        });
        // Define the LatLng coordinates for the polygon's path.
        const triangleCoords = [
          { lat: 25.774, lng: -80.19 },
          { lat: 18.466, lng: -66.118 },
          { lat: 32.321, lng: -64.757 },
          { lat: 25.774, lng: -80.19 },
        ];
        // Construct the polygon.
        const bermudaTriangle = new window.google.maps.Polygon({
          paths: triangleCoords,
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#FF0000",
          fillOpacity: 0.35,
        });
        bermudaTriangle.setMap(this.map);

        this.drawingManager = new window.google.maps.drawing.DrawingManager({
          drawingMode: window.google.maps.drawing.OverlayType.MARKER,
          drawingControl: true,
          drawingControlOptions: {
            position: window.google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [
              window.google.maps.drawing.OverlayType.POLYGON,
            ],
          },
          markerOptions: {
            icon:
              "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
          },
          circleOptions: {
            fillColor: "#ffff00",
            fillOpacity: 1,
            strokeWeight: 5,
            clickable: false,
            editable: true,
            zIndex: 1,
          },
        });
        this.drawingManager.setMap(this.map);
      }, 1000)
}

}

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #map {
    height: 100%;
  }

  /* Optional: Makes the sample page fill the window. */
  html,
  body {
    height: 100%;
    margin: 0;
    padding: 0;
  }

</style>
