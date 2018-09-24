const Countries = require('./models/countries.js');
const MapSelectView = require('./views/map_select_view.js');
const CountryView = require('./views/country_view.js')
const NavView = require('./views/nav_view.js');

document.addEventListener('DOMContentLoaded', () => {
  const selectElement = document.querySelector('#select');
  const mapSelectView = new MapSelectView(selectElement);
  mapSelectView.bindEvents();

  const displayElement = document.querySelector('#display');
  const countryView = new CountryView(displayElement);
  countryView.bindEvents();

  const navElement = document.querySelector('#nav');
  const navView = new NavView(navElement);
  navView.bindEvents();

  const countries = new Countries;
  countries.getData();
  countries.bindEvents();
})
