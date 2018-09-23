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

MapSelectView.prototype.excludeCountries = function (data) {
  const mapCodes = maps['custom/world-robinson-highres'].features.map(m => {
    return m.properties['iso-a3'];
  })
  return data.filter(country => mapCodes.includes(country.code))
}

MapSelectView.prototype.renderMap = function (data) {
  const element = createAppend('div', '', this.element);
  element.id = ('map-select');
  Highcharts.mapChart(element, {
    chart: {
      map: 'custom/world-robinson-highres',
      height: 600,
      borderWidth: 2,
      backgroundColor: '#CCEAFF'
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
      data: this.excludeCountries(data),
      joinBy: ['iso-a3', 'code'],
      name: 'Index',
      showInLegend: false,
      states: {
        hover: {
          color: '#fff000'
        }
      },
      dataLabels: {
        enabled: true,
        format: '{point.name}'
      }
    }],
    plotOptions:{
      series:{
        colorByPoint: true,
        // colors: ['#4572A7', '#AA4643', '#89A54E', '#80699B', '#3D96AE',
        //    '#DB843D', '#92A8CD', '#A47D7C', '#B5CA92'],
        colors: ['#2f7ed8', '#0d233a', '#8bbc21', '#910000', '#1aadce',
            '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'],
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
  selectView.create('countries-select', 'Select a country: ');
  selectView.bindEvents('SelectView:country-index');
  selectView.populate(countries);
}

module.exports = MapSelectView;
