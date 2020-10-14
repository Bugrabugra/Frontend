require([
  "esri/WebMap",
  "esri/views/MapView",
  "esri/widgets/Legend",
  "esri/widgets/ScaleBar"
],function(WebMap, MapView, Legend, ScaleBar) {
  const webmap = new WebMap({
    portalItem: {
      id: "41281c51f9de45edaf1c8ed44bb10e30"
    }
  });

  const view = new MapView({
    container: "viewDiv",
    map: webmap,
  });

  const legend = new Legend({
    view: view,
  });

  const scaleBar = new ScaleBar({
    view: view
  });

  view.ui.add(legend, "top-right");
  view.ui.add(scaleBar, "bottom-left");

});