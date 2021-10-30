const API_URL = 'https://restcountries.com/v2/name';

export default function fetchCountries(searchQuery) {
    const url = `${API_URL}/${searchQuery}`;
    return fetch(url)
        .then(response => response.json())
        .then(countries => countries);
};