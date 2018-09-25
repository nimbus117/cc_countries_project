const PubSub = require('../helpers/pub_sub.js');
const createAppend = require('../helpers/create_append.js');
const Highcharts = require('highcharts')
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/funnel')(Highcharts);


const GiniChartView = function(element) {
  this.element = element;
  this.allCountries = null;
};

GiniChartView.prototype.bindEvents = function () {
  PubSub.subscribe('Countries:all-data', (event) => {
    this.allCountries = event.detail;
    this.renderGini(event.detail);
  });
}

GiniChartView.prototype.getGiniInfo = function () {
  const preparedInfo = this.allCountries.map(country => {
    return {name: country.name, y: country.gini}
  })
  const bottom_five = preparedInfo.sort((a, b) => (b.y - a.y)).splice(0, 5);
  const top_five = preparedInfo.sort((a, b) => (a.y - b.y))
  .filter((country) => {
    return country.y
  }).splice(0, 5).reverse();
  return bottom_five.concat(top_five);
};

GiniChartView.prototype.renderGini = function () {
  this.element.innerHTML = '';
  const top_and_bottom_five = this.getGiniInfo();

  const element = createAppend('div', '', this.element);
  element.id = ('gini-pyramid');
  Highcharts.chart(element, {
    chart: {
      type: 'pyramid'
    },
    title: {
      text: 'Equality Pyramid',
      x: -50
    },
    subtitle: {
      text: "A commonly used measurement of inequality is the Gini coefficient, a measure of statistical dispersion intended to represent the income or wealth distribution of a nation's residents. <br> Here are the top and bottom five countries in the world.",
    },
    plotOptions: {
      series: {
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b> ({point.y:,.0f})',
          color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
          softConnector: true
        },
        center: ['40%', '50%'],
        width: '80%',
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
      }
    },
    legend: {
      enabled: false
    },
    series: [{
      name: 'GINI',
      data: top_and_bottom_five
    }]
  });
};


module.exports = GiniChartView;
