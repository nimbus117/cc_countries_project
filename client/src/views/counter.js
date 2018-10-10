const PubSub = require('../helpers/pub_sub.js');

const Counter = function (element) {
  this.element = element;
  this.countryIndexes = [];
}

Counter.prototype.bindEvents = function () {
  PubSub.subscribe('Countries:country-data', e => {
    this.addData(e.detail.index);
    this.render();
  });
};

Counter.prototype.addData = function (countryIndex) {
  if (!this.countryIndexes.includes(countryIndex)) {
    this.countryIndexes.push(countryIndex);
  }
};

Counter.prototype.render = function () {
  const percentage = ((this.countryIndexes.length / 250) * 100).toFixed(1);
  const content = `${this.countryIndexes.length} countries viewed (${percentage}%)`;
  this.element.innerHTML = content;
};
module.exports = Counter;
