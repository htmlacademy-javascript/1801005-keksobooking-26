import {
  generateAds
} from './create-data/generate-ads.js';
import {
  initFormValidation,
  regulateButtons
} from './form-validation.js';
import { initMap } from './map.js';
import {
  getPriceFromSlider
} from './slider.js';
import {
  getData
} from './server-data.js';
import {
  doFetchPost
} from './server-data.js';

const ads = generateAds(10);


initFormValidation();

regulateButtons();

initMap(ads);

getPriceFromSlider();

getData();

doFetchPost();
