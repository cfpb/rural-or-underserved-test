module.exports = {
  getRuralUrban: function(address) {
    // api call
    $.ajax({
      url: 'http://geocoding.geo.census.gov/geocoder/geographies/onelineaddress?callback=censusAPI.callback',
      dataType: 'jsonp',
      data: {
        address: address,
        benchmark: 'Public_AR_Census2010',
        vintage: 'Census2010_Census2010',
        layers: '68,70,14',
        format: 'jsonp'
      }
    })
    .fail(function(jqXHR, textStatus) {
      console.log(textStatus);
    });
  }
}