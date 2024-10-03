export const BASE_URL = 'https://pixabay.com/api/';
export const API_KEY = '46237249-998f0f24dffb15788a2eb0e4e';

export async function fetchImages(query, page) {
    const response = await fetch(`${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=15`);
    if (!response.ok) {
        throw new Error('Failed to fetch images');
    }
    const data = await response.json();
    return Array.isArray(data.hits) ? data.hits : [];
    // { images: data.hits, totalHits: data.totalHits };
}


