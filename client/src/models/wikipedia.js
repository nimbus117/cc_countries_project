const PubSub = require('../helpers/pub_sub.js');
const Request = require('../helpers/request.js');

const Wikipedia = function() {
  this.data = null;
};

Wikipedia.prototype.bindEvents = function () {
  PubSub.subscribe('Countries:country-data', (event) => {
    countryName = event.detail.name;
    this.getData(countryName);
  });
  // publish wiki country blurb
};

Wikipedia.prototype.getData = function (countryName) {
  new Request(`http://localhost:3000/wikipedia/${countryName}`)
  .get()
  .then(data => {
    console.log(data);
  })
};







module.exports = Wikipedia;
