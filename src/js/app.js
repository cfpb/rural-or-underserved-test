var $ = require('jquery');

require ('./geoCallback');

var renderer = require('./render');
var render = renderer();

require('./showMap');

require('mapbox.js');
require('papaparse');

L.mapbox.accessToken = 'pk.eyJ1IjoiY29tcHV0ZWNoIiwiYSI6InMyblMya3cifQ.P8yppesHki5qMyxTc2CNLg';

var notFoundCnt = 0;
var notRuralCnt = 0;
var ruralCnt = 0;
var totalCnt = 0;
var sendAddress;

var fipsCodes;

function getRuralUrban(address) {
  // api call
  $.ajax({
    url: 'http://geocoding.geo.census.gov/geocoder/geographies/onelineaddress?callback=callback',
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

// on submit
$('#geocode').submit(function(e) {
  getRuralUrban($('#address').val());
  return false;
});

// on keypress of enter
$('#address').keypress(function(e) {
  if (e.which == 13) {
    getRuralUrban($('#address').val());
    return false;
  }
});

// on upload
$("#file").change(function(e) {
  render.hide();
  render.resetHTML();

  notFoundCnt = 0;
  notRuralCnt = 0;
  ruralCnt = 0;
  totalCnt = 0;

  // parse the csv
  $("#file").parse( {
    config: {
      header: false,
      step: function(results, parser) {
        getRuralUrban(results.data[0][0]);
      },
      complete: function(results, file) {
        console.log("Complete!");
      }
    }, 
    complete: function() {
      console.log("All files done!");
    }
  });
  return false;
});