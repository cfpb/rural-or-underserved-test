var addr = require( './address' );
var addrParse = require( './addressParse' );
var axios = require( 'axios' );
var census = require( './callCensus' );
var content = require( './contentControl' );
var count = require( './count' );
var DT = require( './dom-tools' );
var fileInput = require( './fileInput' );
var HashRouter = require( 'hash-router' );
var Papaparse = require( 'papaparse' );
var ruralCounties = require( './getRuralCounties' );
var textInputs = require( './textInputs' );
var tiger = require( './callTiger' );

require( 'es6-promise' ).polyfill();
require( './showMap' );
require( './misc' );
require( './expandables' );

window.callbacks = {};

function _rootHandler () {
  fileInput.resetError();

  // show about content
  content.showAbout();

  // clear remove inputs
  textInputs.reset();

  // reset counts
  count.reset();
  fileInput.resetError();

  // clear tables
  content.resetHTML();
}

function initRouter() {
  var router = HashRouter()
  router.addRoute( '/', _rootHandler );
  router.addRoute( '#', _rootHandler );

  window.addEventListener( 'hashchange', router );
  router(); // start the router
}


document.addEventListener( 'DOMContentLoaded', function() {
  initRouter();
} );

callbacks.censusAPI = function( data, rural ) {
  if ( addr.isFound( data.result ) ) {
    var result = {};
    result.x = data.result.addressMatches[0].coordinates.x;
    result.y = data.result.addressMatches[0].coordinates.y;

    axios.all(
      [ tiger( result.x, result.y, '86' ),
      tiger( result.x, result.y, '66' ),
      tiger( result.x, result.y, '64' ) ] )
    .then( axios.spread( function( censusCounty, censusUC, censusUA ) {
      result.input = data.result.input.address.address;
      result.address = data.result.addressMatches[0].matchedAddress;
      result.countyName = censusCounty.features[0].attributes.BASENAME;

      var fips = censusCounty.features[0].attributes.STATE
                 + censusCounty.features[0].attributes.COUNTY;

      if( addr.isInCounty( fips, rural ) ) {
        result.type = 'rural';
      } else {
        if( addr.isRuralCensus( censusUC.features, censusUA.features ) ) {
          result.type = 'rural';
        } else {
          result.type = 'notRural';
        }
      }

      result.id = Date.now();

      addr.render( result );
      count.updateCount( result.type );
    } ) )
    .catch( function( error ) {
      console.log( error );
    } )
  } else {
    var result = {};
    result.input = data.result.input.address.address;
    result.address = 'Address not identfied';
    result.countyName = '-';
    result.block = '-';
    result.type = 'notFound';
    count.updateCount( result.type );
    addr.render( result );
  }
}

processAddresses = function( addresses ) {
  var processed = [];

  ruralCounties( DT.getEl( '#year' ).value )
  .then( function( rural ) {
    addresses.forEach( function( address, index ) {

      // if its not dup
      if ( !addr.isDup( address, processed) ) {
        census( address, rural, 'callbacks.censusAPI' );
        processed.push( address );
      } else {
        // setup the result to render
        var result = {};
        result.input = address;
        result.address = 'Duplicate';
        result.countyName = '-';
        result.block = '-';
        result.type = 'duplicate';
        addr.render( result );
        count.updateCount( result.type );
      }
    } );
  } );
}

// on submit
DT.bindEvents( '#geocode', 'submit', function( e ) {
  e.preventDefault();

  window.location.hash = 'rural-or-underserved';
  var addresses = [];

  content.setup();

  [].slice.call( DT.getEls( '.input-address' ) ).forEach(
    function( element ) {
      if ( element.value !== '' ) {
        addresses.push( element.value );
      }
    }
  );

  if ( addresses.length > 1 ) {
    DT.removeClass( '#results-total', 'hide' );
  }

  count.updateAddressCount( addresses.length );
  processAddresses( addresses );
} );

// when file upload is used
DT.bindEvents( '#file', 'change', function( e ) {
  var rowCount = 0;
  var fileElement = DT.getEl( '#file' );
  var fileValue = fileElement.value;

  textInputs.reset();
  DT.getEl( '#fileName' ).value = fileInput.getUploadName( fileValue );

  fileInput.resetError();


  if( fileInput.isCSV( fileValue ) ) {

    // parse the csv to get the count
    Papaparse.parse( fileElement.files[0], {
        header: true,
        step: function( results, parser ) {
          if ( !addrParse.isValid( results ) ) {
            parser.abort();
            fileInput.setError(
              'The header row of your CSV file does not match'
              + ' our <a class="download-link" download href="csv-template.csv"'
              + ' title="Download CSV template"><span>CSV template</span>&nbsp;</a>.'
              + ' Please adjust your CSV file and try again.', 'error' );
            return;
          } else {
            if ( results.data[0]['Street Address'] !== '' ) {
              rowCount++;
            }
          }
        },
        error: function() {
          console.log( arguments );
        },
        complete: function( results, file ) {
          if ( rowCount === 0 ) {
            fileInput.setError( 'There are no rows in this csv.'
                                + ' Please update and try again.', 'error' );
          }
          if (rowCount >= 250) {
            var leftOver = rowCount - 250;
            fileInput.setError( 'You entered '
                                + rowCount
                                + ' addresses for '
                                + DT.getEl( '#year' ).value
                                + ' safe harbor designation. We have a limit of 250 addresses. '
                                + 'You can run the first 250 now, but please recheck the remaining '
                                + leftOver + '.', 'warn' );
          }
        }
    } );
  } else {
    fileInput.setError(
      'The file uploaded is not a CSV file. '
      + 'Please try again with a CSV file that uses '
      + 'our <a class="download-link" download href="csv-template.csv"'
      + 'title="Download CSV template"><span>CSV template</span>&nbsp;</a>.'
      + ' For more information about CSV files, view our'
      + ' Frequently Asked Questions below.', 'error');
  }
} );

// on file submission
DT.bindEvents( '#geocode-csv', 'submit', function( e ) {
  e.preventDefault();

  window.location.hash = 'rural-or-underserved';
  var fileElement = DT.getEl( '#fileName' );
  var fileValue = fileElement.value;
  if ( fileValue === '' || fileValue === 'No file chosen'
       || fileValue === null ) {
    fileInput.setError(
      'You have not selected a file.'
      + ' Use the "Select file"'
      + ' button to select the file with your addresses.', 'error' );

  } else if( fileInput.isCSV( fileValue ) ) {
    var pass = true;
    var rowCount = 0;
    var addresses = [];
    var fileElement = DT.getEl( '#file' );
    textInputs.reset();

    // parse the csv to get the count
    Papaparse.parse( fileElement.files[0], {
        header: true,
        step: function( results, parser ) {
          if ( !addrParse.isValid( results ) ) {
            parser.abort();
            pass = false;
            fileInput.setError(
              'The header row of your CSV file does not match'
              + ' our <a class="download-link" download href="csv-template.csv"'
              + ' title="Download CSV template"><span>CSV template</span>&nbsp;</a>.'
              + ' Please adjust your CSV file and try again.', 'error' );
            return;
          } else {
            if( rowCount < 250 && results.data[0]['Street Address'] !== '' ) {
              addresses = addrParse.pushAddress( results, addresses );
            }
            rowCount++;
          }
        },
        complete: function( results, file ) {
          if ( rowCount === 0 ) {
            pass = false;
            fileInput.setError( 'There are no rows in this csv.'
                                + ' Please update and try again.', 'error' );
          }
          if ( rowCount >= 250 ) {
            var leftOver = rowCount - 250;
            fileInput.setError(
              'You entered ' + rowCount + ' addresses for '
              + DT.getEl( '#year' ).value
              + ' safe harbor designation. We have a limit of 250 addresses.'
              + ' You can run the first 250 now, but please recheck the remaining '
              + leftOver + '.', 'warn');
          }
          if ( addresses.length > 1 ) {
            DT.removeClass( '#results-total', 'hide' );
          }
          if ( pass === true ) {
            content.setup();
            count.updateAddressCount( addresses.length );
            processAddresses( addresses) ;
          }
        }
    } );
  } else {
    fileInput.setError( 'The file uploaded is not a CSV file.'
                        + ' Please try again with a CSV file that uses our'
                        + ' <a class="download-link" download href="csv-template.csv"'
                        + ' title="Download CSV template"><span>CSV template</span>&nbsp;</a>.'
                        + ' For more information about CSV files,'
                        + ' view our Frequently Asked Questions below.', 'error');
  }

  return false;
} );
