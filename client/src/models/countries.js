const PubSub = require('../helpers/pub_sub.js');
const Request = require('../helpers/request.js');

const Countries = function () {
  this.data = [];
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
      this.publishSelectDetails(data);
      this.publishAllDetails();
    })
    .catch(console.error)
}

Countries.prototype.publishSelectDetails = function (data) {
  this.data = data;
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
  PubSub.publish('Countries:country-data', this.data[index]);
};


module.exports = Countries;
