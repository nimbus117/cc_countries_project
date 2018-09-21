const Countries = require('./models/countries.js');
const SelectView = require('./views/select_view.js');
const CountryView = require('./views/country_view.js')

document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript Loaded');

  const selectElement = document.querySelector('#countries');
  const selectView = new SelectView(selectElement);
  selectView.bindEvents();

  const displayElement = document.querySelector('#display');
  const countryView = new CountryView(displayElement);
  countryView.bindEvents();

  const countries = new Countries;
  countries.getData();
  countries.bindEvents();
})
