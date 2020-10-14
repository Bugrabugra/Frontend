require([
  "esri/Map",
  "esri/views/MapView",
  "esri/widgets/Search",
  "esri/layers/FeatureLayer"
],function(Map, MapView, Search, FeatureLayer) {
  const map = new Map({
    basemap: "streets-navigation-vector",
  });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-118.80500, 34.02700], // longitude, latitude
    zoom: 13
  });

  const trailsLayer = new FeatureLayer({
    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0",
  });

  map.add(trailsLayer);

  const search = new Search({
    view: view
  });

  search.sources.push({
    layer: trailsLayer,
    searchFields: ["TRL_NAME"],
    displayField: "TRL_NAME",
    exactMatch: false,
    outFields: ["TRL_NAME", "PARK_NAME"],
    resultGraphicEnabled: true,
    name: "Trailheads",
    placeholder: "Example: Medea Creek Trail",
  });

  view.ui.add(search, "top-right");

  view.on("click", (event) => {
    search.clear();
    view.popup.clear();
    if (search.activeSource) {
      const geocoder = search.activeSource.locator;
      const params = {
        location: event.mapPoint
      };
      geocoder.locationToAddress(params).then(
        (response) => {
        // show the address found
        const address = response.address;
        showPopup(address, event.mapPoint);
      },
        (err) => {
        // Show ne address found
          showPopup("No address found", event.mapPoint)
        });
    }
  });

  const showPopup = (address, pt) => {
    view.popup.open({
      title: +Math.round(pt.longitude * 100000) / 100000 +
        "," +
        Math.round(pt.latitude * 100000) / 100000,
      content: address,
      location: pt
    })
  }
});