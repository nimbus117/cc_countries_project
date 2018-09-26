const PubSub = require('../helpers/pub_sub.js');
const createAppend = require('../helpers/create_append.js');
const Highcharts = require('highcharts')
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);
require('highcharts/modules/funnel')(Highcharts);

const LangChartView = function(element) {
  this.element = element;
  this.allCountries = null;
};

LangChartView.prototype.bindEvents = function () {
  PubSub.subscribe('Countries:all-data', (event) => {
    this.allCountries = event.detail;
    this.renderLangChart(event.detail);
  });
};
//
// LangChartView.prototype.getAllLangs = function () {
//
// };


LangChartView.prototype.renderLangChart = function () {
  const element = createAppend('div', '', this.element);
  element.id = ('lang-chart');

  Highcharts.chart(element, {
    chart: {
      type: 'funnel'
    },
    title: {
      text: 'Languages Funnel'
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
      name: 'People',
      // data: [],
      data: [
        ['Chinese', 1,401,574,615],
        ['Hindi', 1,295,210,000],
        ['English', 1,181,667,020],
        ['Spanish', 452,399,649],
        ['Arabic', 385,518,637],
        ['French', 351,775,168],
        ['Portuguese', 272,236,029],
        ['Indonesian', 258,705,000],
        ['Bengali', 161,006,790],
        ['Russian', 146,599,183]
      ],
    }]
  });
};


module.exports = LangChartView;
