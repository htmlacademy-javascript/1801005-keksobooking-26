import { initMap } from './map.js';
import { debounce } from './utils.js';

const mapFilter = document.querySelector('.map__filters');
const housingType = mapFilter.querySelector('#housing-type');
const housingPrice = mapFilter.querySelector('#housing-price');
const housingRoom = mapFilter.querySelector('#housing-rooms');
const housingGuest = mapFilter.querySelector('#housing-guests');
const housingFeatures = Array.from(mapFilter.querySelectorAll('.map__checkbox'));

const filterHousingType = (place) => housingType.value === place.offer.type || housingType.value === 'any';

const filterHousingPrice = (place) => {
  const price = place.offer.price;
  const typeOfPrice = housingPrice.value;
  if (typeOfPrice === 'low' && price < 10000) {
    return true;
  }
  if (typeOfPrice === 'middle' && price <= 50000 && price >= 10000) {
    return true;
  }
  if (typeOfPrice === 'high' && price > 50000) {
    return true;
  }
  if (typeOfPrice === 'any') {
    return true;
  }
};

const filterHousingRooms = (place) => {
  if (parseInt(housingRoom.value, 10) === place.offer.rooms) {
    return true;
  }
  if (housingRoom.value === 'any') {
    return true;
  }
};

const filterHousingGuests = (place) => {
  if (parseInt(housingGuest.value, 10) === place.offer.guests) {
    return true;
  }
  if (housingGuest.value === 'any') {
    return true;
  }
};

const filterHousingFeatures = (place) => housingFeatures.every((feature) => {
  if (feature.checked) {
    return (place.offer.features || []).some((value) => value === feature.value);
  }
  return true;
});

const filterPlaces = (places) => {
  const filteredPlaces = [];
  for (const place of places) {
    const filter = filterHousingType(place)
      && filterHousingPrice(place)
      && filterHousingRooms(place)
      && filterHousingGuests(place)
      && filterHousingGuests(place)
      && filterHousingFeatures(place);
    if (filter) {
      filteredPlaces.push(place);
    }
    if (filteredPlaces.length >= 10) {
      break;
    }
  }
  return filteredPlaces;
};

const getFilteredMap = (places) => {
  mapFilter.addEventListener('change', debounce(() => {
    const filteredPlaces = filterPlaces(places);
    initMap(filteredPlaces);
  }));
};

export {getFilteredMap};

