const PubSub = require('../helpers/pub_sub.js');
const createAppend = require('../helpers/create_append.js');
const MapView = require('./map_view.js');
const CountryChartView = require('./country_chart_view.js');

const CountryView = function(element) {
  this.element = element;
}

CountryView.prototype.bindEvents = function () {
  PubSub.subscribe('Countries:country-data', e => this.render(e.detail))
  PubSub.subscribe('Wikipedia:country-data', (event) => {
    this.renderWiki(event.detail);
  })
};

CountryView.prototype.render = function (c) {
  this.element.innerHTML = '';
  const statBox = createAppend('div', '', this.element);
  statBox.id = 'statBox';
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

  const flag = createAppend("img", '', this.element);
  flag.src = c.flag;
  flag.alt = `The ${c.demonym} flag`;
  flag.id = 'flagBox';

  const mapDiv = createAppend("div", '', this.element)
  mapDiv.id = "country-map";
  const mapView = new MapView(mapDiv, c);

  const populationChart = [
    {name: c.name, y: c.population},
    {name: 'World', y: c.totalPopulation - c.population}
  ]
  new CountryChartView(this.element)
    .render(populationChart, 'World Population', 'Population')

  const areaChart = [
    {name: c.name, y: c.area},
    {name: 'World', y: c.totalArea - c.area}
  ]
  new CountryChartView(this.element)
    .render(areaChart, 'World Area', 'Area')

  const quizButton = createAppend('button', 'Take Quiz', this.element)
  quizButton.addEventListener('click', e => {
    PubSub.publish('CountryView:quiz-button', c.index)
  })
  quizButton.id = 'quizButton';
};

CountryView.prototype.renderWiki = function (countryData) {
  const wikiDiv = createAppend('div', '', this.element);
  wikiDiv.id = 'wiki-div';
  createAppend('p', countryData.extract, wikiDiv);
  const link = createAppend('a', 'Read full article', wikiDiv);
  link.href = `https://en.wikipedia.org/?curid=${countryData.pageid}`;
  link.target = '_blank';
};

module.exports = CountryView;
