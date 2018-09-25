const PubSub = require('../helpers/pub_sub.js');
const createAppend = require('../helpers/create_append.js');

const Counter = function (element) {
  this.element = element;
  this.cArray = [];
  this.percentage = 0;
}

Counter.prototype.bindEvents = function () {
  const display = createAppend('h3', `You have viewed ${this.cArray.length} countries so far, ${this.percentage}% of the total!`, this.element);
  PubSub.subscribe('Countries:counter-data', (event) => {
    this.addData(event.detail);
  });
};

Counter.prototype.addData = function (index) {
  this.cArray.push(index);
  console.log(this.cArray);
};
module.exports = Counter;
