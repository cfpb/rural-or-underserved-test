var $ = require('jquery');

var fullCountyList = require('../data/counties.json');

module.exports = function() {
    var duplicates = [];
    var thisResult = {};
    var results = {};
    results.duplicates = [];
    results.notFound = [];
    results.rural = [];
    results.notRural = [];

    // geocode the address using the census api
    // use _callback
    var geocode = function(address) {
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
    };

    var address = {};

    address.process = function(queries) {
        $.each(queries, function(index, query) {
            var isDup = address.isDuplicate(query);

            // if its not dup
            if (!isDup) {
                console.log('false');
                // uses callback to finish processing
                geocode(query);
            } else {
                // console.log(results.duplicates);
                // render duplicate table
                // render duplicate count
                address.render(isDup);
            }
        });
    }

    address.render = function(result) {
        var mapID = Date.now();

        var rowHTML = '<tr><td>' + result.input + '</td>'
            + '<td>' + result.address + '</td>'
            + '<td>' + result.countyName + '</td>'
            + '<td>' + result.block + '</td>'
            + '<td>' + result.rural;

        // add the map link if needed
        if(result.rural != '-') {
            rowHTML = rowHTML
                + ' <a href="#" class="hide-print jsLoadMap right" data-map="false" data-lat="' + result.x + '" data-lon="' + result.y + '" data-id="loc-' + mapID + '">Show map <span class="cf-icon cf-icon-plus-round"></span></a>'
        }

        rowHTML = rowHTML
            + '</td></tr>'
            + '<tr class="hide"><td colspan="5"><div class="map" id="loc-' + mapID + '"></div></td></tr>';

        $('#' + result.type).removeClass('hide');
        $('#' + result.type + ' tbody').append(rowHTML);
        console.log(result.type);
    }

    address.isDuplicate = function(address) {
        if (duplicates.indexOf(address) !== -1) {
            var result = {};
            result.input = address;
            result.address = 'Duplicate';
            result.countyName = '-';
            result.block = '-';
            result.rural = '-';
            result.type = 'duplicate';
            return result;
        } else {
            duplicates.push(address);
            return false;
        }
    }

    address.isFound = function(response) {
        if (response.addressMatches.length === 0) {
            var result = {};
            result.input = response.input.address.address;
            result.address = 'Address not identfied';
            result.countyName = '-';
            result.block = '-';
            result.rural = '-';
            result.type = 'notFound';
            return result;
        } else {
            return false;
        }
    }

    // rural check
    address.isRural = function(response, year) {
        var result = {};

        result.input = response.input.address.address;
        result.address = response.addressMatches[0].matchedAddress;
        result.countyName = address.getCountyName(fipsCode);
        result.block = response.addressMatches[0].geographies['Census Blocks'][0].BLOCK;
        result.x = response.addressMatches[0].coordinates.x;
        result.y = response.addressMatches[0].coordinates.y;

        // get fips from result (state and county)
        var fipsCode = response.addressMatches[0].geographies['Census Blocks'][0].STATE + response.addressMatches[0].geographies['Census Blocks'][0].COUNTY;

        if(!address.isInCounty(fipsCode, year)) {
            // check urban
            var urbanClusters = response.addressMatches[0].geographies['Urban Clusters'];
            var urbanAreas = response.addressMatches[0].geographies['Urbanized Areas'];

            if(!address.isUrban(urbanClusters, urbanAreas)) {
                result.rural = 'No';
                result.type = 'notRural';
            } else {
                result.rural = 'Yes';
                result.type = 'rural';
            }

        } else {
            // setup result for in county
            result.rural = 'Yes';
            result.type = 'rural';
        }

        return result;
    }

    address.isInCounty = function(fipsCode, year) {
        var inCounty = false;

        $.getJSON('data/' + year + '.json', function(fips) {
            $.each(fips.fips, function(key, val) {
                if (val[0] === fipsCode) {
                    inCounty = true;
                }
            });

            return inCounty;
        });
    }

    address.isUrban = function(urbanClusters, urbanAreas) {
        var urban = false;
        if ((urbanClusters === null || urbanClusters.length === 0) && (urbanAreas === null || urbanAreas.length === 0)) {
            urban = true;
        }
        return urban;
    }

    address.getCountyName = function(fipsCode) {
        var countyName = '';
        $.grep(fullCountyList.counties, function(n, i) {
            if (n[0] === fipsCode) {
                // use everything after the ',' and remove 'County'
                countyName = n[1].substring(n[1].indexOf(',')+1).replace('County', '');
            }
        });
        return countyName;
    }

    return address;
}();