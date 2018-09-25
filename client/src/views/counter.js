const PubSub = require('../helpers/pub_sub.js');
const createAppend = require('../helpers/create_append.js');

const Counter = function (element) {
  this.element = element;
  this.cArray = [];
  this.percentage = 0.0;
}

Counter.prototype.bindEvents = function () {
  PubSub.subscribe('Countries:counter-data', (event) => {
    this.addData(event.detail);
    this.update();
  });
};

Counter.prototype.addData = function (index) {
  if (this.cArray.find(e => e===index)) {
    return;
  }
  this.cArray.push(parseInt(index));
  console.log(this.cArray);
  this.percentage = (this.cArray.length / 250) * 100;
};

Counter.prototype.update = function () {
  this.element.innerHTML = '';
  const display = createAppend('h3', `You have viewed ${this.cArray.length} countries so far, ${this.percentage}% of the total!`, this.element);
};
module.exports = Counter;
