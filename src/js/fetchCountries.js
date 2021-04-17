import countriesCardTpl from '../templates/countries-card.hbs';
import countriesListTpl from '../templates/countries-list.hbs';
import debounce from 'lodash.debounce';
// import notification from './pnotify.js';
import refs from './refs.js';

function fetchCountries(nameCountry, error) {
  return fetch(`https://restcountries.eu/rest/v2/name/${nameCountry}`).then(
    response => {
      if (!response.ok) {
        return onFetchError(error);
      } else {
        return response.json();
      }
    },
  );
}

function renderCountryCard(name) {
  if (name.length > 1) {
    const markup = countriesListTpl(name);
    refs.cardCountries.innerHTML = markup;

    if (name.length >= 10) {
      return notification(
        'Результат ввода более 10 стран. Пожалуйста введите более конкретный запрос',
      );
    }
  } else {
    const markup = countriesCardTpl(name);
    console.log(name.length);
    refs.cardCountries.innerHTML = markup;
  }
}

refs.searchInput.addEventListener('input', receivesTextFromInput);

function receivesTextFromInput(evt) {
  evt.preventDefault();
  const searchCountrie = evt.currentTarget.value;
  debounsOnInput(searchCountrie);
}

function onFetchError(error) {
  (refs.cardCountries.innerHTML = ''),
    notification('По вашему запросу страны нет');
}

const debounsOnInput = debounce(onSearch, 500);

function onSearch(searchCountrie) {
  fetchCountries(searchCountrie)
    .then(renderCountryCard)
    .catch(error => onFetchError)
    .finally(() => {
      refs.searchInput.value = '';
    });
}
