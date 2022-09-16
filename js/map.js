import { createPopupElement } from './create-data/create-card.js';

const START_COORDINATES = {
  lat: 35.68485,
  lng: 139.753777,
};

const START_SCALE = 13;
const HOTEL_NUMBER = 10;

const adForm = document.querySelector('.ad-form');
const addressField = adForm.querySelector('#address');
let map = undefined;
const markerGroup = L.layerGroup();
const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const simplePinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mainPinMarker = L.marker (
  START_COORDINATES,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const getMap = () => {
  if (!map) {
    map = L.map('map-canvas').setView(START_COORDINATES, START_SCALE);
  }
  return map;
};

const changeAddressField = (evt) => {
  const {lat, lng} = evt.target.getLatLng();
  addressField.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
};

const setHotelMarker = (hotel) => {
  const {location: {lat, lng}} = hotel;
  const marker = L.marker({lat, lng}, {icon: simplePinIcon});
  marker.addTo(markerGroup).bindPopup(() => createPopupElement(hotel));
};

const resetMap = (hotels) => {
  getMap().setView(START_COORDINATES, START_SCALE);
  mainPinMarker.setLatLng(START_COORDINATES);
  markerGroup.closePopup();
  markerGroup.clearLayers();
  hotels = hotels.slice(0, HOTEL_NUMBER);
  hotels.forEach((hotel) => setHotelMarker(hotel));
};

const initListeners = (hotels) => {
  adForm.addEventListener('reset', () => resetMap(hotels));
};

const initMap = (cb) => {
  getMap();
  map.on('load', cb).setView(START_COORDINATES, START_SCALE);
  mainPinMarker.on('moveend', changeAddressField);

  tileLayer.addTo(map);
  mainPinMarker.addTo(map);
  markerGroup.addTo(map);
};

export {initMap, initListeners, resetMap};
