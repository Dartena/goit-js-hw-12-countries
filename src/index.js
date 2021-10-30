import './sass/main.scss';

// Import JS modules
import fetchCountries from './js/fetchCountries';

// Import 
import { alert } from '../node_modules/@pnotify/core/dist/PNotify.js';
const debounce = require('lodash.debounce');

// Import Templates
import listItemTmp from './templates/countries-list.hbs';
import countryInfoTmp from './templates/country.hbs';

const refs = {
    searchInput: document.querySelector('#cntry-search-input'),
    countryDiv: document.querySelector('.js-countries-container'),
};

function renderListItems(countries) {    
    if (countries.length > 10) {
        alert({
            text: 'Too many matches found. Please enter a more specific query',
            type: 'error',
            closer: false,
            sticker: false,
            width: '360px',
            delay: 1000,
        });
    } else if (countries.length > 1 && countries.length < 10) {
        const listItem = listItemTmp(countries);
        refs.countryDiv.insertAdjacentHTML('beforeend', listItem);
    } else if (countries.length === 1) {
        const countryInfo = countryInfoTmp(...countries)
        refs.countryDiv.insertAdjacentHTML('beforeend', countryInfo);
        console.log(countries);
    } else {
        alert({
            text: 'Nothing found. You enter invalid country name.',
            type: 'error',
            closer: false,
            sticker: false,
            width: '360px',
            delay: 1000,
        })
    }
}

function OnInput(event) {
    const inputValue = event.target.value.trim();
    refs.countryDiv.innerHTML = '';
    if(inputValue) {
        fetchCountries(inputValue)
            .then((countries) => {
                renderListItems(countries)
            });
    };    
};

refs.searchInput.addEventListener('input', debounce(OnInput, 500));
