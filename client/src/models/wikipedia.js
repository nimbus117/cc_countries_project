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
  new Request(`http://localhost:3000/wikipedia/${this.name}`)
  .get()
  .then(data => {
    this.data = data;
    const countryData = this.data.query.pages;
    const countryDataText = Object.values(countryData)[0].extract;
    PubSub.publish('Wikipedia:country-text', countryDataText);
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
  console.log(this.name);
};







module.exports = Wikipedia;
