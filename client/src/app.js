const Countries = require('./models/countries.js');
const MapSelectView = require('./views/map_select_view.js');
<<<<<<< Updated upstream
const CountryView = require('./views/country_view.js')

||||||| merged common ancestors
const CountryView = require('./views/country_view.js')


=======
const CountryView = require('./views/country_view.js');
const GiniChartView = require('./views/gini_chart_view.js');

>>>>>>> Stashed changes
document.addEventListener('DOMContentLoaded', () => {
  const selectElement = document.querySelector('#select');
  const mapSelectView = new MapSelectView(selectElement);
  mapSelectView.bindEvents();

  const displayElement = document.querySelector('#display');
  const countryView = new CountryView(displayElement);
  countryView.bindEvents();


  const giniChartView = new GiniChartView(displayElement);
  giniChartView.bindEvents();

  const countries = new Countries;
  countries.getData();
  countries.bindEvents();
})
