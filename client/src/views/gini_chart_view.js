const PubSub = require('../helpers/pub_sub.js');
const createAppend = require('../helpers/create_append.js');
const Highcharts = require('highcharts')
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/funnel')(Highcharts);


const GiniChartView = function(element) {
  this.element = element;
};

GiniChartView.prototype.bindEvents = function () {
  PubSub.subscribe('Countries:all-data', (event) => {
    this.renderGini(event.detail);
  });
}

GiniChartView.prototype.renderGini = function (info) {

  const preparedInfo = info.map(x => {
    return {name: x.name, y: x.gini}
  });
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
    plotOptions: {
      series: {
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b> ({point.y:,.0f})',
          color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
          softConnector: true
        },
        center: ['40%', '50%'],
        width: '80%'
      }
    },
    legend: {
      enabled: false
    },
    series: [{
      name: 'GINI',
      data: preparedInfo
      // [
      //   ['Seychelles',	65.8],
      //   ['Comoros',	64.3],
      //   ['Namibia',	63.9],
      //   ['South Africa',	63.1],
      //   ['Botswana',	61],
      //   ['Czech Republic',	26],
      //   ['Austria',	26],
      //   ['Norway',	25.8],
      //   ['Sweden',	25],
      //   ['Denmark',	24]
      // ]
    }]
  });
};


module.exports = GiniChartView;
