const PubSub = require('../helpers/pub_sub.js');
const createAppend = require('../helpers/create_append.js');
const Highcharts = require('highcharts')
require('highcharts/modules/variwide')(Highcharts);

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
      type: 'variwide'
    },
    title: {
      text: 'Most spoken languages in the World'
    },
    subtitle: {
      text: 'Source: RESTCountries'
    },
    xAxis: {
      type: 'category',
      title: {
        text: 'Column widths are proportional to population totals'
      }
    },
    legend: {
      enabled: false
    },
    series: [{
      name: 'Languages',
      data: [
        ['Amharic', 1, 92206005],
        ['Arabic', 20, 385518637],
        ['Bengali', 1, 161006790],
        ['Chinese', 3, 1401574615],
        ['English', 77, 1181667020],
        ['French', 32, 351775168],
        ['Hindi', 1, 1295210000],
        ['Indonesian', 1, 258705000],
        ['Japanese', 1, 126960000],
        ['Portuguese', 8, 272236029],
        ['Russian', 1, 146599183],
        ['Spanish', 22, 452399649],
        ['Vietnamese', 1, 92700000]
      ],
      dataLabels: {
        enabled: true,
        format: '{point.y:.0f} countries'
      },
      tooltip: {
        pointFormat: 'is spoken by {point.z} people <br>across {point.y} countries'
      },
      colorByPoint: true
    }]
  });
};





module.exports = LangChartView;
