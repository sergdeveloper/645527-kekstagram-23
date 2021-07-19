const inputOwnPicture = document.querySelector('#upload-file');
const picturePreview = document.querySelector('.img-upload__preview > img');
const ALLOWED_FORMATS = ['gif', 'jpg', 'png'];
//Переводит в нижний регистр, проверяет формат загруженного пользовательского фото
function showLoadedImage () {
  const file = inputOwnPicture.files[0];
  const fileName = file.name.toLowerCase();
  const equal = ALLOWED_FORMATS.some((it) => fileName.endsWith(it));
  if (equal) {
    const loader = new FileReader();
    loader.addEventListener('load', () => {
      picturePreview.src = loader.result;
    });
    loader.readAsDataURL(file);
  }
}
export { showLoadedImage };
