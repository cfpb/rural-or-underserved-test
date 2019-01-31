var DT = require( './dom-tools' );

module.exports = function() {
  var counters = {};
  var types = {}
  var totalCount = 0

  counters.reset = function() {
    DT.changeElHTML( '.counter', '0' );
    types = {}
    totalCount = 0
  }

  counters.updateAddressCount = function( number ) {
    DT.changeElText( '#addressCount', number );
  }

  counters.incrementTotal = function() {

    var totalCountElement = DT.getEl( '#totalCnt' );
    var addressCount = parseInt( DT.getEl( '#addressCount' ).textContent, 10 );

    // add one to the total
    totalCount++

    DT.changeElText( totalCountElement, totalCount );

    // hide spinner
    if ( totalCount === addressCount ) {
      DT.addClass( '#spinner', 'hide' );
    }
  }

  counters.updateCount = function( type ) {
    var noun = 'addresses';
    var verb = 'are';

    var countElements = DT.getEls( '.' + type + 'Cnt' );
    // add one to correct type
    var typeCount = types[type] || 0
    types[type] = ++typeCount
    DT.changeElText( countElements, typeCount );

    if( typeCount === 1 ) {
      noun = 'address';
      verb = 'is'
    }

    DT.changeElText( '.' + type + 'Verb', verb );
    DT.changeElText( '.' + type + 'Case', noun + ' ' + verb );

    counters.incrementTotal()
  }

  return counters;
}();
