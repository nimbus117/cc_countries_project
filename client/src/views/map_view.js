const PubSub = require('../helpers/pub_sub.js');
// const leaflet = require('leaflet');

const MapView = function(element, data) {
  this.element = element;
  this.data = data;
  this.render(this.data);
}

MapView.prototype.render = function (data) {
  this.element.innerHTML = '';

  const lat = data.latlng[0];
  const long = data.latlng[1];

  var map = L.map(this.element).setView([lat, long], 5);
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 20,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoibWljaGFlbHRoZXRhbGwiLCJhIjoiY2ptZXZ4aG1rMHZybjNxbzlxbGdoeHRvcCJ9.mGMQxJwXrnJSDi3QiO_C9w'
  }).addTo(map);

};

module.exports = MapView;
