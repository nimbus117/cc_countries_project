const PubSub = require('../helpers/pub_sub.js');
const createAppend = require('../helpers/create_append.js');
const SelectView = require('./select_view.js');

const NavView = function(element) {
  this.element = element;
};

NavView.prototype.bindEvents = function () {
  const map = createAppend('span', 'Map', this.element);
  map.classList.add('nav-button');
  map.addEventListener('click', e => {
    PubSub.publish('NavView:button-click', 'map')
  }) 

  const charts = createAppend('span', 'Charts', this.element);
  charts.classList.add('nav-button');
  charts.addEventListener('click', e => {
    PubSub.publish('NavView:button-click', 'charts')
  }) 

  const dropdown = createAppend('span', '', this.element);
  dropdown.id = "nav-select";
  const selectView = new SelectView(dropdown);
  selectView.create('countries-select', 'Select a country: ');
  selectView.bindEvents('SelectView:country-index');
  PubSub.subscribe('Countries:country-names', (event) => {
    selectView.populate(event.detail.map(c => c.name));
  });
};

module.exports = NavView;
