require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/FeatureLayer"
], function(Map, MapView, FeatureLayer) {
  const map = new Map({
    basemap: "topo-vector"
  });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-118.805, 34.027], // longitude, latitude
    zoom: 13
  });

  const popupTrailheads = {
    title: "{TRL_NAME}",
    content: "<b>City:</b> {CITY_JUR}<br><b>Cross Street:</b> {X_STREET}<br><b>Parking:</b> {PARKING}<br><b>Elevation:</b> {ELEV_FT} ft"
  };

  const trailheads = new FeatureLayer({
    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads_Styled/FeatureServer/0",
    outFields: ["TRL_NAME", "CITY_JUR", "X_STREET", "PARKING", "ELEV_FT"],
    popupTemplate: popupTrailheads
  });

  // const popupTrails = {
  //   title: "Trail Information",
  //   content: function() {
  //     return "This is {TRL_NAME} with {ELEV_GAIN} ft of climbing.";
  //   }
  // };

  const trails = new FeatureLayer({
    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails_Styled/FeatureServer/0",
    outFields: ["TRL_NAME", "ELEV_GAIN"],
    popupTemplate: popupTrails
  });

  const popupOpenspaces = {
    title: "{PARK_NAME}",
    content: [{
      type: "fields",
      fieldInfos: [{
        fieldName: "AGNCY_NAME",
        label: "Agency",
        isEditable: true,
        tooltip: "",
        visible: true,
        format: null,
        stringFieldOption: "text-box"
      }, {
        fieldName: "TYPE",
        label: "Type",
        isEditable: true,
        tooltip: "",
        visible: true,
        format: null,
        stringFieldOption: "text-box"
      }, {
        fieldName: "ACCESS_TYP",
        label: "Access",
        isEditable: true,
        tooltip: "",
        visible: true,
        format: null,
        stringFieldOption: "text-box"
      }, {
        fieldName: "GIS_ACRES",
        label: "Acres",
        isEditable: true,
        tooltip: "",
        visible: true,
        format: {
          places: 2,
          digitSeparator: true
        },
        stringFieldOption: "text-box"
      }]
    }]
  };

  const popupTrails = {
    title: "Trail Information",
    //*** ADD ***//
    // content: function(){
    //    return "This is {TRL_NAME} with {ELEV_GAIN} ft of climbing.";
    // }
    content: [
      {
        type: "media",
        mediaInfos: [
          {
            type: "column-chart",
            caption: "",
            value: {
              fields: ["ELEV_MIN", "ELEV_MAX"],
              normalizeField: null,
              tooltipField: "Min and max elevation values"
            }
          }
        ]
      }
    ]
  };

  const openspaces = new FeatureLayer({
    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space_Styled/FeatureServer/0",
    outFields: ["TYPE", "PARK_NAME", "AGNCY_NAME", "ACCESS_TYP", "GIS_ACRES"],
    popupTemplate: popupOpenspaces
  });

  map.addMany([trailheads, trails, openspaces]);
});