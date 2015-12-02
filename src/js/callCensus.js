module.exports = function(address, cb) {
  var url = 'http://geocoding.geo.census.gov/geocoder/locations/onelineaddress'
    + '?callback=' + cb
    + '&address=' + address
    + '&benchmark=4'
    + '&format=jsonp';

  var response = document.createElement('script');
  document.body.appendChild(response);
  response.src = url;
};
