const createAppend = require('../helpers/create_append.js');
const Highcharts = require('highcharts');
require('highcharts/modules/exporting')(Highcharts);

const CountryChartView = function (element) {
  this.element = element;
}

CountryChartView.prototype.render = function (data, title, seriesName) {
  const element = createAppend('div', '', this.element);
  Highcharts.chart(element, {
    chart: {
      borderWidth: 1,
      // backgroundColor: '#ECC27C',
      options3d: {
        enabled: true,
        alpha: 45,
        beta: 0
      }
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
