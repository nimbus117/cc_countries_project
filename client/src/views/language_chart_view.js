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
      text: "Worlds's most spoken languages"
    },
    subtitle: {
      text: 'Source: RESTCountries'
    },
    xAxis: {
      type: 'category',
      title: {
        text: 'Column widths are proportional to the number of countries'
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
      dataLabels: {
        enabled: true,
        format: '{point.y:.0f} people'
      },
      tooltip: {
        pointFormat: 'spoken by {point.y} people <br>across {point.z} countries'
      },
      colorByPoint: true
    }]
  });
};





module.exports = LangChartView;
