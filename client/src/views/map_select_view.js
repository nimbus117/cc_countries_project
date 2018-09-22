const PubSub = require('../helpers/pub_sub.js');
const createAppend = require('../helpers/create_append.js');
const SelectView = require('./select_view.js');
const Highcharts = require('highcharts/highmaps');
require('highcharts/modules/exporting')(Highcharts);
const maps = require('../helpers/maps.js');
Highcharts.maps = maps;

const MapSelectView = function(element) {
  this.element = element;
};

MapSelectView.prototype.bindEvents = function () {
  PubSub.subscribe('Countries:country-names', (event) => {
    this.renderSelectView(event.detail.map(c => c.name));
    this.renderMap(event.detail);
  });
};

MapSelectView.prototype.renderMap = function (data) {
  const element = createAppend('div', '', this.element)
  Highcharts.mapChart(element, {
    chart: {
      map: 'custom/world-robinson-highres'
    },
    title: {
      text: ''
    },
    mapNavigation: {
      enabled: true,
      buttonOptions: {
        verticalAlign: 'bottom'
      }
    },
    series: [{
      data: data,
      joinBy: ['iso-a2', 'code'],
      name: 'Index',
      showInLegend: false,
      states: {
        hover: {
          color: '#BADA55'
        }
      },
      dataLabels: {
        enabled: true,
        format: '{point.name}'
      }
    }],
    plotOptions:{
      series:{
        cursor: 'pointer',
        point:{
          events:{
            click: function () {
              PubSub.publish('SelectView:country-index', this.value)
            }
          }
        }
      }
    },
    tooltip: {
      formatter: function () {return this.point.name;}
    }
  });
}

MapSelectView.prototype.renderSelectView = function (countries) {
  const selectView = new SelectView(this.element);
  selectView.create('countries-select', 'Select a country:');
  selectView.bindEvents('SelectView:country-index');
  selectView.populate(countries);
}

module.exports = MapSelectView;
