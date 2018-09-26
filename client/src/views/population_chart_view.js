const PubSub = require('../helpers/pub_sub.js');
const createAppend = require('../helpers/create_append.js');
const Highcharts = require('highcharts')
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/variable-pie')(Highcharts);

const PopulationChartView = function(element) {
  this.element = element;
  this.allCountries = null;
};

PopulationChartView.prototype.bindEvents = function () {
  PubSub.subscribe('Countries:all-data', (event) => {
    this.allCountries = event.detail;
    this.renderPopulation(event.detail);
  });
};


PopulationChartView.prototype.getDensities = function () {
  const preparedInfo = [];
  this.allCountries.forEach(country => {

  if (country.area && country.population && (country.population / country.area !== Infinity)) {

    const eachCountry = {
      name: country.name,
      y: country.area,
      z: country.population / country.area
    }


    preparedInfo.push(eachCountry)
  }
})

  // const china = preparedInfo.find((country) => {
  //   return country.name === "China"
  // })
  // console.log(china);

  const finalResult = preparedInfo.sort((a, b) => (b.z - a.z))
  .filter((country) => {
    return country.z
  }).splice(0, 10);
  return finalResult
};



PopulationChartView.prototype.renderPopulation = function () {
  const top_ten = this.getDensities();
  const element = createAppend('div', '', this.element);
  element.id = 'population-donut';

  Highcharts.chart(element, {
    chart: {
      type: 'variablepie'
    },
    title: {
      text: 'Population Density Donut'
    },
    subtitle: {
      text: 'Top 10 countries compared by population density and area'
    },
    tooltip: {
      headerFormat: '',
      pointFormat: '<span style="color:{point.color}">●</span> <b> {point.name}</b><br/>' +
      'Area (square km): <b>{point.y}</b><br/>' +
      'Population density (people per square km): <b>{point.z}</b><br/>'
    },
    series: [{
      minPointSize: 10,
      innerSize: '20%',
      zMin: 0,
      name: 'countries',
      data: top_ten,
      cursor: 'pointer',
      point:{
        events:{
          click: event => {
            const selectedCountry = this.allCountries.findIndex((item) => {
              return item.name === event.point.name
            })
            PubSub.publish('SelectView:country-index', selectedCountry);
          }
        }
      }
    }]
  });
};



module.exports = PopulationChartView;
