import fetchImages from "./partials/js/fetch";
import { Notify } from "notiflix";

const formSearch = document.querySelector('#search-form')
const gallery = document.querySelector('.gallery')

let page = 1;
let currentHits = 0;
let searchQuery = '';

 formSearch.addEventListener('submit', onSearchForm);

 function onSearchForm(e) {
    e.preventDefault();    
    const searchQuery = e.currentTarget.elements.searchQuery.value;   
    console.log(searchQuery)        
    if (!searchQuery) {
      return;
    } 
    perPage = 0;
    currentPage = 1;
         
    renderMarkup()
    appendImgMarkup()  
    clearGallery();  
}


async function appendImgMarkup() {
  try {
    const resp = await fetchImages(searchQuery, page);          
    const {
      data: { hits, totalHits },
    } = response; 
    gallery.insertAdjacentHTML('beforeend', renderMarkup(hits)); 

    if (hits.length === 0 && totalHits === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );  
      return;
    } 
        
  } catch (error) {
    console.log(error);
  }  
} 

function renderMarkup(hits) {
        return hits
      .map(
        ({
          webformatURL,
          largeImageURL,
          likes,
          views,
          comments,
          tags,
          downloads,
        }) => {
          return `<div class='photo-card'>
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
    </div>`;
        }
      )
      .join('');          
  }
  
  function clearGallery() {
    gallery.innerHTML = '';
  }
    
 






