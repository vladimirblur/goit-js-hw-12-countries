import refs from './refs.js'

export const renderCountryMarkup = (template, arr) => {
  const countryLayout = template(arr);
  return refs.countryListRef.innerHTML = countryLayout;

}




