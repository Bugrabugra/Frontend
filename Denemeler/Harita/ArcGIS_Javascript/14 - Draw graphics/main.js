require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/GraphicsLayer",
  "esri/widgets/Sketch",
],function(Map, MapView, GraphicsLayer, Sketch) {
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

  //*** Red stroke, 1px wide ***//
  const stroke = {
    color: [255, 0, 0],
    width: 1
  };

  //*** White fill color with 50% transparency ***//
  const fillColor = [255, 255, 255, 0.5];

  //*** Override all of the default symbol colors and sizes ***//
  const pointSymbol = sketch.viewModel.pointSymbol;
  pointSymbol.color = fillColor;
  pointSymbol.outline = stroke;
  pointSymbol.size = 8;

  const polylineSymbol = sketch.viewModel.polylineSymbol;
  polylineSymbol.color = stroke.color;
  polylineSymbol.width = stroke.width;

  const polygonSymbol = sketch.viewModel.polygonSymbol;
  polygonSymbol.color = fillColor;
  polygonSymbol.outline = stroke;

  view.ui.add(sketch, "top-right");

  sketch.on("create", (event) => {
    if (event.state === "complete") {
      const attributes = {
        name: "My Graphic",
        type: event.graphic.geometry.type
      };
      event.graphic.attributes = attributes;

      const popupTemplate = {
        title: "{name}",
        content: "I am a {type}."
      };
      event.graphic.popupTemplate = popupTemplate;
    }
  })
});