var DT = require( './dom-tools' );
var fullCountyList = require( '../data/counties.json' );

module.exports = function() {
  var address = {};

  address.isDup = function( address, duplicates ) {
    return typeof address === 'string'
           && Array.isArray( duplicates )
           && duplicates.indexOf( address ) !== -1;
  }

  address.isFound = function( response ) {
    var match = response.addressMatches;

    return Array.isArray( match ) && match.length !== 0;
  }

  address.isInCounty = function( fips, counties ) {
    var pass = false;
    for ( i in counties.fips ) {
      if( fips === counties.fips[i][0] ) {
        pass = true;
        break;
      }
    }

    return pass;
  };

  address.isRuralCensus = function( urbanClusters, urbanAreas ) {
    return ( urbanClusters === null ||
             urbanClusters.length === 0) &&
           ( urbanAreas === null || urbanAreas.length === 0 );
  };

  address.setCountyName = function( fipsCode ) {
    var countyName = '';

    for( i in fullCountyList.counties ) {
      if( fullCountyList.counties[i][0] === fipsCode ) {
        countyName = fullCountyList.counties[i][1]
                      .substring( fullCountyList.counties[i][1].indexOf( ',' )+1 )
                      .replace( 'County', '' )
                      .replace( /^\s+|\s+$/gm,'' );
        break;
      }
    }

    return countyName;
  };

  address.render = function(result) {
    var rowCount = DT.getEls( '#' + result.type + ' tbody tr' ).length;
    if ( result.type === 'rural' || result.type === 'notRural' ) {
      rowCount = DT.getEls( '#' + result.type + ' tbody tr' ).length / 2;
    }

    var hideRow = false;
    if (rowCount >= 5) {
      hideRow = true;
      DT.removeClass( '#' + result.type + 'More', 'hide' );
      DT.removeClass( '#' + result.type + 'All', 'hide' );
    }

    var rural;
    if ( result.type === 'rural' ) {
      rural = 'Yes';
    } else if ( result.type === 'notRural' ) {
      rural = 'No';
    } else {
      rural = '-';
    }

    var rowHTML = '<tr class="data';
    if ( hideRow === true ) {
      rowHTML = rowHTML + ' hide';
    }
    rowHTML = rowHTML + '"><td>' + result.input + '</td>'
      + '<td>' + result.address + '</td>'
      + '<td>' + result.countyName + '</td>'
      + '<td>' + rural;
    // add the map link if needed
    if( rural !== '-' ) {
      rowHTML = rowHTML
        + ' <a href="#" class="no-decoration hide-print'
        + ' jsLoadMap right" data-map="false" data-lat="'
        + result.x + '" data-lon="' + result.y + '" data-id="loc-'
        + result.id
        + '">Show map <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1200" class="cf-icon-svg"><path d="M500 105.2c-276.1 0-500 223.9-500 500s223.9 500 500 500 500-223.9 500-500-223.9-500-500-500zm263.1 550.7H549.6v213.6c0 27.6-22.4 50-50 50s-50-22.4-50-50V655.9H236c-27.6 0-50-22.4-50-50s22.4-50 50-50h213.6V342.3c0-27.6 22.4-50 50-50s50 22.4 50 50v213.6h213.6c27.6 0 50 22.4 50 50s-22.5 50-50.1 50z"></path></svg></a>'
    }
    rowHTML = rowHTML
      + '</td></tr>';
    // add the map if needed
    if( rural !== '-' ) {
      rowHTML = rowHTML
      + '<tr class="hide"><td colspan="5">'
      + '<div class="map" id="loc-' + result.id + '"></div></td></tr>';
    }

    DT.removeClass( '#' + result.type, 'hide' );
    DT.addEl( DT.getEl( '#' + result.type + ' tbody' ), rowHTML );
  }

  return address;
}();
