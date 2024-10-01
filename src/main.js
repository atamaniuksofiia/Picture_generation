import { fetchImages, createImageMarkup } from './js/render-functions';
import { BASE_URL, API_KEY } from './js/pixabay-api.js';
import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.js-load-more');

let query = '';
let page = 1;

const lightbox = new SimpleLightbox('.gallery a');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    query = document.querySelector('input[name="query"]').value.trim();
    if (!query) {
        iziToast.error({
            title: 'Error',
            message: 'Search query cannot be empty.',
        });
        return;
    }

    gallery.innerHTML = '';
    page = 1;
    loadMoreBtn.classList.add('is-hidden');

    try {
        const images = await fetchImages(query, page);
        const markup = createImageMarkup(images);
        gallery.innerHTML = markup;
        loadMoreBtn.classList.remove('is-hidden');
    } catch (error) {
        console.error(error);
        iziToast.error({
            title: 'Error',
            message: 'An error occurred while fetching images. Please try again later.',
        });
    }
});

loadMoreBtn.addEventListener('click', async () => {
    page += 1;
    try {
        const images = await fetchImages(query, page);
        createImageMarkup(images, lightbox); // Передаємо lightbox
    } catch (error) {
        console.error(error);
        iziToast.error({
            title: 'Error',
            message: 'An error occurred while fetching images. Please try again later.',
        });
    }
});