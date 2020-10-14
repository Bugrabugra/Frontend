import 'ol/ol.css';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import VectorSource from 'ol/source/Vector';
import GeoJSON from "ol/format/GeoJSON";
import {bbox} from 'ol/loadingstrategy';
import VectorLayer from 'ol/layer/Vector';
import {Fill, Stroke, Style, Text} from 'ol/style';

var style = new Style({
  fill: new Fill({
    color: 'rgba(255, 255, 255, 0.6)',
  }),
  stroke: new Stroke({
    color: '#319FD3',
    width: 1,
  }),
  text: new Text({
    font: '12px Calibri,sans-serif',
    fill: new Fill({
      color: '#000',
    }),
    stroke: new Stroke({
      color: '#fff',
      width: 3,
    }),
  }),
});

const vectorSource = (layer) => {
  return new VectorSource({
    format: new GeoJSON(),
    url: (extent) => {
      return (
        `http://localhost:8080/geoserver/Bugra/ows?service=WFS&
        version=1.1.0&request=GetFeature&typeName=Bugra:${layer}&outputFormat=application/json&srsname=EPSG:3857&bbox=${extent.join(',')},EPSG:3857`);
    },
    strategy: bbox,
  })
};

// Layer creating class
const mahalle = new VectorLayer({
  source: vectorSource("ABS_MAHALLE_M"),
  style: function myText(feature) {
    style.getText().setText(feature.get('adi'));
    return style;
  },
  minZoom: 11.9
});

console.log(mahalle.getStyle());

var map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM({
        maxZoom: 20 // visible at zoom levels 14 and below
      }),
    }),
    mahalle
  ],
  view: new View({
    center: [0, 0],
    zoom: 1,
    maxZoom: 19
  }),
});

