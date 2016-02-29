var $ = require('jquery');

module.exports = function(address, rural, cb) {
  $.ajax({
    url: 'https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?',
    dataType: 'jsonp',
    data: {
      address: address,
      benchmark: '4',
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

      // add one to the total
      var totalCount = parseInt($('#totalCnt').text(), 10);
      totalCount++;
      $('#totalCnt').text(totalCount);

      // hide spinner
      if ($('#totalCnt').text() === $('#addressCount').text()) {
        $('#spinner').addClass('hide');
      }
    }
  });
};
