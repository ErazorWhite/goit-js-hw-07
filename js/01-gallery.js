import { galleryItems } from "./gallery-items.js";
// Change code below this line

// Чтобы не вносить изменения в HTML добавляем basicLightBox при помощи JS
const head = document.querySelector("head"); // выбираем элемент head на странице
const link = document.createElement("link"); // создаем элемент link
link.rel = "stylesheet"; // задаем атрибут rel
link.href =
  "https://cdn.jsdelivr.net/npm/basiclightbox/dist/basicLightbox.min.css"; // задаем ссылку на файл стилей
head.appendChild(link); // добавляем элемент link в head

const body = document.querySelector("body"); // выбираем элемент body на странице
const script = document.createElement("script"); // создаем элемент script
script.src =
  "https://cdn.jsdelivr.net/npm/basiclightbox/dist/basicLightbox.min.js"; // задаем ссылку на файл скрипта
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
            data-source="${original}"
            alt="${description}"
            />
        </a>
    </li>`;
    })
    .join("");
}

// Хендлер события клика на галерею
function onGalleryItemClick(event) {
  event.preventDefault(); // Отключаем переход в новый таб по клику
  if (event.target.nodeName !== "IMG") return; // Если промазали мимо картинки, то мимо

  showLightBoxModalWindow(event.target.dataset.source); // Достаём сорс картинки из датасета и скармливаем лайтбоксу
}

// Юзаем LightBox модалку с сорсом имаджа из датасета
function showLightBoxModalWindow(imgSrc) {
  const instance = basicLightbox.create(`
    <img src="${imgSrc}" width="800" height="600">
`);

  const closeOnEscape = (event) => {
    // Функция closeOnEscape создана внутри showLightBoxModalWindow для того, чтобы быть внутри поля видимости и знать про instance
    // Да, это усложняет читаемость кода, но если декомпозировать дальше, то нужно использовать функцию-обёртку с замыканием, что тоже не сильно упростит код.
    if (event.key === "Escape") {
      instance.close(); // Закрываем
      document.removeEventListener("keydown", closeOnEscape); // Удаляем слушателя, чтобы избежать утечки памяти
    }
  };

  document.addEventListener("keydown", closeOnEscape); // Вешаем слушателя для отлова нажатия Escape

  instance.show(); // открываем модальное окно
}

const galleryEl = document.querySelector(".gallery"); // Выбираем наш список с фото из галереи
galleryEl.insertAdjacentHTML("beforeend", createGalleryMarkup(galleryItems)); // Закидываем туда разметку с фотками из шаблона

galleryEl.addEventListener("click", onGalleryItemClick); // Вешаем на галерею слушателя события клика
