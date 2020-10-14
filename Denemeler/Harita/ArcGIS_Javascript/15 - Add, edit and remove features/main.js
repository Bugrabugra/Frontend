require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
  "esri/widgets/Editor"
],function(Map, MapView, FeatureLayer, Editor) {

  const myPointsFeatureLayer = new FeatureLayer({
    url: "http://flxwatertest/server/rest/services/Projeler/Projeler/FeatureServer/0"
  });

  const map = new Map({
    basemap: "streets-navigation-vector",
    layers: [myPointsFeatureLayer],
  });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-118.80500, 34.02700], // longitude, latitude
    zoom: 13
  });

  const editorWidget = new Editor({
    view: view
  });

  view.ui.add(editorWidget, "top-right");
});