import axios from "axios";

//ф-ция поиска и ретурн результата поиска
export async function fetchImages(searchQuery, page) {

const KEY_API = '31233349-657dbeb08b09bae80b555b3c4';
const BASE_URL = 'https://pixabay.com/api/';
const options = `?key=${KEY_API}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
    
const searchImg = await axios.get(`${BASE_URL}${options}`)
return searchImg.data
}




