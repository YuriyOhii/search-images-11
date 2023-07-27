import refs from './js/refs.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Pixabay from './js/pixabay-api.js';
import markupAllCards from './js/card-template.js';


const pixabay = new Pixabay();

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  refs.notification.style.display = 'none';
  refs.gallery.innerHTML = '';
  pixabay.params.page = 1;
  pixabay.query = e.target.elements.searchQuery.value;
  renderData();
}

async function onLoadMoreBtnClick() {
  pixabay.increasePageNumber();
  try {
    const data = await pixabay.fetchData();
    Notify.success(`Hooray! We found ${data.totalHits} images`);
    const galleryMarkup = markupAllCards(data);
    refs.gallery.insertAdjacentHTML('beforeend', galleryMarkup);
    toHideLoadMoreBtn(data);
  } catch (error) {
    Notify.failure('Сталася помилка');
  }
}
function toHideLoadMoreBtn(data) {
  console.log(data.totalHits);
  const shownPages = Math.floor(data.totalHits / 40);
  refs.addMoreBtn.style.display =
    shownPages < pixabay.params.page ? 'none' : 'block';
  if (refs.addMoreBtn.style.display === 'none')
    refs.notification.style.display = 'block';
}

async function renderData() {
  try {
    const data = await pixabay.fetchData();
    if (!data.hits.length)
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    else {
      Notify.success(`Hooray! We found ${data.totalHits} images`);

      const galleryMarkup = markupAllCards(data);

      refs.gallery.insertAdjacentHTML('beforeend', galleryMarkup);
      toHideLoadMoreBtn(data);
      refs.addMoreBtn.addEventListener('click', onLoadMoreBtnClick);
    }
  } catch (error) {
    Notify.failure('Сталася помилка');
    console.log(error);
  }
}
