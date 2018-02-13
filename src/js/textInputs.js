var DT = require( './dom-tools' );

module.exports = function() {
  var textInputs = {};
  textInputs.count = 1;

  textInputs.reset = function() {
    textInputs.count = 1;

    DT.applyAll( '.input-address', function( element, index ) {
      if ( element.getAttribute( 'id' ) !== 'address1' ) {
        DT.removeEl( element );
      } else {
        element.value = '';
        DT.removeClass( element, 'error' );
      }
    } );

    DT.removeClass( '#add-another', 'hide' );
  }

  textInputs.add = function() {
    textInputs.count++;

    if ( textInputs.count === 10 ) {
      DT.addClass( '#add-another', 'hide' );
    }

    var previous = textInputs.count - 1;

    if ( DT.getEl( '#address' + previous ).value === '' ) {
      DT.addClass( '#address' + previous, 'error' );
    } else {
      DT.removeClass( '#address' + previous, 'error' );
    }

    var addressElement = DT.getEl( '#address1' ).cloneNode( true );
    addressElement.setAttribute( 'id', 'address' + textInputs.count )
    addressElement.value  = '';
    DT.addEl( '.input-container', addressElement );
    addressElement.focus();
  }

  textInputs.toggleError = function( e ) {
    var target = e.target;
    if( e.target.value === '' ) {
      DT.addClass( target, 'error' );
    } else {
      DT.removeClass( target, 'error' );
    }
  }

  return textInputs;

}();
