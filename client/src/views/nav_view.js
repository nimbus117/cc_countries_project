const PubSub = require('../helpers/pub_sub.js');
const createAppend = require('../helpers/create_append.js');
const SelectView = require('./select_view.js');
const GiniChartView = require('./views/gini_chart_view.js');
const MapSelectView = require('./views/map_select_view.js');
const CountryView = require('./views/country_view.js')

const NavView = function(element) {
  this.element = element;
};

NavView.prototype.bindEvents = function () {
  const navdiv = createAppend('div', '', this.element);
  navdiv.className = "topnav";
  navdiv.id = "navbar";

  const map = createAppend('a', 'Map Select', navdiv);
  map.href = "#map";

  const graph = createAppend('a', 'Global Graphs', navdiv);
  graph.href = "#graphs";

  const about = createAppend('a', 'About', navdiv);
  about.style = "float:right;";
  about.href = "#about";

  const dropdown = createAppend('a', '', navdiv);
  dropdown.style = "float:right;";
  dropdown.id = "drop";

  PubSub.subscribe('Countries:country-names', (event) => {
    this.renderSelectView(event.detail.map(c => c.name), dropdown);
  });


};

  NavView.prototype.renderSelectView = function (countries, navdiv) {
    const selectView = new SelectView(navdiv);
    selectView.create('countries-select', 'Select a country: ');
    selectView.bindEvents('SelectView:country-index');
    selectView.populate(countries);
  }


module.exports = NavView;
