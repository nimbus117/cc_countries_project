const Countries = require('./models/countries.js');
const MapSelectView = require('./views/map_select_view.js');
const CountryView = require('./views/country_view.js')
const NavView = require('./views/nav_view.js');
const GiniChartView = require('./views/gini_chart_view.js');

document.addEventListener('DOMContentLoaded', () => {
  const displayElement = document.querySelector('#display');
  const navElement = document.querySelector('#nav');

  const mapSelectView = new MapSelectView(displayElement);
  mapSelectView.bindEvents();

  const navView = new NavView(navElement);
  navView.bindEvents();

  // const countryView = new CountryView(displayElement);
  // countryView.bindEvents();
  //
  // const giniChartView = new GiniChartView(displayElement);
  // giniChartView.bindEvents();

  const countries = new Countries;
  countries.getData();
  countries.bindEvents();
});
