const PubSub = require('../helpers/pub_sub.js');
const Request = require('../helpers/request.js');

const Countries = function () {
  this.data = [];
}

Countries.prototype.getData = function () {
  new Request('https://restcountries.eu/rest/v2/all')
    .get()
    .then(this.publishCountryNames)
    .catch(console.error)
}

Countries.prototype.publishCountryNames = function (data) {
  this.data = data;
  const countryNames = data.map(country => country.name);
  // console.log(countryNames);
  PubSub.publish('Countries:country-names', countryNames);
}

module.exports = Countries;
