const PubSub = require('../helpers/pub_sub.js');
const Request = require('../helpers/request.js');

const Countries = function () {
  this.data = [];
}

Countries.prototype.bindEvents = function () {
  PubSub.subscribe('SelectView:country-name', (event) => {
    this.publishCountry(event.detail);
  });
};

Countries.prototype.getData = function () {
  new Request('https://restcountries.eu/rest/v2/all')
    .get()
    .then(data => this.publishCountryNames(data))
    .catch(console.error)
}

Countries.prototype.publishCountryNames = function (data) {
  this.data = data;
  const countryNames = data.map(country => country.name);
  // console.log(countryNames);
  PubSub.publish('Countries:country-names', countryNames);
}

Countries.prototype.publishCountry = function (name) {
  const country = this.data.find( (country) => country.name === name )
  PubSub.publish('Countries:country-data', country);
};


module.exports = Countries;
