const PubSub = require('../helpers/pub_sub.js');
const createAppend = require('../helpers/create_append.js');

const SelectView = function(element) {
  this.element = element;
};

SelectView.prototype.bindEvents = function () {
  PubSub.subscribe('Countries:country-names', (event) => {
    const countryNames = event.detail;
    this.populate(countryNames);
  });
  this.element.addEventListener('change', (event) => {
    PubSub.publish('SelectView:country-name', event.target.value);
  });
};

SelectView.prototype.populate = function (names) {
  names.forEach(name => {
    createAppend('option', name, this.element)
  });
};

module.exports = SelectView;
