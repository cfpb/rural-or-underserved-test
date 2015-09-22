var $ = require('jquery');

var renderer = require('./render');
var render = renderer();

var ruralChecker = require('./rural');

require('mapbox.js');
require('papaparse');

L.mapbox.accessToken = 'pk.eyJ1IjoiY29tcHV0ZWNoIiwiYSI6InMyblMya3cifQ.P8yppesHki5qMyxTc2CNLg';

var notFoundCnt = 0;
var notRuralCnt = 0;
var ruralCnt = 0;
var totalCnt = 0;
var sendAddress;

var fipsCodes;

window.callback = function(data) {
  // save the query address
  var input = data.result.input.address.address;
  
  // nothing found
  if (data.result.addressMatches.length === 0) {
    totalCnt ++;
    notFoundCnt ++;

    render.addToTable('notFound', input);

    render.addToCount('notFound', notFoundCnt, totalCnt);
  } else {
    // used to check rural
    var urbanClusters = data.result.addressMatches[0].geographies['Urban Clusters'];
    var urbanAreas = data.result.addressMatches[0].geographies['Urbanized Areas'];

    // used to render results
    var matchedAddress = data.result.addressMatches[0].matchedAddress;
    var x = data.result.addressMatches[0].coordinates.x;
    var y = data.result.addressMatches[0].coordinates.y;
    var county = data.result.addressMatches[0].geographies['Census Blocks'][0].COUNTY;
    var block = data.result.addressMatches[0].geographies['Census Blocks'][0].BLOCK;
    var state = data.result.addressMatches[0].geographies['Census Blocks'][0].STATE;
    
    // get fips from result (state and county)
    var fipsCode = state + county;

    // load fips (counties that are rural)
    // loop through fips looking for fips from data
    $.getJSON('data/fips.json', function(fips) {
      var rural = false;
      rural = ruralChecker(fips, fipsCode, urbanAreas, urbanClusters);

      // if rural is still false
      if (rural === false) {
        // do counting
        notRuralCnt ++;
        totalCnt ++;

        render.addToTable('notRural', input, matchedAddress, x, y, county, block);

        render.addToCount('notRural', notRuralCnt, totalCnt);
      } else {
        // do counting
        ruralCnt ++;
        totalCnt ++;

        render.addToTable('rural', input, matchedAddress, x, y, county, block);

        render.addToCount('rural', ruralCnt, totalCnt);
      }
    });
  }
}

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

$('body').on('click', 'a.jsLoadMap', function(e) {
  e.preventDefault();

  var id = $(this).data('id');

  // check if id already exists
  if ($('#loc-' + id).length) {
    // remove the map and container
    $('#loc-' + id).remove();
  } else {
    // get the lat/lon
    var lat = $(this).data('lat');
    var lon = $(this).data('lon');
    
    // append the map container
    $(this).parent().append('<div class="map" id="loc-' + id + '"></div>');

    // create the map and add marker
    var latlng = L.latLng(lon, lat);
    map = L.mapbox.map('loc-' + id, 'cfpb.k55b27gd', { center: latlng }).setView(latlng,15);
    var marker = L.marker(latlng).addTo(map);
  }
});

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