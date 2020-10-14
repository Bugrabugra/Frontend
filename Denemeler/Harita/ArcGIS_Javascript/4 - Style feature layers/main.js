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

  const trailheadsRenderer = {
    type: "simple",
    symbol: {
      type: "picture-marker",
      url: "http://static.arcgis.com/images/Symbols/NPS/npsPictograph_0231b.png",
      width: "18px",
      height: "18px"
    }
  };

  const trailheadsLabels = {
    symbol: {
      type: "text",
      color: "#FFFFFF",
      haloColor: "#5E8D74",
      haloSize: "2px",
      font: {
        size: "12px",
        family: "Noto Sans",
        style: "italic",
        weight: "normal"
      }
    },
    labelPlacement: "above-center",
    labelExpressionInfo: {
      expression: "$feature.TRL_NAME"
    }
  };

  const trailsRenderer = {
    type: "simple",
    symbol: {
      color: "#BA55D3",
      type: "simple-line",
      style: "solid"
    },
    visualVariables: [{
      type: "size",
      field: "ELEV_GAIN",
      minDataValue: 0,
      maxDataValue: 2300,
      minSize: "3px",
      maxSize: "7px"
    }]
  };

  const bikeTrailsRenderer = {
    type: "simple",
    symbol: {
      type: "simple-line",
      style: "short-dot",
      color: "#FF91FF",
      width: "1px"
    }
  };

  function createFillSymbol(value, color) {
    return {
      value: value,
      symbol: {
        color: color,
        type: "simple-fill",
        style: "solid",
        outline: {
          style: "none"
        }
      },
      label: value
    };
  }

  const openSpacesRenderer = {
    type: "unique-value",
    field: "TYPE",
    uniqueValueInfos: [createFillSymbol("Natural Areas", "#9E559C"), createFillSymbol("Regional Open Space", "#A7C636"),
                       createFillSymbol("Local Park", "#149ECE"),
                       createFillSymbol("Regional Recreation Park", "#ED5151")]
  };

  // Trailheads feature layer (points)
  const trailheadsLayer = new FeatureLayer({
    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0",
    renderer: trailheadsRenderer,
    labelingInfo: [trailheadsLabels]
  });

  // Trails feature layer (lines)
  const trailsLayer = new FeatureLayer({
    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0",
    renderer: trailsRenderer,
    opacity: 0.75
  });

  const bikeTrails = new FeatureLayer({
    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0",
    renderer: bikeTrailsRenderer,
    definitionExpression: "USE_BIKE = 'YES'"
  });

  // Parks and open spaces (polygons)
  const parksLayer = new FeatureLayer({
    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space/FeatureServer/0"
  });

  const openspaces = new FeatureLayer({
    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space/FeatureServer/0",
    renderer: openSpacesRenderer,
    opacity: 0.2
  });

  const formList = document.querySelector("#layersList");
  const layers = [trailheadsLayer, trailsLayer, parksLayer, bikeTrails, openspaces];

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