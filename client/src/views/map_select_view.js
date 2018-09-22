const PubSub = require('../helpers/pub_sub.js');
const createAppend = require('../helpers/create_append.js');
const SelectView = require('./select_view.js');

const MapSelectView = function(element) {
  this.element = element;
};

MapSelectView.prototype.bindEvents = function () {
  PubSub.subscribe('Countries:country-names', (event) => {
    this.renderMap();
    this.renderSelectView(event.detail);
  });
};

MapSelectView.prototype.renderMap = function () {

}

MapSelectView.prototype.renderSelectView = function (countries) {
  const selectView = new SelectView(this.element);
  selectView.create('countries-select', 'Select a country:')
  selectView.bindEvents('SelectView:country-name');
  selectView.populate(countries);
}

module.exports = MapSelectView;
