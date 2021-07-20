import { scaleToSmallClickHandler, scaleToBigClickHandler } from './scale.js';
const uploadOverlay = document.querySelector('.img-upload__overlay');
const scaleToSmall = uploadOverlay.querySelector('.scale__control--smaller');
const scaleToBig = uploadOverlay.querySelector('.scale__control--bigger');
const inputScaleControl = uploadOverlay.querySelector('.scale__control--value');
const inputEffects = uploadOverlay.querySelectorAll('.effects__radio');
const imgUploadPreview = uploadOverlay.querySelector('.img-upload__preview').children[0];
const effectValue = document.querySelector('.img-upload__effect-level');
const inputLevelValue = effectValue.querySelector('.effect-level__value');
const sliderEffect = effectValue.querySelector('.effect-level__slider');
const DEFAULT_SCALE = 1;
const DEFAULT_INPUT_VALUE = '100%';
const DEFAULT_FILL = '100%';
const imageEffects = ['effects__preview--none','effects__preview--chrome','effects__preview--sepia','effects__preview--marvin','effects__preview--phobos','effects__preview--heat'];
const constantsForEffects = {
  EFFECT_ID_NUMBER: 7,
  SCALE_COEFFICIENT: 100,
  MAXIMAL_BLUR: 3,
  MINIMAL_BRIGHT: 1,
  BRIGHT_MULTIPLIER: 2,
};
let effectId = 'effect-none';
function removeEffects () {
  for (let i = 0; i < imageEffects.length; i++) {
    if(imgUploadPreview.classList.contains(imageEffects[i])) {
      imgUploadPreview.classList.remove(imageEffects[i]);
    }
  }
}
function setDefaultScale () {
  imgUploadPreview.style.transform = `scale(${DEFAULT_SCALE})`;
  inputScaleControl.value = DEFAULT_INPUT_VALUE;
  scaleToBig.setAttribute('disabled', 'disabled');
  scaleToSmall.addEventListener('click', scaleToSmallClickHandler);
  scaleToBig.addEventListener('click', scaleToBigClickHandler);
}
function setDefaultEffects () {
  removeEffects ();
  imgUploadPreview.style.filter = `saturate(${DEFAULT_FILL})`;
  effectValue.style.opacity = 0;
}
function getDefaultLevelValue (levelEffect) {
  return (levelEffect / constantsForEffects.SCALE_COEFFICIENT).toFixed(1);
}
function getMarvinLevelValue (levelEffect) {
  let marvinLev = levelEffect.toString();
  marvinLev += '%';
  return marvinLev;
}
function getHeatLevelValue (levelEffect) {
  const heatLev = (levelEffect / constantsForEffects.SCALE_COEFFICIENT) * constantsForEffects.BRIGHT_MULTIPLIER + constantsForEffects.MINIMAL_BRIGHT;
  return heatLev.toFixed(1);
}
function getPhobosLevelValue (levelEffect) {
  let phobosLev = levelEffect * constantsForEffects.MAXIMAL_BLUR / constantsForEffects.SCALE_COEFFICIENT;
  phobosLev = phobosLev.toFixed(1);
  let phobosLevString = phobosLev.toString();
  phobosLevString += 'px';
  return phobosLevString;
}
function changeLevelEffect (levelEffect) {
  switch (effectId) {
    case 'effect-chrome':
      inputLevelValue.value = getDefaultLevelValue(levelEffect);
      imgUploadPreview.style.filter = `grayscale(${getDefaultLevelValue(levelEffect)})`;
      break;
    case 'effect-sepia':
      inputLevelValue.value = getDefaultLevelValue(levelEffect);
      imgUploadPreview.style.filter = `sepia(${getDefaultLevelValue(levelEffect)})`;
      break;
    case 'effect-phobos':
      inputLevelValue.type = 'text';
      inputLevelValue.value = getPhobosLevelValue(levelEffect);
      imgUploadPreview.style.filter = `blur(${getPhobosLevelValue(levelEffect)})`;
      break;
    case 'effect-marvin':
      inputLevelValue.type = 'text';
      inputLevelValue.value = getMarvinLevelValue(levelEffect);
      imgUploadPreview.style.filter = `invert(${getMarvinLevelValue(levelEffect)})`;
      break;
    case 'effect-heat':
      inputLevelValue.value = getHeatLevelValue(levelEffect);
      imgUploadPreview.style.filter = `brightness(${getHeatLevelValue(levelEffect)})`;
      break;
  }
}
function createSliderEffect () {
  noUiSlider.create(sliderEffect, {
    range: {
      min: 0,
      max: 100,
    },
    start: 0,
    step: 1,
    connect: 'lower',
  });
  sliderEffect.noUiSlider.on('update', effectUpdateHandler);
}
function applyEffect (effect) {
  effectId = effect.getAttribute('id');
  if(effectId === 'effect-none' && sliderEffect.hasChildNodes()) {
    effectValue.style.opacity = 0;
    sliderEffect.noUiSlider.destroy();
  }
  if(effectId !== 'effect-none' && !sliderEffect.hasChildNodes()) {
    effectValue.style.opacity = 1;
    createSliderEffect(effectId);
  }
  if(effectId !== 'effect-none' && sliderEffect.hasChildNodes()) {
    sliderEffect.noUiSlider.set(0);
  }
  const effectName = effectId.slice(constantsForEffects.EFFECT_ID_NUMBER);
  const pictureClassName = `effects__preview--${effectName}`;
  imgUploadPreview.classList.add(pictureClassName);
}
function effectUpdateHandler (_, handle, unencoded) {
  const levelEffect = unencoded[handle];
  changeLevelEffect(levelEffect);
}
function newDefaultSetting () {
  removeEffects();
  imgUploadPreview.style.removeProperty('filter');
  inputLevelValue.value = '';
}
function inputEffectsHandler (evt) {
  newDefaultSetting();
  applyEffect(evt.target);
}
function removeEffectsHandlers () {
  scaleToSmall.removeEventListener('click', scaleToSmallClickHandler);
  scaleToBig.removeEventListener('click', scaleToBigClickHandler);
  for(let i = 0; i < inputEffects.length; i++) {
    inputEffects[i].removeEventListener('click', inputEffectsHandler);
  }
}
function setDefaultSetting () {
  setDefaultScale();
  setDefaultEffects();
  for(let i = 0; i < inputEffects.length; i++) {
    inputEffects[i].addEventListener('click', inputEffectsHandler);
  }
}
export { setDefaultSetting, removeEffectsHandlers };
