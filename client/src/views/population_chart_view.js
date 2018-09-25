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

PopulationChartView.prototype.renderPopulation = function () {
  const element = createAppend('div', '', this.element);
  element.id = 'population-donut';

  Highcharts.chart(element, {
  chart: {
    type: 'variablepie'
  },
  title: {
    text: 'Countries compared by population density and total area.'
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
    data: [{
      name: 'Spain',
      y: 505370,
      z: 92.9
    }, {
      name: 'France',
      y: 551500,
      z: 118.7
    }, {
      name: 'Poland',
      y: 312685,
      z: 124.6
    }, {
      name: 'Czech Republic',
      y: 78867,
      z: 137.5
    }, {
      name: 'Italy',
      y: 301340,
      z: 201.8
    }, {
      name: 'Switzerland',
      y: 41277,
      z: 214.5
    }, {
      name: 'Germany',
      y: 357022,
      z: 235.6
    }]
  }]
});




};



module.exports = PopulationChartView;
