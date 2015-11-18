var $ = require('jquery');

module.exports = function(result) {
  //var mapID = Date.now();

  var rowHTML = '<tr><td>' + result.input + '</td>'
    + '<td>' + result.address + '</td>'
    + '<td>' + result.countyName + '</td>'
    + '<td>' + result.block + '</td>'
    + '<td>' + result.rural;

  // add the map link if needed
  if(result.rural !== '-') {
    rowHTML = rowHTML
      + ' <a href="#" class="no-decoration hide-print jsLoadMap right" data-map="false" data-lat="' + result.x + '" data-lon="' + result.y + '" data-id="loc-' + result.id + '">Show map <span class="cf-icon cf-icon-plus-round"></span></a>'
  }

  rowHTML = rowHTML
    + '</td></tr>';

  // add the map if needed
  if(result.rural !== '-') {
    rowHTML = rowHTML
    + '<tr class="hide"><td colspan="5"><div class="map" id="loc-' + result.id + '"></div></td></tr>';
  }

  $('#' + result.type).removeClass('hide');
  $('#' + result.type + ' tbody').append(rowHTML);
}
