import fetchImages from "./partials/js/fetch";
import { Notify } from "notiflix";

const formSearch = document.querySelector('#search-form')
const gallery = document.querySelector('.gallery')
const loadMoreBtn = document.querySelector('.load-more')
formSearch.addEventListener('submit', onSearchForm);

let page = 1;
let currentHits = 0;
let searchQuery = '';

function renderMarkup(hits) {
       return hits.map(
           ({
           webformatURL,
             largeImageURL,
             likes,
             views,
             comments,
             tags,
             downloads,
           }) => {
             return `
             <div class='photo-card'>
         <a href='${largeImageURL}'><img
             src='${webformatURL}'
             alt='${tags}'
             loading='lazy'
           /></a>
         <div class='info'>
           <p class='info-item'>
             <b>Likes</b>
             ${likes}
           </p>
           <p class='info-item'>
             <b>Views</b>
             ${views}
           </p>
           <p class='info-item'>
             <b>Comments</b>
             ${comments}
           </p>
           <p class='info-item'>
             <b>Downloads</b>
             ${downloads}
           </p>
         </div>
       </div>`
           }
         )
         .join(''),
         gallery.insertAdjacentHTML('beforeend', renderMarkup(hits));                     
    }
       
async function onSearchForm(e) {
  e.preventDefault();
  const searchQuery = e.currentTarget.elements.searchQuery.value;
      if (!searchQuery) {
         return;
    } 
   
  const response = await fetchImages(searchQuery, page);
  currentHits = response.hits.length;  

  try {
    if (response.totalHits > 0) {
      Notify.success(`Hooray! We found ${response.totalHits} images.`);
      gallery.innerHTML = '';
      renderMarkup(response.hits);   
          
    }

    if (response.totalHits === 0) {
      gallery.innerHTML = '';
      Notify.failure('Sorry, there are no images matching your search query. Please try again.');
     
    }
  } catch (error) {
    console.log(error);
  }
}





































  