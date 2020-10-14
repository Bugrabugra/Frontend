require([
  "esri/Map",
  "esri/views/MapView",
  "esri/widgets/Locate",
  "esri/widgets/Track",
  "esri/Graphic",
  "esri/widgets/Compass"
],function(Map, MapView, Locate, Track, Graphic, Compass) {
  const map = new Map({
    basemap: "streets-navigation-vector",
  });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-40, 28], // longitude, latitude
    zoom: 2
  });

  // const locate = new Locate({
  //   view: view,
  //   useHeadingEnabled: false,
  //   goToOverride: (view, options) => {
  //     options.target.scale = 1500; // Override the default map scale
  //     return view.goTo(options.target);
  //   }
  // });

  // view.ui.add(locate, "top-left");

  const track = new Track({
    view: view,
    graphic: new Graphic({
      symbol: {
        type: "simple-marker",
        size: "12px",
        color: "green",
        outline: {
          color: "#efefef",
          width: "1.5px"
        }
      }
    }),
    useHeadingEnabled: false // Don't change the orientation of the map
  });

  const compass = new Compass({
    view: view
  });

  view.ui.add(track, "top-left");
  view.ui.add(compass, "top-right");

});