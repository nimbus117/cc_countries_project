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
};

Wikipedia.prototype.getData = function (countryName) {
  new Request(`http://localhost:3000/wikipedia/${countryName}`)
  .get()
  .then(data => {
    this.data = data;
    const countryData = this.data.query.pages;
    const countryDataText = Object.values(countryData)[0].extract;
    PubSub.publish('Wikipedia:country-text', countryDataText);
    console.log(countryDataText);
  })
  .catch(console.error)
};







module.exports = Wikipedia;
