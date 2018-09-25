const Countries = require('./models/countries.js');
const MapSelectView = require('./views/map_select_view.js');
const CountryView = require('./views/country_view.js')
const NavView = require('./views/nav_view.js');
const GiniChartView = require('./views/gini_chart_view.js');
const FlagQuiz = require('./views/flag_quiz.js');
const Wikipedia = require('./models/wikipedia.js');
const LangChartView = require('./views/language_chart_view.js');
const PopulationChartView = require('./views/population_chart_view.js');
const Counter = require('./views/counter.js');
const CountryQuizView = require('./views/country_quiz_view.js');

document.addEventListener('DOMContentLoaded', () => {

  const displayElement = document.querySelector('#display');
  const navElement = document.querySelector('#nav');
  const counterElement = document.querySelector('#counter');

  const mapSelectView = new MapSelectView(displayElement);
  mapSelectView.bindEvents();

  const countryView = new CountryView(displayElement);
  countryView.bindEvents();

  const giniChartView = new GiniChartView(displayElement);
  giniChartView.bindEvents();

  const flagQuiz = new FlagQuiz(displayElement);
  flagQuiz.bindEvents();

  const langChartView = new LangChartView(displayElement);
  langChartView.bindEvents();

  const populationChartView = new PopulationChartView(displayElement);
  populationChartView.bindEvents();

  const navView = new NavView(navElement);
  navView.bindEvents();

  const wiki = new Wikipedia;
  wiki.bindEvents();

  const counter = new Counter(counterElement);
  counter.bindEvents();

  const countries = new Countries;
  countries.getData();
  countries.bindEvents();

  const countryQuizView = new CountryQuizView(displayElement);
  countryQuizView.bindEvents();
})
