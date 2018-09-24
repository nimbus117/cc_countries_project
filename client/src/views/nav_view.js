const PubSub = require('../helpers/pub_sub.js');
const createAppend = require('../helpers/create_append.js');

const SelectView = function(element) {
  this.element = element;
  this.select = null;
};


//
// <div class="topnav" id="navbar">
//   <a href="#map" class="active">Map Select</a>
//   <a href="#graphs">Global Graphs</a>
//   <a href="#about" style="float:right;">About</a>
//   <!-- SELECT DROP DOWN -->
//   <div id="dropdown" style="float:right;"></div>
// </div>
