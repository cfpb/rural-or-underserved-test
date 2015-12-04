var $ = require('jquery');
var fullCountyList = require('../data/counties.json');

module.exports = function() {
  var address = {};

  address.isDup = function(address, duplicates) {
    return typeof address === 'string' && Array.isArray(duplicates) && duplicates.indexOf(address) !== -1;
  }

  address.isFound = function(response) {
    var match = response.addressMatches;

    return Array.isArray(match) && match.length !== 0;
  }

  address.isInCounty = function(fips, counties) {
    var pass = false;
    for (i in counties.fips) {
      if(fips === counties.fips[i][0]) {
        pass = true;
        break;
      }
    }

    return pass;
  };

  address.isRuralCensus = function(urbanClusters, urbanAreas) {
    return (urbanClusters === null || urbanClusters.length === 0) && (urbanAreas === null || urbanAreas.length === 0);
  };

  address.setCountyName = function(fipsCode) {
    var countyName = '';

    for(i in fullCountyList.counties) {
      if(fullCountyList.counties[i][0] === fipsCode) {
        countyName = fullCountyList.counties[i][1]
                      .substring(fullCountyList.counties[i][1].indexOf(',')+1)
                      .replace('County', '')
                      .replace(/^\s+|\s+$/gm,'');
        break;
      }
    }

    return countyName;
  };

  address.render = function(result) {
    var rowHTML = '<tr><td>' + result.input + '</td>'
      + '<td>' + result.address + '</td>'
      + '<td>' + result.countyName + '</td>'
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

  return address;
}();
