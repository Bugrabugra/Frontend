require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
  "esri/Graphic",
  "esri/geometry/geometryEngine"
],function(Map, MapView, FeatureLayer, Graphic, geometryEngine) {
  const map = new Map({
    basemap: "streets-navigation-vector",
  });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-118.80500, 34.02700], // longitude, latitude
    zoom: 13
  });

  const featureLayer = new FeatureLayer({
    url:  "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails_Styled/FeatureServer/0"
  });

  map.add(featureLayer);

  var activeGraphic;

  const findNearestGraphic = (event) => {
    return view.hitTest(event).then((response) => {
      var graphic;
      // Get the Trail graphics only
      if (response.results.length) {
       graphic = response.results.filter((result) => {
         return result.graphic.layer === featureLayer;
       })[0].graphic;
      }

      // Only return new graphics are found
      if (graphic) {
        if (!activeGraphic || activeGraphic.attributes.OBJECTID !== graphic.attributes.OBJECTID) {
          return graphic;
        } else {
          return null;
        }
      } else {
        return null;
      }
    });
  };

  var bufferGraphic;

  const drawBuffer = (bufferGeometry) => {
    view.graphics.remove(bufferGraphic);
    bufferGraphic = new Graphic({
      geometry: bufferGeometry,
      symbol: {
        type: "simple-fill",
        color: "rgba(0, 0, 0, 0)",
        outline: {
          color: "rgba(0, 0, 0, 0.5)",
          width: 1
        }
      }
    });
    view.graphics.add(bufferGraphic);
  }

  view.on("pointer-move", (event) => {
    findNearestGraphic(event).then((graphic) => {
      if (graphic) {
        activeGraphic = graphic;
        const buffer = geometryEngine.geodesicBuffer(activeGraphic.geometry, 0.25, "miles");
        drawBuffer(buffer);
      }
    });
    if (bufferGraphic) {
      const cursorPoint = view.toMap(event);
      const intersects = geometryEngine.intersects(bufferGraphic.geometry, cursorPoint);
      const symbol = bufferGraphic.symbol.clone();
      if (intersects) {
        symbol.color = "rgba(0, 0, 0, 0.15)"; // Highlight
      } else {
        symbol.color = "rgba(0, 0, 0, 0)"; // Transparent
      }
      bufferGraphic.symbol = symbol;

      const vertexResult = geometryEngine.nearestVertex(bufferGraphic.geometry, cursorPoint);
      const closestPoint = vertexResult.coordinate;
      drawLine(cursorPoint, closestPoint);

      const distance = geometryEngine.geodesicLength(lineGraphic.geometry, "miles");
      drawText(cursorPoint, distance);
    }
  });

  var lineGraphic;

  const drawLine = (point, point2) => {
    view.graphics.remove(lineGraphic);
    lineGraphic = new Graphic({
      geometry: {
        type: "polyline",
        paths: [
          [point.longitude, point.latitude],
          [point2.longitude, point2.latitude]
        ]
      },
      symbol: {
        type: "simple-line",
        color: "#333",
        width: 1
      }
    });
    view.graphics.add(lineGraphic);
  }

  var textGraphic;

  const drawText = (point, distance) => {
    view.graphics.remove(textGraphic);
    textGraphic = new Graphic({
      geometry: point,
      symbol: {
        type: "text",
        text: distance.toFixed(2) + " miles",
        color: "black",
        font: {
          size: 12
        },
        haloColor: "white",
        haloSize: 1
      }
    });
    view.graphics.add(textGraphic);
  }

});