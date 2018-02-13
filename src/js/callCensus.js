require( 'es6-promise' ).polyfill();
var jsonP = require( 'jsonp-p' ).default;
var DT = require( './dom-tools' );

module.exports = function( address, rural, cb ) {
  var url = 'https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?';
  url += 'address=' + address;
  url += '&benchmark=4'
  url += '&format=jsonp';

  jsonP( url ).promise
  .then( function( data ) {
      window.callbacks.censusAPI( data, rural );
    }
  )
  .catch( function( error ) {
    if ( error ) {
      var addressElement = DT.createEl( '<li>' + address + '</li>' )

      DT.addEl( DT.getEl( '#processErrorDesc' ), addressElement );

      DT.removeClass( '#processError', 'hide' );

      var totalCountElement = DT.getEl( '#totalCnt' );
      var addressCount = parseInt( DT.getEl( '#addressCount' ).textContent, 10 );

      // add one to the total
      var totalCount = parseInt( totalCountElement.textContent , 10 );
      totalCountElement.textContent = totalCount++;

      // hide spinner
      if ( totalCount === addressCount ) {
        DT.addClass( 'spinner', 'hide' );
      }
    }
  } );
};
