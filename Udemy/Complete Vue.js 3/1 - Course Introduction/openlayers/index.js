import "ol/ol.css";
import Map from "ol/Map";
import XYZ from "ol/source/XYZ";
import RasterSource from "ol/source/Raster";
import View from "ol/View";
import ImageLayer from "ol/layer/Image";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import Feature from 'ol/Feature';
import Overlay from 'ol/Overlay';
import TileJSON from 'ol/source/TileJSON';
import VectorSource from 'ol/source/Vector';
import Point from 'ol/geom/Point';
import {Circle, Fill, Style, Icon} from 'ol/style';
// import {useGeographic} from 'ol/proj';
//
// useGeographic();

var place = [-62.8417, 140.6421];

var point = new Point(place);

var vectorSource = new VectorSource({
  features: [new Feature(point)],
});

var vectorLayer = new VectorLayer({
  source: vectorSource,
  style: new Style({
    image: new Circle({
      radius: 9,
      fill: new Fill({color: 'red'}),
    }),
  }),
});


var source = new XYZ({
  url: "https://gibs-{a-c}.earthdata.nasa.gov/wmts/epsg4326/best/" +
    "GHRSST_L4_AVHRR-OI_Sea_Surface_Temperature/default/2020-04-02/" +
    "2km/{z}/{y}/{x}.png",
  crossOrigin: "",
});


var raster = new RasterSource({
  sources: [source],
  operation: function (pixels, data) {
    var pixel = pixels[0]; // select from the only source - pixels will be an array of length 1 - corresponding to the only source.
    if (pixel[0] === 45 && pixel[1] === 0 && pixel[2] === 28) {
      // min temperature pixel.- set yellow.
      pixel[0] = 255;
      pixel[1] = 255;
      pixel[2] = 0;

      // coldPlaces.push(pixel)
    }
    // if (pixel[0] === 124 && pixel[1] === 8 && pixel[2] === 0) {
    //   // max temperature pixel.- set yellow.
    //   pixel[0] = 0;
    //   pixel[1] = 255;
    //   pixel[2] = 0;
    //   console.log("modifying min pixel..");
    // }
    return pixel;
  }
});

var imageLayer = new ImageLayer({ source: raster });

var tileLayer = new TileLayer({ source: source });
// map.addLayer(tileLayer);

var map = new Map({
  view: new View({
    extent: [-20037508.34, -20037508.34, 20037508.34, 20037508.34],
    center: [0, 0],
    zoom: 5,
    maxZoom: 9
  }),
  target: document.getElementById("map"),
  layers: [tileLayer]
});

map.addLayer(imageLayer);
map.addLayer(vectorLayer);




