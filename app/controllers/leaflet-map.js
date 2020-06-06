'use strict';
import * as L from 'leaflet';
import Map = L.Map;
import Layer = L.Layer;
import LayersObject = L.Control.LayersObject;
import LayerGroup = L.LayerGroup;
import LayerControl = L.Control.Layers;
import { Location } from './donation-types';




const mymap = L.map('mapid').setView([53.1424, - 7.6921], 8);//latitude, longitude and zoom level
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright"> OpenStreetMap</a> contributors';

const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);

const poi = L.layerGroup();
L.marker([52.2686, -7.0036]).bindPopup('This is Cheek Point, Waterford.').addTo(poi),
  L.marker([51.4388, -9.4923]).bindPopup('This is Cape Clear, Cork.').addTo(poi),
  L.marker([52.1167, -6.6167]).bindPopup('This is Great Saltee Island, Wexford.').addTo(poi),
  L.marker([52.1209, -6.9241]).bindPopup('This is Hook Pennisula, Wexford.').addTo(poi);
L.marker([54.299, -8.588]).bindPopup('This is Coney Island, Sligo.').addTo(poi),
  L.marker([55.2726, -8.2494]).bindPopup('This is Tory Island, Donegal.').addTo(poi),
  L.marker([54.2239, -9.987603]).bindPopup('This is Belmullet, Mayo.').addTo(poi),
  L.marker([53.021, -9.409]).bindPopup('This is Crab Island, Clare.').addTo(poi);
L.marker([53.2650, -6.1149]).bindPopup('This is Killiney Bay, Dublin.').addTo(poi),
  L.marker([53.2719, -6.0843]).bindPopup('This is Dalkey Island, Dublin.').addTo(poi),
  L.marker([53.2750, -6.0938]).bindPopup('This is Coliemore Harbour, Dublin.').addTo(poi),
  L.marker([52.1614, -7.1493]).bindPopup('This is Tramore Bay, Waterford.').addTo(poi);

// const marker = L.marker([52.2686, -7.0036]).addTo(mymap);

poi.addTo(mymap);
