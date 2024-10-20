import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { BASE_URL, API_KEY } from './pixabay-api.js';

export function createImageMarkup(images) {
    const markup = images
        .map(
            ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
            <div class="img-info-wrapper">
                <li class="gallery-item">
                    <a href="${largeImageURL}" class="gallery-link">
                        <img src="${webformatURL}" alt="${tags}" class="gallery-image width="360" " />
                    </a>
                    <div class="info">
                        <p class="info-item"><span>Likes:</span> ${likes}</p>
                        <p class="info-item"><span>Views:</span> ${views}</p>
                        <p class="info-item"><span>Comments:</span> ${comments}</p>
                        <p class="info-item"><span>Downloads:</span> ${downloads}</p>
                    </div>
                </li>
                </div>
            `)
        .join('');

    const gallery = document.querySelector('.gallery');
    gallery.insertAdjacentHTML('beforeend', markup);
}