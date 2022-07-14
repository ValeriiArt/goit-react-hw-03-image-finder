
const BASE_URL = "https://pixabay.com/api";
const API_KEY = "27064773-d5b51f526778ba93a6d48a229";
const options = {
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 12,
}

export async function fetchPictures(searchText, page) {
    const { image_type, orientation, safesearch, per_page } = options;
    const response = await fetch(`${BASE_URL}/?key=${API_KEY}&q=${searchText}&image_type=${image_type}&orientation=${orientation}&safesearch=${safesearch}&per_page=${per_page}&page=${page}`);
    return response;
};
   