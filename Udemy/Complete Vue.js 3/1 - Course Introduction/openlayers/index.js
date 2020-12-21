import "ol/ol.css";
import Feature from "ol/Feature";
import Map from "ol/Map";
import Overlay from "ol/Overlay";
import Point from "ol/geom/Point";
import XYZ from "ol/source/XYZ";
import WMTS from "ol/source/WMTS";
import WMTSTileGrid from "ol/tilegrid/WMTS";
import TileJSON from "ol/source/TileJSON";
import ImageLayer from "ol/layer/Image";
import { Raster as RasterSource } from "ol/source";
import VectorSource from "ol/source/Vector";
import View from "ol/View";
import { Circle, Style, Fill } from "ol/style";
import { fromLonLat } from "ol/proj";
import Projection from "ol/proj/Projection";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import Control from 'ol/control/Control';

// var maxPoint = new Point([43.573 + 60, -8.7277 + 60]);
// var maxPoint = new Point([43.573 , -8.7277 ]);
// maxPoint.transform("EPSG:4326", "EPSG:900913");
var projection = new Projection({
  code: "EPSG:4236",
  extent: [-20037508.34, -20037508.34, 20037508.34, 20037508.34]
});
var maxPointCoord = fromLonLat([43.573, -8.7277]);
var maxPoint = new Point(maxPointCoord);

// var minPoint = new Point([-146.3773, -71.2661 + 50]);
var minPoint = new Point([-146.3773, -71.2661]);
minPoint.transform("EPSG:4326", "EPSG:900913"); // EPSG:900913

var centerPoint = new Point([0, 0]);
centerPoint.transform("EPSG:4326", "EPSG:900913");
var centerFeature = new Feature({
  geometry: centerPoint
});

var maxFeature = new Feature({
  geometry: maxPoint,
  name: "Max Point"
});

var minFeature = new Feature({
  geometry: minPoint,
  name: "Min Point"
});

const orangeCircleStyle = new Style({
  image: new Circle({
    radius: 5,
    fill: new Fill({
      color: "rgb(236, 98, 16)"
    })
  })
});

const greenCircleStyle = new Style({
  image: new Circle({
    radius: 5,
    fill: new Fill({
      color: "rgb(0, 158, 96)"
    })
  })
});

const whiteCircleStyle = new Style({
  image: new Circle({
    radius: 5,
    fill: new Fill({
      color: "rgb(255, 255, 255)"
    })
  })
});

maxFeature.setStyle(greenCircleStyle);
minFeature.setStyle(orangeCircleStyle);
// centerFeature.setStyle(whiteCircleStyle);

var vectorSource = new VectorSource({
  features: [minFeature, maxFeature]
});

var vectorLayer = new VectorLayer({
  source: vectorSource
});

const gibsSource = new XYZ({
  url:
    "https://gibs-{a-c}.earthdata.nasa.gov/wmts/epsg4326/best/" +
    "GHRSST_L4_AVHRR-OI_Sea_Surface_Temperature/default/2020-04-02/" +
    "2km/{z}/{y}/{x}.png",
  crossOrigin: ""
});

/*var gibsSourceWMTS = new WMTS({
 url:
 "https://gibs-{a-c}.earthdata.nasa.gov/wmts/epsg4326/best/wmts.cgi?TIME=2013-06-16",
 layer: "GHRSST_L4_AVHRR-OI_Sea_Surface_Temperature",
 format: "image/png",
 matrixSet: "EPSG4326_250m",
 tileGrid: new WMTSTileGrid({
 origin: [-180, 90],
 resolutions: [
 0.5625,
 0.28125,
 0.140625,
 0.0703125,
 0.03515625,
 0.017578125,
 0.0087890625,
 0.00439453125,
 0.002197265625
 ],
 matrixIds: [0, 1, 2, 3, 4, 5, 6, 7, 8],
 tileSize: 512
 })
 });*/

const exampleSource = new TileJSON({
  url: "https://a.tiles.mapbox.com/v3/aj.1x1-degrees.json?secure=1",
  crossOrigin: ""
});

const forestSource = new XYZ({
  url:
    "https://{a-c}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png" +
    "?apikey=Your API key from http://www.thunderforest.com/docs/apikeys/ here"
});

const tileLayer = new TileLayer({
  // source: gibsSource,
  source: exampleSource,
  // source: forestSource,
  // source: gibsSourceWMTS,
  projection: "EPSG:4326"
});

const gibsView = new View({
  extent: [-20037508.34, -20037508.34, 20037508.34, 20037508.34],
  center: [0, 0],
  zoom: 3,
  maxZoom: 6
});

const exampleView = new View({
  center: [0, 0],
  zoom: 3
});

var map = new Map({
  layers: [tileLayer, vectorLayer],
  target: document.getElementById("map"),
  view: gibsView
});

var element = document.getElementById("popup");

var popup = new Overlay({
  element: element,
  positioning: "bottom-center",
  stopEvent: false,
  offset: [0, -50]
});
map.addOverlay(popup);

// display popup on click
map.on("click", function (evt) {
  var feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
    return feature;
  });
  if (feature) {
    var coordinates = feature.getGeometry().getCoordinates();
    popup.setPosition(coordinates);
    $(element).popover({
      placement: "top",
      html: true,
      content: feature.get("name")
    });
    $(element).popover("show");
  } else {
    $(element).popover("dispose");
  }
});

// change mouse cursor when over marker
map.on("pointermove", function (e) {
  if (e.dragging) {
    $(element).popover("dispose");
    return;
  }
  var pixel = map.getEventPixel(e.originalEvent);
  var hit = map.hasFeatureAtPixel(pixel);
  map.getTarget().style.cursor = hit ? "pointer" : "";
});





/*

 Custom controls on the map
 By Bugra

 */

// Overlay container
const overlayContainer = document.querySelector(".ol-overlaycontainer-stopevent");

// Feature selection combo box
const selectFeature = document.createElement('select');
$(selectFeature).css("position", "absolute");
$(selectFeature).css("left", "40px");
$(selectFeature).css("top", "10px");
$(selectFeature).css("width", "150px");



selectFeature.className = "custom-select";
$(selectFeature).prepend("<option value='' disabled>Select feature</option>").val('');

// Populating the combo box with features
vectorSource.forEachFeature(feature => {
  $(selectFeature).append(new Option(feature.get("name")));
});

// Adding combobox to DOM
const elementDivSelectLayer = document.createElement('div');

elementDivSelectLayer.className = 'select-layer-widget ol-unselectable ol-control';
elementDivSelectLayer.appendChild(selectFeature);
overlayContainer.appendChild(elementDivSelectLayer);

const controlSelectLayer = new Control({
  element: elementDivSelectLayer
});

map.addControl(controlSelectLayer);

// Total animation time from zoom out to zoom in to feature
const animationDuration = 5000;

// When you change the combo box value, it zooms to the feature
$(selectFeature).on("change", (evt) => {
  var feature = vectorSource.getFeatures().find(function(f) { return f.get('name') === $(selectFeature).val(); });
  if (feature) {
    const extent = feature.getGeometry().getExtent()
    map.getView().fit(extent, {
      duration: animationDuration
    });
  }
});