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
  
  let searchQuery = value.trim();

  if (searchQuery.length === 0) {
    refs.countryListRef.innerHTML = '';
    return;
    }

  fetchCountries(searchQuery).then(updateView).catch(onFetchError)

 
}

function onFetchError(error) {
   console.log(error)
  return  notify('error', ERROR_MESSAGE); 
}

function clearCountrySearchInput() {
    refs.countriesInput.value = '';
}

refs.countriesInput.addEventListener('input', debounce(onCountriesSearch, 500));

const updateView = (arr) => {
   if (arr.length >= 2 & arr.length <= 10) {
     renderCountryMarkup(CountryList, arr)
    setTimeout(clearCountrySearchInput, 6000);
     
     return;
      
    };
    if (arr.length === 1) {
      renderCountryMarkup(countryCard, arr)
      setTimeout(clearCountrySearchInput, 6000);
      return;
    }
 notify('error', INFO_MESSAGE);
}

