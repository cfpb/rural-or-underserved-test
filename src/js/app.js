var $ = require('jquery');
require('mapbox.js');
var reset = require('./reset');
var re = reset();
require('papaparse');

L.mapbox.accessToken = 'pk.eyJ1IjoiY29tcHV0ZWNoIiwiYSI6InMyblMya3cifQ.P8yppesHki5qMyxTc2CNLg';

var fips;
var notFoundCnt = 0;
var notRuralCnt = 0;
var ruralCnt = 0;
var totalCnt = 0;
var sendAddress;

window.callback = function(data) {
  var rural = false;

  // nothing found
  if (data.result.addressMatches.length === 0) {
    // do counting
    totalCnt ++;
    notFoundCnt ++;
    $('.notFoundCnt').html(notFoundCnt);
    $('#totalCnt').html(totalCnt);
    // show not found
    $('#notFound').removeClass('hide');
    // add to table
    $('#notFound tbody').append('<tr><td>' + data.result.input.address.address + '</td>'
        + '<td>Address not identfied</td>'
        + '<td>-</td>'
        + '<td>-</td>'
        + '<td>-</td></tr>');
  } else {
    if (data.result.addressMatches[0].matchedAddress == '12800 Arbor Lakes Pkwy N, MAPLE GROVE, MN, 55369') {
      console.log(data);
    }
    // get fips from result (state and county)
    var fipsCode = data.result.addressMatches[0].geographies['Census Blocks'][0].STATE + data.result.addressMatches[0].geographies['Census Blocks'][0].COUNTY;
    // load fips (counties that are rural)
    // loop through fips looking for fips from data
    $.getJSON('data/fips.json', function(fips) {
      $.each(fips.fips, function(key, val) {
        // if result is in fips its rural
        // stop, no need to continue
        if (val[0] === fipsCode) {
          rural = true;
          return false;
        }
      });

      // if it wasn't in the fips list
      // we have check against urban clusters and areas
      // if both are null or array length 0 its rural
      if (rural === false) {
        if ((data.result.addressMatches[0].geographies['Urban Clusters'] === null || data.result.addressMatches[0].geographies['Urban Clusters'].length === 0) && (data.result.addressMatches[0].geographies['Urbanized Areas'] === null || data.result.addressMatches[0].geographies['Urbanized Areas'].length === 0)) {
          rural = true;
        }
      }

      // if rural is still false
      if (rural === false) {
        // do counting
        notRuralCnt ++;
        totalCnt ++;
        $('.notRuralCnt').html(notRuralCnt);
        $('#totalCnt').html(totalCnt);
        // show not rural
        $('#notRural').removeClass('hide');
        // add to table
        $('#notRural tbody').append('<tr><td>' + data.result.input.address.address + '</td>'
          + '<td><a href="#" class="jsLoadMap" data-lat="' + data.result.addressMatches[0].coordinates.x + '" data-lon="' + data.result.addressMatches[0].coordinates.y + '" data-id="loc-' + Date.now() + '">' + data.result.addressMatches[0].matchedAddress + '</a></td>'
          + '<td>' + data.result.addressMatches[0].geographies['Census Blocks'][0].COUNTY + '</td>'
          + '<td>' + data.result.addressMatches[0].geographies['Census Blocks'][0].BLOCK + '</td>'
          + '<td>No</td></tr>');
      } else {
        // do counting
        ruralCnt ++;
        totalCnt ++;
        $('.ruralCnt').html(ruralCnt);
        $('#totalCnt').html(totalCnt);
        // show rural
        $('#rural').removeClass('hide');
        // add to table
        $('#rural tbody').append('<tr><td>' + data.result.input.address.address + '</td>'
          + '<td><a href="#" class="jsLoadMap" data-lat="' + data.result.addressMatches[0].coordinates.x + '" data-lon="' + data.result.addressMatches[0].coordinates.y + '" data-id="loc-' + Date.now() + '">' + data.result.addressMatches[0].matchedAddress + '</a></td>'
          + '<td>' + data.result.addressMatches[0].geographies['Census Blocks'][0].COUNTY + '</td>'
          + '<td>' + data.result.addressMatches[0].geographies['Census Blocks'][0].BLOCK + '</td>'
          + '<td>Yes</td></tr>');
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

$("#file").change(function(e) {
  re.hide();
  re.resetHTML();
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