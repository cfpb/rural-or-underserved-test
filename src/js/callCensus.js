module.exports = function(address, cb) {
  /*var url = 'http://geocoding.geo.census.gov/geocoder/geographies/onelineaddress?&callback=' + cb
    + '&address=' + address
    + '&benchmark=Public_AR_Census2010'
    + '&vintage=Census2010_Census2010'
    + '&layers=68,70,14'
    + '&format=jsonp';*/

  var url = 'http://geocoding.geo.census.gov/geocoder/locations/onelineaddress'
    + '?callback=' + cb
    + '&address=' + address
    + '&benchmark=4'
    + '&format=jsonp';

  var response = document.createElement('script');
  document.body.appendChild(response);
  response.src = url;
};
