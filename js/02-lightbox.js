import { galleryItems } from "./gallery-items.js";
// Change code below this line

// Чтобы не вносить изменения в HTML добавляем basicLightBox при помощи JS
const head = document.querySelector("head"); // выбираем элемент head на странице
const link = document.createElement("link"); // создаем элемент link
link.rel = "stylesheet"; // задаем атрибут rel
link.href =
  "https://cdnjs.cloudflare.com/ajax/libs/simplelightbox/2.13.0/simple-lightbox.min.css"; // задаем ссылку на файл стилей
head.appendChild(link); // добавляем элемент link в head

const body = document.querySelector("body"); // выбираем элемент body на странице
const script = document.createElement("script"); // создаем элемент script
script.src =
  "https://cdnjs.cloudflare.com/ajax/libs/simplelightbox/2.13.0/simple-lightbox.min.js"; // задаем ссылку на файл скрипта
body.appendChild(script); // добавляем элемент script в body

// Создаёт разметку по шаблону из gallery-items.js
function createGalleryMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
        <a class="gallery__link" href="${original}">
            <img
            class="gallery__image"
            src="${preview}"
            alt="${description}"
            />
        </a>
    </li>`;
    })
    .join("");
}

const galleryEl = document.querySelector(".gallery"); // Выбираем наш список с фото из галереи
galleryEl.insertAdjacentHTML("beforeend", createGalleryMarkup(galleryItems)); // Закидываем туда разметку с фотками из шаблона

script.onload = function () {
  // ждем, пока скрипт загрузится
  const lightbox = new SimpleLightbox(".gallery a", {
    captions: true, // Включаем подписи
    captionPosition: "bottom", // Внизу
    captionDelay: 250, // Появляются через 250мс
    captionsData: "alt", // Текст берут из img alt атрибута
  });
};
