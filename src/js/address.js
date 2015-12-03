var $ = require('jquery');
var fullCountyList = require('../data/counties.json');

module.exports = function() {
  var address = {};

  address.isDup = function(address, duplicates) {
    var pass = false;

    if (typeof address === 'string' && Array.isArray(duplicates) && duplicates.indexOf(address) !== -1) {
      pass = true;
    }

    return pass;
  }

  address.isFound = function(response) {
    var pass = false;
    var match = response.addressMatches;

    if (Array.isArray(match) && match.length !== 0) {
      pass = true;
    }
    return pass;
  }

  address.isInCounty = function(fips, counties) {
    var pass = false;
    for (i in counties.fips) {
      if(fips === counties.fips[i][0]) {
        pass = true;
        break;
      } else {
        continue;
      }
    }

    return pass;
  };

  address.isUrban = function(urbanClusters, urbanAreas) {
    var pass = false;

    if ((urbanClusters === null || urbanClusters.length === 0) && (urbanAreas === null || urbanAreas.length === 0)) {
      pass = true;
    }

    return pass;
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
      } else {
        continue;
      }
    }

    return countyName;
  };

  address.render = function(result) {
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

  return address;
}();
