const PubSub = require('../helpers/pub_sub.js');
const Request = require('../helpers/request.js');

const Wikipedia = function() {
  this.data = null;
  this.name = null;
};

Wikipedia.prototype.bindEvents = function () {
  PubSub.subscribe('Countries:country-data', (event) => {
    countryName = event.detail.name;
    this.getData(countryName);
  });
};

Wikipedia.prototype.getData = function (countryName) {
  this.fixName(countryName);
  new Request(`https://en.wikipedia.org/w/api.php?
    format=json&action=query&prop=extracts&exintro&
    explaintext&redirects=1&titles=${this.name}&origin=*`
  )
    .get()
    .then(data => {
      this.data = data;
      const countryData = Object.values(data.query.pages)[0];
      PubSub.publish('Wikipedia:country-data', countryData);
    })
    .catch(console.error)
};

Wikipedia.prototype.fixName = function (countryName) {
  switch (countryName) {
    case 'Virgin Islands (British)':
      this.name = 'British Virgin Islands'
      break;
    case 'Georgia':
      this.name = 'Georgia (Country)'
      break;
    case 'Macedonia (the former Yugoslav Republic of)':
      this.name = 'Republic of Macedonia'
      break;
    case "Korea (Democratic People's Republic of)":
      this.name = 'North Korea'
      break;
    default:
        this.name = countryName;
  }
};

module.exports = Wikipedia;
