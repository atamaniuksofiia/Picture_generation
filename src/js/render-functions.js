import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { BASE_URL, API_KEY } from './pixabay-api.js';

export async function fetchImages(query, page = 1) {
    const params = new URLSearchParams({
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page: page,
        per_page: 15,
    });
    const url = `${BASE_URL}?${params}`;

    try {
        const response = await axios.get(url);
        if (response.status !== 200) {
            throw new Error('Network response was not ok');
        }
        return response.data.hits;
    } catch (error) {
        iziToast.error({
            title: 'Error',
            message: "Sorry, there are no images matching your search query. Please try again!",
        });
        return [];
    }
}

export function createImageMarkup(images, lightbox) {
    const markup = images
        .map(
            ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
                <li class="gallery-item">
                    <a href="${largeImageURL}" class="gallery-link">
                        <img src="${webformatURL}" alt="${tags}" class="gallery-image" />
                    </a>
                    <div class="info">
                        <p class="info-item"><span>Likes:</span> ${likes}</p>
                        <p class="info-item"><span>Views:</span> ${views}</p>
                        <p class="info-item"><span>Comments:</span> ${comments}</p>
                        <p class="info-item"><span>Downloads:</span> ${downloads}</p>
                    </div>
                </li>
            `)
        .join('');

    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = markup;
    lightbox.refresh(); // Оновлюємо lightbox
}