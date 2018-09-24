const PubSub = require('../helpers/pub_sub.js');
const createAppend = require('../helpers/create_append.js');
const MapView = require('./map_view.js');


const CountryView = function(element) {
  this.element = element;
}

CountryView.prototype.bindEvents = function () {
  PubSub.subscribe('Countries:country-data', e => this.render(e.detail))
};

CountryView.prototype.render = function (c) {
  this.element.innerHTML = '';
  const name = c.name === c.nativeName ? c.name : `${c.name} (${c.nativeName})`;
  createAppend("h2", name, this.element);
  const list = createAppend('ul', '', this.element);

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
  flag.src = data.flag;
  flag.alt = `The ${data.demonym} flag`;

  const mapDiv = createAppend("div", '', this.element)
  mapDiv.id = "mapid";
  const mapView = new MapView(mapDiv, data);
};

module.exports = CountryView;
