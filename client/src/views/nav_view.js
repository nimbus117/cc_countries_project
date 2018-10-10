const PubSub = require('../helpers/pub_sub.js');
const createAppend = require('../helpers/create_append.js');
const SelectView = require('./select_view.js');

const NavView = function(element) {
  this.element = element;
};

NavView.prototype.navButtons = function (name) {
  const element = createAppend('span', name, this.element);
  element.classList.add('nav-button');
  element.addEventListener('click', e => {
    PubSub.publish('NavView:button-click', name.toLowerCase())
  })
}

NavView.prototype.bindEvents = function () {
  this.navButtons('Map');
  this.navButtons('Charts');
  this.navButtons('Flag Quiz');

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
