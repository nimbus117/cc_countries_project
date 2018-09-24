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
  })

  const bottom_five = preparedInfo.sort((a, b) => (b.y - a.y)).splice(0, 5);

  const top_five = preparedInfo.sort((a, b) => (a.y - b.y))
  .filter((x) => {
    return x.y
  }).splice(0, 5).reverse();

  const top_and_bottom_five = bottom_five.concat(top_five);

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
      data: top_and_bottom_five
    }]
  });
};


module.exports = GiniChartView;
