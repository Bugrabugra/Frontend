require([
  "esri/Map",
  "esri/views/MapView",
  "esri/tasks/Locator",
  "esri/Graphic"
],function(Map, MapView, Locator, Graphic) {
  const map = new Map({
    basemap: "streets-navigation-vector",
  });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-118.80500, 34.02700], // longitude, latitude
    zoom: 13
  });

  const places = ["Coffee shop", "Gas station", "Food", "Hotel", "Parks and Outdoors"];

  const select = document.createElement("select", "");
  select.setAttribute("class", "esri-widget esri-select");
  select.setAttribute("style", "width: 175px; font-family: Avenir Next W00; font-size: 1em");
  places.forEach((p) => {
    const option = document.createElement("option");
    option.value = p;
    option.innerHTML = p;
    select.appendChild(option);
  });

  view.ui.add(select, "top-right");

  const locator = new Locator({
    url: "http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer"
  });

  const findPlaces = (category, pt) => {
    locator
      .addressToLocations({
        location: pt,
        categories: [category],
        maxLocations: 25,
        outFields: ["Place_addr", "PlaceName"]
      })
      .then((results) => {
        // Clear the map
        view.popup.close();
        view.graphics.removeAll();
        // Add graphics
        results.forEach((result) => {
          view.graphics.add(
            new Graphic({
              attributes: result.attributes,
              geometry: result.location,
              symbol: {
                type: "simple-marker",
                color: "#000000",
                size: "12px",
                outline: {
                  color: "#ffffff",
                  width: "2px"
                }
              },
              popupTemplate: {
                title: "{PlaceName}",
                content: "{Place_addr}"
              }
            })
          )
        });
      })
  }

  // Search for places in center of map when the app loads
  findPlaces(select.value, view.center);

  // Listen for category changes and find places

  select.addEventListener("change", (event) => {
    findPlaces(event.target.value, view.center);
  });

  // Listen for mouse clicks and find places
  view.on("click", (event) => {
    view.hitTest(event.screenPoint).then((response) => {
      if (response.results.length < 2) {
        // If graphic is not clicked, find places
        findPlaces(select.options[select.selectedIndex].text, event.mapPoint);
      }
    })
  })
});