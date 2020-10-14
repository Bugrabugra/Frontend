require([
  "esri/Map",
  "esri/views/MapView",
  "esri/widgets/Directions"
],function(Map, MapView, Directions) {
  const map = new Map({
    basemap: "streets-navigation-vector",
  });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-118.24532, 34.05398], // longitude, latitude
    zoom: 12,
    padding: {
      right: 320
    }
  });

  const directions = new Directions({
    view: view,
    routeServiceUrl: "https://utility.arcgis.com/usrsvcs/appservices/<your-id>/rest/services/World/Route/NAServer/Route_World"
  });

  view.ui.add(directions, "top-right");

});