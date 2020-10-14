require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/Layer"
],function(Map, MapView, Layer) {
  const map = new Map({
    basemap: "gray-vector"
  });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-118.805, 34.027], // longitude, latitude
    zoom: 13
  });

  // const addLayer = (layerItemPromise, index) => {
  //   return layerItemPromise.then((layer) => {
  //     map.add(layer, index);
  //   });
  // };

  const trailheadsPortalItem = Layer.fromPortalItem({
    portalItem: {
      id: "33fc2fa407ab40f9add12fe38d5801f5"
    }
  });

  const trailsPortalItem = Layer.fromPortalItem({
    portalItem: {
      id: "52a162056a2d48409fc3b3cbb672e7da"
    }
  });

// Parks
  const parksPortalItem = Layer.fromPortalItem({
    portalItem: {
      id: "83cf97eea04e4a699689c250dd07b975"
    }
  });

  const addLayer = (layerItemPromise, index) => {
    return layerItemPromise.then((layer) => {
      layer.when(() => {
        if (layer.title === "Trails_Styled_Popups") {
          layer.definitionExpression = "ELEV_GAIN < 250";
        }
      });
      map.add(layer, index);
    })
  };

  addLayer(trailheadsPortalItem, 2)
    .then(addLayer(trailsPortalItem, 1))
    .then(addLayer(parksPortalItem, 0));

});