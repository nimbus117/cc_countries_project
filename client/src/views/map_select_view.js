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
    this.renderSelectView(event.detail);
    this.renderMap();
  });
};

MapSelectView.prototype.renderMap = function () {
  console.log(Highcharts.maps)
  const element = createAppend('div', '', this.element)
  const data = [
      ['fo', 0],
      ['us', 1],
      ['jp', 2],
      ['in', 3],
      ['kr', 4],
      ['fr', 5],
      ['cn', 6],
      ['sw', 7],
      ['sh', 8],
      ['ec', 9],
      ['au', 10],
      ['ph', 11],
      ['es', 12],
      ['bu', 13],
      ['mv', 14],
      ['sp', 15],
      ['ve', 16],
      ['gb', 17],
      ['gr', 18],
      ['dk', 19],
      ['gl', 20],
      ['pr', 21],
      ['um', 22],
      ['vi', 23],
      ['ca', 24],
      ['tz', 25],
      ['cl', 26],
      ['cv', 27],
      ['dm', 28],
      ['sc', 29],
      ['nz', 30],
      ['ye', 31],
      ['jm', 32],
      ['om', 33],
      ['vc', 34],
      ['bd', 35],
      ['sb', 36],
      ['lc', 37],
      ['no', 38],
      ['cu', 39],
      ['kn', 40],
      ['bh', 41],
      ['fi', 42],
      ['id', 43],
      ['mu', 44],
      ['se', 45],
      ['ru', 46],
      ['tt', 47],
      ['br', 48],
      ['bs', 49],
      ['pw', 50],
      ['ir', 51],
      ['gw', 52],
      ['gd', 53],
      ['ee', 54],
      ['ag', 55],
      ['fj', 56],
      ['bb', 57],
      ['it', 58],
      ['mt', 59],
      ['pg', 60],
      ['de', 61],
      ['vu', 62],
      ['gq', 63],
      ['cy', 64],
      ['km', 65],
      ['va', 66],
      ['sm', 67],
      ['am', 68],
      ['az', 69],
      ['tj', 70],
      ['uz', 71],
      ['ls', 72],
      ['kg', 73],
      ['kp', 74],
      ['pt', 75],
      ['mx', 76],
      ['ma', 77],
      ['co', 78],
      ['ar', 79],
      ['sa', 80],
      ['qa', 81],
      ['nl', 82],
      ['ae', 83],
      ['ke', 84],
      ['my', 85],
      ['pa', 86],
      ['ht', 87],
      ['do', 88],
      ['hr', 89],
      ['th', 90],
      ['cd', 91],
      ['kw', 92],
      ['ie', 93],
      ['mm', 94],
      ['ug', 95],
      ['kz', 96],
      ['tr', 97],
      ['ga', 98],
      ['tl', 99],
      ['mr', 100],
      ['dz', 101],
      ['pe', 102],
      ['ao', 103],
      ['mz', 104],
      ['cr', 105],
      ['sv', 106],
      ['gt', 107],
      ['bz', 108],
      ['gy', 109],
      ['hn', 110],
      ['ni', 111],
      ['mw', 112],
      ['tm', 113],
      ['zm', 114],
      ['nc', 115],
      ['za', 116],
      ['lt', 117],
      ['et', 118],
      ['so', 119],
      ['gh', 120],
      ['si', 121],
      ['ba', 122],
      ['jo', 123],
      ['sy', 124],
      ['mc', 125],
      ['al', 126],
      ['uy', 127],
      ['cnm', 128],
      ['mn', 129],
      ['rw', 130],
      ['bo', 131],
      ['cm', 132],
      ['cg', 133],
      ['eh', 134],
      ['rs', 135],
      ['me', 136],
      ['bj', 137],
      ['tg', 138],
      ['la', 139],
      ['af', 140],
      ['ua', 141],
      ['sk', 142],
      ['jk', 143],
      ['pk', 144],
      ['bg', 145],
      ['li', 146],
      ['at', 147],
      ['sz', 148],
      ['hu', 149],
      ['ne', 150],
      ['lu', 151],
      ['ad', 152],
      ['ci', 153],
      ['lr', 154],
      ['sl', 155],
      ['bn', 156],
      ['be', 157],
      ['iq', 158],
      ['ge', 159],
      ['gm', 160],
      ['ch', 161],
      ['td', 162],
      ['ng', 163],
      ['kv', 164],
      ['lb', 165],
      ['sx', 166],
      ['dj', 167],
      ['er', 168],
      ['bi', 169],
      ['sr', 170],
      ['il', 171],
      ['sn', 172],
      ['gn', 173],
      ['pl', 174],
      ['mk', 175],
      ['py', 176],
      ['by', 177],
      ['lv', 178],
      ['bf', 179],
      ['ss', 180],
      ['na', 181],
      ['ro', 182],
      ['zw', 183],
      ['kh', 184],
      ['sd', 185],
      ['cz', 186],
      ['ly', 187],
      ['md', 188],
      ['cf', 189],
      ['sg', 190],
      ['vn', 191],
      ['tn', 192],
      ['tw', 193],
      ['mg', 194],
      ['is', 195],
      ['lk', 196],
      ['eg', 197],
      ['ml', 198],
      ['bw', 199],
      ['np', 200],
      ['bt', 201]
  ];
  Highcharts.mapChart(element, {
    chart: {
        map: 'custom/world-robinson-highres'
    },

    title: {
        text: 'Highmaps basic demo'
    },

    subtitle: {
        text: 'Source map: <a href="http://code.highcharts.com/mapdata/custom/world-robinson-highres.js">World, Robinson projection, high resolution</a>'
    },

    mapNavigation: {
        enabled: true,
        buttonOptions: {
            verticalAlign: 'bottom'
        }
    },

    colorAxis: {
        min: 0
    },

    series: [{
        data: data,
        name: 'Random data',
        states: {
            hover: {
                color: '#BADA55'
            }
        },
        dataLabels: {
            enabled: true,
            format: '{point.name}'
        }
    }]
});
}

MapSelectView.prototype.renderSelectView = function (countries) {
  const selectView = new SelectView(this.element);
  selectView.create('countries-select', 'Select a country:')
  selectView.bindEvents('SelectView:country-name');
  selectView.populate(countries);
}

module.exports = MapSelectView;
