const PubSub = require('../helpers/pub_sub.js');
const createAppend = require('../helpers/create_append.js');

const SelectView = function(element) {
  this.element = element;
  this.select = null;
};

SelectView.prototype.create = function (selectId, selectText) {
  const label = createAppend('label', selectText, this.element);
  label.setAttribute('for', selectId);
  const select = createAppend('select', '', this.element)
  select.id = selectId;
  this.select = select;
  const option = createAppend('option', name, select);
  option.setAttribute('disabled', true);
  option.setAttribute('selected', true);
};

SelectView.prototype.bindEvents = function (pubChannel) {
  this.element.addEventListener('change', (event) => {
    PubSub.publish(pubChannel, event.target.value);
  });
};

SelectView.prototype.populate = function (names) {
  names.forEach((name, index) => {
    const option = createAppend('option', name, this.select);
    option.value = index;
  });
};

module.exports = SelectView;
