const PubSub = require('../helpers/pub_sub.js');
const createAppend = require('../helpers/create_append.js');
const Highcharts = require('highcharts')
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);
require('highcharts/modules/funnel')(Highcharts);

const LangChartView = function(element) {
  this.element = element;
};

LangChartView.prototype.bindEvents = function () {
  PubSub.subscribe('Countries:all-data', (event) => {
    this.renderLangChart(event.detail);
  });
};

LangChartView.prototype.renderLangChart = function () {
  const element = createAppend('div', '', this.element);
  element.id = ('lang-chart');

  Highcharts.chart(element, {
    chart: {
      type: 'funnel'
    },
    title: {
      text: 'Most spoken languages funnel'
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
        neckWidth: '30%',
        neckHeight: '25%',
        width: '80%'
      }
    },
    legend: {
      enabled: false
    },
    series: [{
      name: 'Languages',
      data: [
        ['Amharic', 92206005, 1],
        ['Arabic', 385518637, 20],
        ['Bengali', 161006790, 1],
        ['Chinese', 1401574615, 3],
        ['English', 1181667020, 77],
        ['French', 351775168, 32],
        ['Hindi', 1295210000, 1],
        ['Indonesian', 258705000, 1],
        ['Japanese', 126960000, 1],
        ['Portuguese', 272236029, 8],
        ['Russian', 146599183, 1],
        ['Spanish', 452399649, 22],
        ['Vietnamese', 92700000, 1]
      ],
    }]
  });
};


module.exports = LangChartView;
