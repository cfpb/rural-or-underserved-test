var $ = require('jquery');

module.exports = function(address, rural, cb) {
  $.ajax({
    url: 'http://geocoding.geo.census.gov/geocoder/geographies/onelineaddress?',
    dataType: 'jsonp',
    data: {
      address: address,
      benchmark: 'Public_AR_Census2010',
      vintage: 'Census2010_Census2010',
      layers: '68,70,14',
      format: 'jsonp'
    },
    success: function(data) {
      callbacks.censusAPI(data, rural);
    }
  })
  .fail(function(jqXHR, textStatus) {
    if (jqXHR.status !== 200) {
      $('#processErrorDesc').append('<li>' + address + '</li>');
      $('#processError').removeClass('hide');
    }
  });
};
