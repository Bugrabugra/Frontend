require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
  "esri/layers/GraphicsLayer",
  "esri/Graphic"
],function(Map, MapView, FeatureLayer, GraphicsLayer, Graphic) {
  const map = new Map({
    basemap: "topo-vector"
  });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-118.805, 34.027], // longitude, latitude
    zoom: 13
  });

  // Reference the feature layer to query
  const featureLayer = new FeatureLayer({
    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads_Styled/FeatureServer/0"
  });

// Layer used to draw graphics returned
  const graphicsLayer = new GraphicsLayer();
  map.add(graphicsLayer);

  function addGraphics(result) {
    graphicsLayer.removeAll();
    result.features.forEach(function (feature) {
      const g = new Graphic({
        geometry: feature.geometry,
        attributes: feature.attributes,
        symbol: {
          type: "simple-marker",
          color: [0, 0, 0],
          outline: {
            width: 2,
            color: [0, 255, 255]
          },
          size: "20px"
        },
        popupTemplate: {
          title: "{TRL_NAME}",
          content: "This a {PARK_NAME} trail located in {CITY_JUR}."
        }
      });
      graphicsLayer.add(g);
    });
  }

  function queryFeatureLayer(point, distance, spatialRelationship, sqlExpression) {
    const query = {
      geometry: point,
      distance: distance,
      spatialRelationship: spatialRelationship,
      outFields: ["*"],
      returnGeometry: true,
      where: sqlExpression
    };
    featureLayer.queryFeatures(query).then(function (result) {
      addGraphics(result, true);
    });
  }

  // view.when(function () {
  //   queryFeatureLayer(view.center, 1500, "intersects");
  // });
  //
  // view.on("click", function (event) {
  //   queryFeatureLayer(event.mapPoint, 1500, "intersects");
  // });

  function queryFeatureLayerView(point, distance, spatialRelationship, sqlExpression) {
    // Add the layer if it is missing
    if (!map.findLayerById(featureLayer.id)) {
      featureLayer.outFields = ["*"];
      map.add(featureLayer, 0);
    }
    // Set up the query
    const query = {
      geometry: point,
      distance: distance,
      spatialRelationship: spatialRelationship,
      outFields: ["*"],
      returnGeometry: true,
      where: sqlExpression
    };
    // Wait for the layerview to be ready and then query features
    view.whenLayerView(featureLayer).then(function (featureLayerView) {
      if (featureLayerView.updating) {
        var handle = featureLayerView.watch("updating", function (isUpdating) {
          if (!isUpdating) {
            // Execute the query
            featureLayerView.queryFeatures(query).then(function (result) {
              addGraphics(result);
            });
            handle.remove();
          }
        });
      } else {
        // Execute the query
        featureLayerView.queryFeatures(query).then(function (result) {
          addGraphics(result);
        });
      }
    });
  }

  // view.when(function () {
  //   //*** UPDATE ***//
  //   //queryFeatureLayer(view.center, 1500, "intersects");
  //   queryFeatureLayerView(view.center, 1500, "intersects");
  // });
  //
  // view.on("click", function (event) {
  //   //*** UPDATE ***//
  //   //queryFeatureLayer(event.mapPoint, 1500, "intersects");
  //   queryFeatureLayerView(event.mapPoint, 1500, "intersects");
  // });

  var sql = "TRL_NAME like '%Canyon%'";

  view.when(function () {
    //queryFeatureLayer(view.center, 1500, "intersects")
    //*** UPDATE ***//
    queryFeatureLayerView(view.center, 1500, "intersects", sql);
  });

  view.on("click", function (event) {
    //queryFeatureLayer(event.mapPoint, 1500, "intersects")
    //*** UPDATE ***//
    queryFeatureLayerView(event.mapPoint, 1500, "intersects", sql);
  });

  //*** ADD ***//
  view.when(function () {
    view.whenLayerView(featureLayer).then(function (featureLayerView) {
      view.on("pointer-move", function (event) {
        view.hitTest(event).then(function (response) {
          // Only return features for the feature layer
          var feature = response.results.filter(function (result) {
            return result.graphic.layer === featureLayer;
          })[0].graphic;
          if (feature) {
            // Show popup for new features only
            if (
              !view.popup.features.length ||
              (view.popup.features.length &&
                view.popup.features[0].attributes.FID !== feature.attributes.FID)
            ) {
              view.popup.open({
                title: feature.attributes.TRL_NAME,
                content:
                  "This a " +
                  feature.attributes.PARK_NAME +
                  " trail located in " +
                  feature.attributes.CITY_JUR +
                  ".",
                location: feature.geometry
              });
            }
          }
        });
      });
    });
  });
});