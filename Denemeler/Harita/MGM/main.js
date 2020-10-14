require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/GraphicsLayer",
  "esri/widgets/Sketch",
  "esri/geometry/SpatialReference",
  "esri/geometry/projection"
],function(Map, MapView, GraphicsLayer, Sketch, SpatialReference, projection) {
  const graphicsLayer = new GraphicsLayer();

  const map = new Map({
    basemap: "gray-vector",
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

  sketch.availableCreateTools = ["rectangle"];
  sketch.creationMode = "single";

  //*** Red stroke, 1px wide ***//
  const stroke = {
    color: [255, 0, 0],
    width: 1
  };

  //*** White fill color with 50% transparency ***//
  const fillColor = [255, 255, 255, 0.5];

  const polygonSymbol = sketch.viewModel.polygonSymbol;
  polygonSymbol.color = fillColor;
  polygonSymbol.outline = stroke;

  view.ui.add(sketch, "top-right");

  const extentTextBox = document.querySelector("#extent");

  sketch.on("create", (event) => {
    if (event.state === "complete") {
      const attributes = {
        name: "My Graphic",
        type: event.graphic.geometry.type
      };
      event.graphic.attributes = attributes;

      extentTextBox.value = `
      minXY: ${event.graphic.geometry.extent.xmin}, ${event.graphic.geometry.extent.ymin} - maxXY: ${event.graphic.geometry.extent.xmax}, ${event.graphic.geometry.extent.ymax}
      `;
    }
  })
});