var DT = require( './dom-tools' );

DT.bindEvents( '.question', 'click', function( e ) {
  var questionElement = e.currentTarget;

  if ( !DT.hasClass( questionElement, 'question' ) ) questionElement = questionElement.parentNode
  DT.toggleClass( DT.getNextEls( questionElement, '.answer' ), 'hide' );

  var openIcon = questionElement.querySelector( '.open-icon' );
  var closedIcon = questionElement.querySelector( '.closed-icon' );

  if ( openIcon.classList.contains( 'hide' ) ) {
    openIcon.classList.remove( 'hide' );
    closedIcon.classList.add( 'hide' );
  } else {
    openIcon.classList.add( 'hide' );
    closedIcon.classList.remove( 'hide' );
  }

  e.preventDefault();
} );
