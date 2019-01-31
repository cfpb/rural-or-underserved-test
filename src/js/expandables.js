var DT = require( './dom-tools' );

DT.bindEvents( '.question', 'click', function( e ) {
  var questionElement = e.target;
  if ( !DT.hasClass( questionElement, 'question' ) ) questionElement = questionElement.parentNode
  var childElements = DT.getChildEls( questionElement , '.cf-icon' );

  DT.toggleClass( DT.getNextEls( questionElement, '.answer' ), 'hide' );

  if ( DT.hasClass( childElements, 'cf-icon-plus-round' ) ) {
    DT.removeClass( childElements, 'cf-icon-plus-round' );
    DT.addClass( childElements, 'cf-icon-minus-round' );
  } else if ( DT.hasClass( childElements, 'cf-icon-minus-round' ) ) {
    DT.removeClass( childElements, 'cf-icon-minus-round' );
    DT.addClass( childElements, 'cf-icon-plus-round' );
  }

  e.preventDefault();
} );
