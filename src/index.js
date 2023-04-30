import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import './css/styles.css';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const inputField = document.querySelector('input#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

inputField.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(evt) {
  const name = evt.target.value.trim();

  if (name === '') {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    return;
  }

  fetchCountries(name)
    .then(findCountry)
    .catch(error => console.log(error));
}

function findCountry(countries) {
  const arrCountry = countries.length;
  // console.log(arrCountry);

  if (arrCountry > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }
  if (arrCountry >= 2 && arrCountry < 10) {
    countryInfo.innerHTML = '';
    return createMarcupAll(countries);
  }
  if (arrCountry < 2) {
    countryList.innerHTML = '';
    return createCountryMarcup(countries);
  }
}

function createMarcupAll(countries) {
  const marcupAll = countries
    .map(country => {
      return `<div class="country-all">
  <img class="country-img" src="${country.flags.svg}" alt="the flag of ${country.name.official}">
<p class="country-name-all">${country.name.official}</p>
</div>`;
    })
    .join('');
  countryList.innerHTML = marcupAll;
}

function createCountryMarcup(countries) {
  const marcupCountry = countries
    .map(country => {
      return `
      <div class="country">
    <img class="country-img" src="${country.flags.svg}" alt="the flag of ${
        country.name.official
      }">
    <h2 class="country-name">${country.name.official}</h2>
    </div>
  <ul class="country-info">
      <li><span class="country-info_item">Capital:</span> ${
        country.capital
      }</li>
      <li><span class="country-info_item">Population:</span> ${
        country.population
      }</li>
  <li><span class="country-info_item">Languages:</span> ${Object.values(
    country.languages
  ).join(', ')}</li>
</ul>
</div>`;
    })
    .join('');
  countryInfo.innerHTML = marcupCountry;
}
