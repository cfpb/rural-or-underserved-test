require('mapbox.js');

L.mapbox.accessToken = 'pk.eyJ1IjoiY29tcHV0ZWNoIiwiYSI6InMyblMya3cifQ.P8yppesHki5qMyxTc2CNLg';

// setup geocoder
var geocoder = L.mapbox.geocoder('mapbox.places');

module.exports = function(address, cb) {
  console.log(address);
  geocoder.query(address, callbacks.mapboxAPI);
};
