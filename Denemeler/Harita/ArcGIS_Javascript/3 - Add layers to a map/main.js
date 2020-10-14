require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/FeatureLayer"
], function(Map, MapView, FeatureLayer) {
  const map = new Map({
    basemap: "topo-vector"
  });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-118.805, 34.027], // longitude, latitude
    zoom: 13
  });

  // Trailheads feature layer (points)
  const trailheadsLayer = new FeatureLayer({
    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0"
  });

  // Trails feature layer (lines)
  const trailsLayer = new FeatureLayer({
    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0",
    definitionExpression: "ELEV_GAIN < 250",

    //*** ADD ***//
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        color: "green",
        width: "2px"
      }
    },

    //*** ADD ***//
    outFields: ["TRL_NAME", "ELEV_GAIN"],

    //*** ADD ***//
    popupTemplate: {
      // Enable a popup
      title: "{TRL_NAME}", // Show attribute value
      content: "The trail elevation gain is {ELEV_GAIN} ft." // Display text in pop-up
    }
  });

  // Parks and open spaces (polygons)
  const parksLayer = new FeatureLayer({
    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space/FeatureServer/0"
  });

  const formList = document.querySelector("#layersList");
  const layers = [trailheadsLayer, trailsLayer, parksLayer];

  // Populating the combobox
  layers.forEach((layer) => {
    formList.innerHTML += `<option>${layer.title}</option>`;
  });

  formList.addEventListener("change", (evt) => {
    evt.preventDefault();
    map.removeAll();
    map.add(layers[formList.selectedIndex - 1]);
  });
});