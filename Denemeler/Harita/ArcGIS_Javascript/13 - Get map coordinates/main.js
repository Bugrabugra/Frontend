require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/GraphicsLayer"
],function(Map, MapView, GraphicsLayer) {
  const map = new Map({
    basemap: "gray-vector"
  });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-118.805, 34.027], // longitude, latitude
    zoom: 13
  });

  const coordsWidget = document.createElement("div");
  coordsWidget.id = "coordsWidget";
  coordsWidget.className = "esri-widget esri-component";
  coordsWidget.style.padding = "7px 15px 5px";

  view.ui.add(coordsWidget, "bottom-right");
  // view.ui.add(coordinateConversionWidget, "bottom-left");

  const showCoordinates = (pt) => {
    const coords = `Lat/Lon ${pt.x.toFixed(3)} / ${pt.y.toFixed(3)} | Scale 1:${Math.round(view.scale * 1) / 1} | Zoom ${view.zoom}`;
    coordsWidget.innerHTML = coords;
  };

  view.watch("stationary", (isStationary) => {
    showCoordinates(view.center);
  });

  view.on("pointer-move", (evt) => {
    showCoordinates(view.toMap({x: evt.x, y: evt.y}));
  })
});