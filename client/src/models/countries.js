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

  PubSub.subscribe('CountryView:quiz-button', e => {
    this.publishCountryQuiz(e.detail)
  })

  PubSub.subscribe('NavView:button-click', e => {
    switch (e.detail) {
      case 'map':
        this.publishSelectDetails(); break;
      case 'charts':
        this.publishAllDetails(); break;
      case 'flag':
        this.startFlagGame(); break;
    }
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
    })
    .catch(console.error)
}

Countries.prototype.publishSelectDetails = function () {
  const countryDetails = this.data.map((country, index) => {
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
}

Countries.prototype.startFlagGame = function () {
  PubSub.publish('Countries:flag-game-data', this.data);
};

Countries.prototype.publishCountry = function (index) {
  const details = this.data[index];
  details['totalPopulation'] = this.totalPopulation;
  details['totalArea'] = this.totalArea;
  details['index'] = index;
  PubSub.publish('Countries:country-data', details);
};

Countries.prototype.publishCountryQuiz = function (countryIndex) {
  const country = this.data[countryIndex];
  let otherCountries = this.data .filter(c => c.region !== country.region);
  const testCountries = [];
  for (let x = 3; x > 0; x--) {
    const testCountry = otherCountries[Math.floor(Math.random() * otherCountries.length)];
    testCountries.push(testCountry);
    otherCountries = otherCountries.filter(c => c.region !== testCountry.region);
  }
  PubSub.publish('Countries:country-quiz', {true: country, false: testCountries})
}

module.exports = Countries;
