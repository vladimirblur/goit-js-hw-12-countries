import countryCard from '../templates/countryCard.hbs'
import CountryList from '../templates/countryList.hbs'
import fetchCountries from './fetchCountries.js'
import { renderCountryMarkup }  from "./renderMarkup.js"
import refs from './refs.js'
import { notify } from './pNotify.js'
var debounce = require('lodash.debounce');

const INFO_MESSAGE = 'Too many matches found. Please enter a more specific query!';
const ERROR_MESSAGE = 'Oops,  this country does not exist'


export default function onCountriesSearch({ target: { value } }) {
  // e.preventDefault()

  const searchQuery = value.trim();

  if (searchQuery.length === 0) {
    console.log('empty')
    refs.countryListRef.innerHTML = '';
    return;
    }

  fetchCountries(searchQuery).then(arr => {
    if (arr.length >= 2 & arr.length <= 10) {
      renderCountryMarkup(CountryList, arr)
      clearCountrySearchInput()
      
    };
    if (arr.length === 1) {
      renderCountryMarkup(countryCard, arr)
      clearCountrySearchInput()
    }

  }).catch(onFetchError)

  notify('error', INFO_MESSAGE);
}

function onFetchError() {
  return  notify('error', ERROR_MESSAGE); 
}

function clearCountrySearchInput() {
    refs.countriesInput.value = '';
}

refs.countriesInput.addEventListener('input', debounce(onCountriesSearch, 500));