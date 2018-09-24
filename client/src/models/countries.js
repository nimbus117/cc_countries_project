const PubSub = require('../helpers/pub_sub.js');
const Request = require('../helpers/request.js');

const Countries = function () {
  this.data = [];
  this.totalPopulation = null;
  this.totalArea = null;
}

Countries.prototype.bindEvents = function () {
  PubSub.subscribe('SelectView:country-index', (event) => {
    this.publishCountry(event.detail);
  });
};

Countries.prototype.getData = function () {
  new Request('https://restcountries.eu/rest/v2/all')
    .get()
    .then(data => {
      this.data = data;
      this.totalPopulation = data.reduce((total, c) => total + c.population, 0);
      this.totalArea = data.reduce((total, c) => total + c.area, 0);
      this.publishSelectDetails(data);
      this.publishAllDetails();
    })
    .catch(console.error)
}

Countries.prototype.publishSelectDetails = function (data) {
  const countryDetails = data.map((country, index) => {
    return {
      name: country.name,
      value: index,
      code: country.alpha3Code
    }
  });
  PubSub.publish('Countries:country-names', countryDetails);
}

Countries.prototype.publishAllDetails = function () {
  PubSub.publish('Countries:all-data', this.data);
  console.log("yolo2")
}

Countries.prototype.publishCountry = function (index) {
  const details = this.data[index];
  details['totalPopulation'] = this.totalPopulation;
  details['totalArea'] = this.totalArea;
  PubSub.publish('Countries:country-data', details);
};

module.exports = Countries;
