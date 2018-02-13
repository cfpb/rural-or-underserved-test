var DT = require( './dom-tools' );

module.exports = function() {
  var counters = {};

  counters.reset = function() {
    DT.changeElHTML( '.counter', '0' );
  }

  counters.updateAddressCount = function( number ) {
    DT.changeElText( '#addressCount', number );
  }

  counters.updateCount = function( type ) {
    var noun = 'addresses';
    var verb = 'are';

    var countElements = DT.getEls( '.' + type + 'Cnt' );

    // add one to correct type
    var typeCount = parseInt( countElements[0].textContent, 10 );
    typeCount++
    DT.changeElText( countElements, typeCount );

    if( typeCount === 1 ) {
      noun = 'address';
      verb = 'is'
    }

    DT.changeElText( '.' + type + 'Verb', verb );
    DT.changeElText( '.' + type + 'Case', noun + ' ' + verb );

    var totalCountElement = DT.getEl( '#totalCnt' );
    var addressCount = parseInt( DT.getEl( '#addressCount' ).textContent, 10 );

    // add one to the total
    var totalCount = parseInt( totalCountElement.textContent , 10 );
    totalCount++

    DT.changeElText( totalCountElement, totalCount );

    // hide spinner
    if ( totalCount === addressCount ) {
      DT.addClass( '#spinner', 'hide' );
    }
  }

  return counters;
}();
