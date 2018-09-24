const PubSub = require('../helpers/pub_sub.js');
const dotenv = require('dotenv');
// const leaflet = require('leaflet');
dotenv.load();


const MapView = function(element, data) {
  this.element = element;
  this.data = data;
  this.render(this.data);
}

MapView.prototype.render = function (data) {
  this.element.innerHTML = '';

  const lat = data.latlng[0];
  const long = data.latlng[1];
  const zoom = 3;
  const token = process.env.MAP_KEY;

  var map = L.map(this.element).setView([lat, long], zoom);
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 20,
    id: 'mapbox.streets',
    accessToken: token
  }).addTo(map);

};

module.exports = MapView;
