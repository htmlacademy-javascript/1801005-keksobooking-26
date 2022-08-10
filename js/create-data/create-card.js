const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const cardTemplateFragment = document.createDocumentFragment();
const mapCanvas = document.querySelector('.map__canvas');

const housingTypes = {
  hotel: 'Отель',
  house: 'Дом',
  bungalow: 'Бунгало',
  flat: 'Квартира',
  palace: 'Дворец'
};

const renderFeatures = (array,cardNode) => {
  array.forEach((element) => {
    const liFeature = document.createElement('li');
    const featureClass = `popup__feature--${element}`;
    liFeature.classList.add(featureClass);
    liFeature.classList.add('popup__feature');
    cardNode.appendChild(liFeature);
  });
};

const renderPopup = (array) => {
  array.forEach((ads) =>{
    const cardNode = cardTemplate.cloneNode(true);
    cardNode.querySelector('.popup__title').textContent = ads.offer.title;
    cardNode.querySelector('.popup__text--address').textContent = ads.offer.address;
    cardNode.querySelector('.popup__text--price').textContent = `${ads.offer.price}₽/ночь`;
    cardNode.querySelector('.popup__features').innerHTML = '';
    const featureCardNode = cardNode.querySelector('.popup__features');
    renderFeatures(ads.offer.features, featureCardNode);
    cardNode.querySelector('.popup__type').textContent = housingTypes[ads.offer.types];
    cardNode.querySelector('.popup__text--capacity').textContent = `Заезд после ${ads.offer.checkin}, выезд до ${ads.offer.checkout}`;
    cardNode.querySelector('.popup__description').textContent = '';
    const descriptionCardNode = cardNode.querySelector('.popup__description');
    const pDescription = document.createElement('p');
    pDescription.textContent = ads.offer.description;
    pDescription.classList.add('popup__description');
    descriptionCardNode.appendChild(pDescription);
    cardNode.querySelector('.popup__photo').textContent = ads.offer.photos;
    cardNode.querySelector('.popup__avatar').src = ads.author.avatar;
    cardTemplateFragment.appendChild(cardNode);
  });
  return mapCanvas.appendChild(cardTemplateFragment);
};

const insertCardToMap = (card) => mapCanvas.appendChild(card);

export {renderPopup, insertCardToMap};
