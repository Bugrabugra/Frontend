require([
  "esri/Map",
  "esri/views/MapView",
  "esri/widgets/Sketch",
  "esri/layers/GraphicsLayer",
  "esri/geometry/geometryEngine"
], function (Map, MapView, Sketch, GraphicsLayer, geometryEngine) {

  // const polygonGraphic = new Graphic({
  //   geometry: "polygon",
  //   symbol: {
  //     color: {a: 0.3, r: 255, g: 0, b: 0},
  //     type: "simple-fill"
  //     },
  //   popupTemplate: {
  //     title: "Bilgi kartı",
  //     content: `${geometryEngine.planarArea(this.geometry, 109404)}`
  //   }
  // });

  const graphicsLayer = new GraphicsLayer();

  const map = new Map({
    basemap: "topo-vector",
    layers: [graphicsLayer]
  });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-118.805, 34.027], // longitude, latitude
    zoom: 13
  });

  const sketch = new Sketch({
    layer: graphicsLayer,
    view: view
  });

  sketch.on("create", (event) => {
    if (event.state === "complete") {
      const graphic = event.graphic;
      graphic.symbol.color = {a: 0.3, r: 255, g: 0, b: 0};
      graphicsLayer.graphics.forEach((graphic) => {
        console.log(graphic);
        graphic.popupTemplate = {
          title: "Bilgi kartı",
          content: `${geometryEngine.planarArea(graphic.geometry, 109404)}`
        };
      });
    }
  });

  view.popup.autoOpenEnabled = true;
  view.ui.add(sketch, "top-right");

});