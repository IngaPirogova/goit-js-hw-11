const axios = require('axios').default;
export default async function fetchImages(name, page, per_page) {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=31233349-657dbeb08b09bae80b555b3c4&q=${name}&page=${page}&per_page=${per_page}&image_type=photo&orientation=horizontal&safesearch=true`,
    );
    return response;
    
  } catch (error) {
    console.error(error);
  }
}
console.log(fetchImages())
























// import axios from "axios";

// export async function fetchImages(searchQuery, page) {

// const KEY_API = '31233349-657dbeb08b09bae80b555b3c4';
// const BASE_URL = 'https://pixabay.com/api/';
// const options = `?key=${KEY_API}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
    
// return await axios.get(`${BASE_URL}${options}`).then(response => response.data);
// }
// console.log(fetchImages())
