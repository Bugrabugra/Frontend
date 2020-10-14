require([
  "esri/Map",
  "esri/views/MapView",
  "esri/Graphic",
  "esri/layers/GraphicsLayer",
],function(Map, MapView, Graphic, GraphicsLayer) {
  const map = new Map({
    basemap: "gray-vector",
  });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-118.805, 34.027], // longitude, latitude
    zoom: 13
  });

  const graphicsLayer = new GraphicsLayer();
  map.add(graphicsLayer);

  // Add a point
  // const point = {
  //   type: "point",
  //   longitude: -118.80657463861,
  //   latitude: 34.0005930608889
  // };

  const point = {
    type: "point",
    longitude: -118.29507,
    latitude: 34.13501
  };

  const simpleMarkerSymbol = {
    type: "simple-marker",
    color: [226, 119, 40],
    outline: {
      color: [255, 255, 255],
      width: 1
    }
  };

  const attributes = {
    name: "My Point",
    location: " Point Dume State Beach"
  };

  const popupTemplate = {
    title: "{Name}",
    content: "I am located at <b>{Location}</b>."
  };

  // const simpleMarkerSymbol = {
  //   type: "simple-marker",
  //   color: [226, 119, 40], // orange
  //   outline: {
  //     color: [255, 255, 255], // white
  //     width: 1
  //   }
  // };

  // const simpleMarkerSymbol = {
  //   type: "simple-marker",
  //   color: [0, 150, 50], // orange
  //   outline: {
  //     color: [255, 255, 255], // white
  //     width: 2
  //   },
  //   size: 10
  // };

  const pointGraphic = new Graphic({
    geometry: point,
    symbol: simpleMarkerSymbol,
    attributes: attributes,
    popupTemplate: popupTemplate
  });

  graphicsLayer.add(pointGraphic);

  // Add a line
  const simpleLineSymbol = {
    type: "simple-line",
    color: [226, 119, 40], // orange
    width: 2
  };

  const polyline = {
    type: "polyline",
    paths: [
      [-118.821527826096, 34.0139576938577],
      [-118.814893761649, 34.0080602407843],
      [-118.808878330345, 34.0016642996246]
    ]
  };

  const polylineGraphic = new Graphic({
    geometry: polyline,
    symbol: simpleLineSymbol
  });

  graphicsLayer.add(polylineGraphic);

  // Add a polygon
  const polygon = {
    type: "polygon",
    rings: [
      [-118.818984489994, 34.0137559967283],
      [-118.806796597377, 34.0215816298725],
      [-118.791432890735, 34.0163883241613],
      [-118.79596686535, 34.008564864635],
      [-118.808558110679, 34.0035027131376]
    ]
  };

  // const simpleFillSymbol = {
  //   type: "simple-fill",
  //   color: [227, 139, 79, 0.8], // orange, opacity 80%
  //   outline: {
  //     color: [255, 255, 255],
  //     width: 1
  //   }
  // };

  const simpleFillSymbol = {
    type: "simple-fill",
    color: [50, 100, 255, 0.5], // orange, opacity 80%
    outline: {
      color: [50, 100, 255],
      width: 1
    },
    style: "backward-diagonal"
  };

  const polygonGraphic = new Graphic({
    geometry: polygon,
    symbol: simpleFillSymbol
  });

  graphicsLayer.add(polygonGraphic);

  const pictureGraphic = new Graphic({
    geometry: {
      type: "point",
      longitude: -118.80657463861,
      latitude: 34.0005930608889
    },
    symbol: {
      type: "picture-marker",
      url: "https://developers.arcgis.com/labs/images/bluepin.png",
      width: "14px",
      height: "26px"
    }
  });

  graphicsLayer.add(pictureGraphic);

  const textGraphic = new Graphic({
    geometry: {
      type: "point",
      longitude: -118.80657463861,
      latitude: 34.0005930608889
    },
    symbol: {
      type: "text",
      color: [25, 25, 25],
      haloColor: [255, 255, 255],
      haloSize: "1px",
      text: "This is my location",
      xoffset: 0,
      yoffset: -25,
      font: {
        size: 12
      }
    }
  });

  graphicsLayer.add(textGraphic);
});