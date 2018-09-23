const PubSub = require('../helpers/pub_sub.js');
const createAppend = require('../helpers/create_append.js');
const MapView = require('./map_view.js');


const CountryView = function(element) {
  this.element = element;
}

CountryView.prototype.bindEvents = function () {
  PubSub.subscribe('Countries:country-data', (event) => {
    const data = event.detail;
    this.render(data);
  })
};

CountryView.prototype.render = function (data) {
  this.element.innerHTML = '';
  let name= '';
  if (data.name === data.nativeName) {name = data.name}
  else {name = `${data.name} (${data.nativeName})`}
  const list = createAppend('ul', '', this.element)
  createAppend("li", name, list);
  createAppend("li", `Region: ${data.region}`, list);
  createAppend("li", `Capital City: ${data.capital}`, list);
  createAppend("li", `Population: ${data.population}`, list);
  createAppend("li", `Demonym: ${data.demonym}`, list);
  createAppend("li", `Area in square Km: ${data.area}`, list);
  createAppend("li", `Gini co-efficient: ${data.gini}`, list);

  const tz = createAppend("li", `Timezones:`, list);
  const tzList = createAppend('ul', '', tz)
  data.timezones.forEach(tz => createAppend('li', tz, tzList));

  const cur = createAppend("li", "Currencies:", list);
  const cList = createAppend("ul", '', cur);
  data.currencies.forEach(cu => createAppend('li', `${cu.name} (${cu.symbol})`, cList));

  const lang = createAppend("li", "Languages:", list);
  const langList = createAppend("ul", '', lang);
  data.languages.forEach(la => createAppend('li', `${la.name} (${la.nativeName})`, langList));

  const flag = createAppend("img", '', this.element);
  flag.src = data.flag;
  flag.alt = `The ${data.demonym} flag`;

  const mapDiv = createAppend("div", '', this.element);
  mapDiv.className = "mapid";
  const mapElement = document.querySelector('#mapid');
  const mapView = new MapView(mapElement);
  mapView.bindEvents();
};


module.exports = CountryView;
