const PubSub = require('../helpers/pub_sub.js');
const Request = require('../helpers/request.js');

const Wikipedia = function() {

};

Wikipedia.prototype.bindEvents = function () {
  PubSub.subscribe('Countries:country-data', (event) => {
    const countryData = event.detail;
    console.log(countryData);
    // this.getData(countryData);
  });
  // publish
};







module.exports = Wikipedia;
