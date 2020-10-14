require([
  "esri/Map",
  "esri/views/MapView",
  "esri/widgets/BasemapToggle",
  "esri/widgets/BasemapGallery"
], function(Map, MapView, BasemapToggle, BasemapGallery) {
  const map = new Map({
    basemap: "topo-vector"
  });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-118.805, 34.027], // longitude, latitude
    zoom: 13
  });

  const basemapToggle = new BasemapToggle({
    view: view,
    nextBasemap: "satellite"
  });

  view.ui.add(basemapToggle, "bottom-right");

  const basemapGallery = new BasemapGallery({
    view: view,
    source: {
      portal: {
        url: "https://www.arcgis.com", //*** ADD ***//
        useVectorBasemaps: false // Load raster tile basemaps
      }
    }
  });
});