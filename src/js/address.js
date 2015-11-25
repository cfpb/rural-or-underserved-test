var $ = require('jquery');
var count = require('./count');
var leafletPip = require('leaflet-pip');
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

  address.getInput = function(query) {
    var input = '';
    $.each(query, function(index, value){
      input = input + ' ' + value;
    });

    return input;
  }

  address.isFound = function(response) {
    var pass = false;
    var features = response.features;

    if (features.length !== 0) {
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

  address.isRural = function(mapbox, year) {
        var result = {};

        // we have something so start setting up the result
        result.input = address.getInput(mapbox.results.query);
        result.address = mapbox.results.features[0].place_name;
        result.x = mapbox.results.features[0].center[1];
        result.y = mapbox.results.features[0].center[0];

        $.ajax({
            url: 'http://data.fcc.gov/api/block/find',
            dataType: 'jsonp',
            data: {
                latitude: result.x,
                longitude: result.y,
                showall: true,
                format: 'jsonp'
            },
            success: function load(fcc) {
              console.log(fcc);
              console.log(result.input);
                var state = fcc.State.code.toLowerCase();
                result.state = state;
                result.block = fcc.Block.FIPS;
                //fipsCode = fcc.County.FIPS;

                result.countyName = fcc.County.name;
                result.countyFIPS = fcc.County.FIPS;

                $.ajax({
                    url: 'data/' + year + '.json',
                    dataType: 'json',
                    success: function load(fips) {
                        var inCounty = false;
                        $.each(fips.fips, function(key, val) {
                            if (val[0] === result.countyFIPS) {
                                inCounty = true;
                                result.rural = 'Yes';
                                result.type = 'rural';
                                result.why = 'county';
                                result.id = Date.now();
                                address.render(result);
                                count.updateCount(result.type);
                            }
                        });

                        if (!inCounty) {
                            // load geoson
                            $.ajax({
                                url: 'geojson/' + state + '.geojson',
                                dataType: 'json',
                                success: function load(d) {
                                    var gjLayer = L.geoJson(d);
                                    var inPoly = leafletPip.pointInLayer([result.y, result.x], gjLayer, true);
                                    if (inPoly.length === 0) {
                                        result.rural = 'Yes';
                                        result.type = 'rural';
                                        result.why = 'pip';
                                    } else {
                                        result.rural = 'No';
                                        result.type = 'notRural';
                                    }
                                    result.id = Date.now();
                                    address.render(result);
                                    count.updateCount(result.type);
                                }
                            });
                        }
                    }
                });
            }
        })
        .fail(function(jqXHR, textStatus) {
          console.log(textStatus);
        });
    }

  return address;
}();
