const PubSub = require('../helpers/pub_sub.js');
const createAppend = require('../helpers/create_append.js');
const SelectView = require('./map_select_view.js');

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

};

module.exports = NavView;
