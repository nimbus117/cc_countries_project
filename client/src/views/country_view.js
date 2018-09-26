const PubSub = require('../helpers/pub_sub.js');
const createAppend = require('../helpers/create_append.js');
const MapView = require('./map_view.js');
const CountryChartView = require('./country_chart_view.js');

const CountryView = function(element) {
  this.element = element;
  this.countryViewBox = null;
  this.wikiDiv = null;
}

CountryView.prototype.bindEvents = function () {
  PubSub.subscribe('Countries:country-data', e => this.render(e.detail))
  PubSub.subscribe('Wikipedia:country-data', (event) => {
    this.renderWiki(event.detail);
  })
};

CountryView.prototype.render = function (c) {
  this.element.innerHTML = '';
  this.countryViewBox = createAppend('div', '', this.element);
  this.countryViewBox.id = 'country-view-box';
  const statBox = createAppend('div', '', this.countryViewBox);
  statBox.id = 'stat-box';
  const name = c.name === c.nativeName ? c.name : `${c.name} (${c.nativeName})`;
  createAppend("h2", name, statBox);
  const list = createAppend('ul', '', statBox);

  [ `Region: ${c.region}`,
    `Capital City: ${c.capital}`,
    `Population: ${c.population}`,
    `Demonym: ${c.demonym}`,
    `Area in square Km: ${c.area}`,
    `Gini co-efficient: ${c.gini}`
  ].forEach(item => createAppend('li', item, list));

  const handleSublist = function (name, template) {
    const upperCaseFirst = s => s.charAt(0).toUpperCase() + s.slice(1);
    const parent = createAppend("li", `${upperCaseFirst(name)}:`, list);
    const subList = createAppend("ul", '', parent);
    c[name].forEach(x => createAppend('li', template(x), subList));
  }
  handleSublist('timezones', x => x);
  handleSublist('currencies', x => `${x.name} (${x.symbol})`);
  handleSublist('languages', x => `${x.name} (${x.nativeName})`);
  handleSublist('regionalBlocs', x => `${x.name} (${x.acronym})`);

  this.wikiDiv = createAppend('div', '', this.countryViewBox);

  const flag = createAppend("img", '', this.countryViewBox);
  flag.src = c.flag;
  flag.alt = `The ${c.demonym} flag`;
  flag.id = 'flag-box';

  const mapDiv = createAppend("div", '', this.countryViewBox)
  mapDiv.id = "country-map";
  const mapView = new MapView(mapDiv, c);

  const populationChart = [
    {name: c.name, y: c.population},
    {name: 'World', y: c.totalPopulation - c.population}
  ]
  new CountryChartView(this.countryViewBox)
    .render(populationChart, 'World Population', 'Population', 'pop-chart')


  const areaChart = [
    {name: c.name, y: c.area},
    {name: 'World', y: c.totalArea - c.area}
  ]
  new CountryChartView(this.countryViewBox)
    .render(areaChart, 'World Area', 'Area', 'area-chart')

  const quizButton = createAppend('button', 'Take Quiz', statBox)
  quizButton.addEventListener('click', e => {
    PubSub.publish('CountryView:quiz-button', c.index)
  })
  quizButton.id = 'quiz-button';
};

CountryView.prototype.renderWiki = function (countryData) {
  this.wikiDiv.id = 'wiki-div';
  createAppend('p', countryData.extract, this.wikiDiv);
  const link = createAppend('a', 'Read full article', this.wikiDiv);
  link.href = `https://en.wikipedia.org/?curid=${countryData.pageid}`;
  link.target = '_blank';
};

module.exports = CountryView;
