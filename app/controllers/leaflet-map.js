import * as L from 'leaflet';
import Map = L.Map;
import Layer = L.Layer;
import LayersObject = L.Control.LayersObject;
import LayerGroup = L.LayerGroup;
import LayerControl = L.Control.Layers;
import { Location } from './donation-types';

const mymap = L.map('mapid').setView([52.2593, -7.1101], 13);//latitude, longitude and zoom level
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright"> OpenStreetMap</a> contributors';

const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);