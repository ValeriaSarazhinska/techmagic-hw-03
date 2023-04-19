import WaifuApi from "./api.js";

const API = new WaifuApi();

const gallery = document.querySelector(".gallery");
const getRandomBtn = document.querySelector(".get-random-btn");
const getAllBtn = document.querySelector(".get-all-btn");
const getFavoritesBtn = document.querySelector(".get-favorites-btn");

gallery.addEventListener("click", addFavouriteImage);
getRandomBtn.addEventListener("click", getRandomImage);
getAllBtn.addEventListener("click", getAllImages);
getFavoritesBtn.addEventListener("click", getFavoriteImages);

function getRandomImage() {
  return getImages(API.getRandomImage);
}

function getAllImages() {
  return getImages(API.getAllImages);
}

function getFavoriteImages() {
  return getImages(API.getFavoritesImages, true);
}

function addFavouriteImage(event) {
  if (event.target.classList.contains("gallery__add")) {
    const imageId = event.target.getAttribute("id");
    API.addFavoriteImage(imageId);
  }
  if (event.target.classList.contains("gallery__delete")) {
    const imageId = event.target.getAttribute("id");
    API.deleteFavoriteImage(imageId);
    setTimeout(getFavoriteImages, 300);
  }
}

async function getImages(request, fav) {
  const response = await request();
  if (!response) {
    gallery.innerHTML = `<span class="text">Sorry, the gallery is empty...</span>`;
    return;
  }
  appendGallery(response.images, fav);
}

function appendGallery(images, fav) {
  gallery.innerHTML = "";
  const collection = images.map((image) => {
    return `<li class="gallery__item"><img class="gallery__img" 
            src="${image.url}" alt="Waifu image"/>
            ${
              !fav
                ? `<button id=${image.image_id} class="gallery__add">
            ♥
            </button>`
                : `<button id=${image.image_id} class="gallery__delete">
            ❌
            </button>`
            }</li>`;
  });
  gallery.innerHTML = collection.join("");
}
