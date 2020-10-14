require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/FeatureLayer"
],function(Map, MapView, FeatureLayer) {
  const map = new Map({
    basemap: "gray-vector"
  });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-118.805, 34.027], // longitude, latitude
    zoom: 13
  });

  const featureLayer = new FeatureLayer({
    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails_Styled/FeatureServer/0",
    outFields: ["*"], // Return all fields so it can be queried client-side
    popupTemplate: {
      // Enable a popup
      title: "{TRL_NAME}", // Show attribute value
      content: "The trail elevation gain is {ELEV_GAIN} ft." // Display in popup
    }
  });

  map.add(featureLayer);

  const sqlExpressions = [
    "TRL_ID = 0",
    "TRL_ID > 0",
    "USE_BIKE = 'Yes'",
    "USE_BIKE = 'No'",
    "ELEV_GAIN < 1000",
    "ELEV_GAIN > 1000",
    "TRL_NAME = 'California Coastal Trail'"
  ];

  const selectFilter = document.createElement("select");
  selectFilter.setAttribute("class", "esri-widget esri-select");
  selectFilter.setAttribute("style", "width: 275px; font-family: Avenir Next W00; font-size: 1em;");

  sqlExpressions.forEach((sql) => {
    const option = document.createElement("option");
    option.value = sql;
    option.innerHTML = sql;
    selectFilter.appendChild(option);
  });

  view.ui.add(selectFilter, "top-right");

  const setFeatureLayerFilter = (expression) => {
    featureLayer.definitionExpression = expression;
  };

  // selectFilter.addEventListener("change", (event) => {
  //   setFeatureLayerFilter(event.target.value);
  // });

  var highlight;

  view.whenLayerView(featureLayer).then((featureLayerView) => {
    view.on("pointer-move", (event) => {
      view.hitTest(event).then((response) => {
        // Only return features for the feature layer
        const feature = response.results.filter((result) => {
          return result.graphic.layer === featureLayer;
        })[0].graphic;
        if (highlight) {
          highlight.remove();
        }
        // Highlight feature
        highlight = featureLayerView.highlight(feature);
      });
    });
  });


  // const setFeatureLayerViewFilter = (expression) => {
  //   view.whenLayerView(featureLayer).then((featureLayerView) => {
  //     // featureLayerView.filter = {
  //     //   where: expression
  //     // };
  //     featureLayerView.effect = {
  //       filter: {
  //         where: expression
  //       },
  //       excludedEffect: "opacity(50%)"
  //     };
  //   });
  // };
  //
  // selectFilter.addEventListener("change", (event) => {
  //   setFeatureLayerViewFilter(event.target.value);
  // });
});