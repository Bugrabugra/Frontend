require([
  "esri/Map",
  "esri/views/MapView",
  "esri/Basemap",
  "esri/layers/VectorTileLayer",
  "esri/layers/TileLayer"
],function(Map, MapView, Basemap, VectorTileLayer, TileLayer) {
  const basemap = new Basemap({
    baseLayers: [
      new TileLayer({
        portalItem: {
          id: "1b243539f4514b6ba35e7d995890db1d" // World Hillshade
        }
      }),

      new VectorTileLayer({
        portalItem: {
          id: "d2ff12395aeb45998c1b154e25d680e5" // Forest and Parks Canvas
        },
        opacity: 0.5
      })
    ]
  });

  const map = new Map({
    basemap: basemap
  });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-118.805, 34.027], // longitude, latitude
    zoom: 3
  });


});