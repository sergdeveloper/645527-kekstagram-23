const constsForScale = {
  SCALE_STEP: 0.25,
  SCALE_MINIMAL_VALUE: 0.25,
  SCALE_MAXIMAL_VALUE: 1,
  SCALE_DEFAULT_VALUE: '100%',
  SCALE_COEFFICIENT: 100,
};
const uploadOverlay = document.querySelector('.img-upload__overlay');
const inputScaleControl = uploadOverlay.querySelector('.scale__control--value');
const uploadPreview = uploadOverlay.querySelector('.img-upload__preview');
const scaleToSmall = uploadOverlay.querySelector('.scale__control--smaller');
const scaleToBig = uploadOverlay.querySelector('.scale__control--bigger');
function getScale (percent) {
  const numberPercent = Number(percent.slice(0, -1));
  return numberPercent / constsForScale.SCALE_COEFFICIENT;
}
inputScaleControl.value = constsForScale.SCALE_DEFAULT_VALUE;
let currentScale = getScale(inputScaleControl.value);
function changeScale (changedScale) {
  uploadPreview.style.transform = `scale(${changedScale})`;
  changedScale = changedScale * constsForScale.SCALE_COEFFICIENT;
  const scaleString = `${changedScale.toString()}%`;
  inputScaleControl.value =  scaleString;
  currentScale = getScale(scaleString);
  if(currentScale === constsForScale.SCALE_MINIMAL_VALUE) {
    scaleToSmall.setAttribute('disabled', 'disabled');
  }
  if(currentScale === constsForScale.SCALE_MAXIMAL_VALUE) {
    scaleToBig.setAttribute('disabled','disabled');
  }
}
function maximizeScale () {
  if(currentScale < constsForScale.SCALE_MAXIMAL_VALUE) {
    if(scaleToSmall.hasAttribute('disabled')) {
      scaleToSmall.removeAttribute('disabled');
    }
    const changedScale = currentScale + constsForScale.SCALE_STEP;
    changeScale(changedScale);
  }
}
function minimizeScale () {
  if(currentScale > constsForScale.SCALE_MINIMAL_VALUE) {
    if(scaleToBig.hasAttribute('disabled')) {
      scaleToBig.removeAttribute('disabled');
    }
    const changedScale = currentScale - constsForScale.SCALE_STEP;
    changeScale(changedScale);
  }
}
function scaleToSmallClickHandler () {
  minimizeScale();
}
function scaleToBigClickHandler () {
  maximizeScale();
}
export { scaleToSmallClickHandler, scaleToBigClickHandler };
