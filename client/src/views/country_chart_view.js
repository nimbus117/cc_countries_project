const createAppend = require('../helpers/create_append.js');
const Highcharts = require('highcharts');
require('highcharts/modules/exporting')(Highcharts);

const CountryChartView = function (element) {
  this.element = element;
}

CountryChartView.prototype.render = function (data, title, seriesName) {
  const element = createAppend('div', '', this.element);
  element.classList.add('country-chart')
  Highcharts.chart(element, {
    chart: {
      borderWidth: 1,
      // backgroundColor: '#ECC27C',
    },
    title: {
      text: title
    },
    series: [{
      name: seriesName,
      type: 'pie',
      data: data,
      showInLegend: false,
    }]
  });
}

module.exports = CountryChartView;
