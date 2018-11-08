'use strict';

var fastDom = require( 'fastdom' );

var NO_OP = function NO_OP( ) {
  // Placeholder function meant to be overridden.
};

var _matches = ( function _getMatches( ) {
  var el = document.body;
  return (
    el.matches ||
    el.webkitMatchesSelector ||
    el.mozMatchesSelector ||
    el.msMatchesSelector
  );
} )( );

function _mutate( selector, callback ) {
  DT.applyAll( selector, function( element ) {
    fastDom.mutate( callback.bind( null, element ) );
  } );
}

// Code copied from jQuery with minimal modifications.
// XHTML parsers do not magically insert elements in the
// same way that tag soup parsers do. So we cannot shorten
// this by omitting <tbody> or other required elements.
var firstTag =  /<([a-z][^\/\0>\x20\t\r\n\f]+)/;
var wrapMap = {
  col:     [ 2, '<table><colgroup>', '</colgroup></table>' ],
  default: [ 0, '', '' ],
  option:  [ 1, '<select multiple=\'multiple\'>', '</select>' ],
  td:      [ 3, '<table><tbody><tr>', '</tr></tbody></table>' ],
  thead:   [ 1, '<table>', '</table>' ],
  tr:      [ 2, '<table><tbody>', '</tbody></table>' ]
};


var DT = {
  applyAll: function applyAll( elements, applyFn ) {
    if ( elements instanceof HTMLElement ) {
      elements = [elements];
    } else if ( typeof elements === 'string' ) {
      elements = DT.getEls( elements );
    }

    return [].slice.call( elements || [] ).forEach( applyFn );
  },
  bindEvents: function bindEvents( elements, events, callback ) {
    if ( Array.isArray( events ) === false ) {
      events = [ events ];
    }

    DT.applyAll( elements, function( element ) {
      events.forEach( function( event ) {
        element.addEventListener( event, callback || NO_OP );
      } );
    } );
  },
  addEl: function addEl( parent, child ) {
    return fastDom.mutate( function( ) {
      var el = DT.createEl( child );
      return DT.getEl( parent ).appendChild( el );
    } );
  },
  getElData: function getElData( selector, attributeName ) {
    return DT.getEl( selector )
           .getAttribute( 'data-' + attributeName );
  },
  changeElText: function changeElText( selector, text ) {
    return _mutate( selector, function( element ) {
        return ( element.textContent = text );
      } );
  },
  changeElHTML: function changeElHTML( selector, HTML ) {
    return _mutate( selector, function( element ) {
      return ( element.innerHTML = HTML );
    } );
  },

  // Code copied from jQuery with minimal modifications.
  createEl: function createEl( HTML ) {
    if ( DT.isEl( HTML ) ) {
      return HTML;
    }
    var container = document.createElement( 'div' );
    var tag = ( firstTag.exec( HTML ) || [ '', '' ] )[ 1 ].toLowerCase();
    var elWrapper = wrapMap[ tag ] || wrapMap.default;
    var docFrag = document.createDocumentFragment();
    container.innerHTML = elWrapper[ 1 ] + HTML + elWrapper[ 2 ];
    var wrapperCount = elWrapper[ 0 ];
    while( wrapperCount-- ) {
      container = container.firstChild;
    }

    [].slice.call( container.childNodes ).forEach( function( node ) {
      docFrag.appendChild( node );
    } );

    return docFrag;
  },
  removeEl: function removeEl( selector ) {
    return _mutate( selector,  function( element ) {
      return element.parentNode.removeChild( element );
    } );
  },
  addClass: function addClass( selector, className ) {
    var classNames = [].slice.call( arguments ).slice( 1 );
    return _mutate( selector, function( element ) {
      var _classList;
      return ( _classList = element.classList )
             .add.apply( _classList, classNames );
    } );
  },
  hasClass: function hasClass( selector, className ) {
    var _hasClass = false;
    DT.applyAll( selector, function( element ) {
      if ( element.classList.contains( className ) ) {
        _hasClass = true;
      }
    } );
    return _hasClass;
  },
  removeClass: function removeClass( selector, className ) {
    var classNames = [].slice.call( arguments ).slice( 1 );
    return _mutate( selector, function( element ) {
      var _classList;
      return ( _classList = element.classList )
             .remove.apply( _classList, classNames );
      } );
  },
  toggleClass: function toggleClass( selector, className ) {
    return _mutate( selector,  function( element ) {
        return element.classList.toggle( className );
    } );
  },
  filter: function filter( element, propName, filter ) {
    var _propName = propName || '';
    var _filter = filter || '*';

    var nodes = [];
    var node = element[propName];

    while ( node && node !== document ) {
      if ( _matches.call( node, _filter ) ) {
        nodes.push( node );
      }
      node = node[propName];
    }
    return nodes;
  },
  getEl: function getEl( selector ) {
    if ( DT.isEl( selector ) ) {
      return selector;
    }
    return document.querySelector( selector );
  },
  getEls: function getEls( selector ) {
    if ( DT.isEl( selector ) ) {
      return selector;
    }
    return document.querySelectorAll( selector );
  },
  getChildEls: function getChildEls( element, filter ) {
    var firstChild = element.childNodes[0];
    var elements = DT.getNextEls( firstChild, filter );
    if ( firstChild.matches( filter ) ) {
      elements.unshift( firstChild );
    }
    return elements;
  },
  getParentEls: function getParentEls( element, filter ) {
    return DT.filter( element, 'parentNode', filter );
  },
  getPreviousEls: function getPreviousEls( element, filter ) {
    return DT.filter( element, 'previousElementSibling', filter );
  },
  getNextEls: function getNextEls( element, filter ) {
    return DT.filter( element, 'nextElementSibling', filter );
  },
  isEl: function isEl( element ) {
    return (
      element instanceof NodeList ||
      element instanceof HTMLElement ||
      element instanceof DocumentFragment ||
      element instanceof Window
    );
  },
  hide: function hide( selector ) {
    return _mutate( selector, function( ) {
      return ( element.style.display = 'block' );
    } );
  },
  show: function show( selector ) {
    return _mutate( selector, function( ) {
      return ( element.style.display = 'block' );
    } );
  },
  fadeIn: function fadeIn( selector, time, callback ) {
    var element = DT.getEl( selector );
    element.style.transition = 'opacity ' + time + 'ms ease-in-out';
    element.style.opacity = 0.05;
    element.style.display = 'block';

    window.setTimeout( function( ) {
      return ( element.style.opacity = 1 );
    }, 100 );

    window.setTimeout( function( ) {
      element.style.display = 'block';
      return ( callback || NO_OP )( );
    }, time );
  },
  fadeOut: function fadeOut( selector, time, callback ) {
    var element = DT.getEl( selector );
    element.style.transition = 'opacity ' + time + 'ms ease-in-out';
    element.style.opacity = 1;

    window.setTimeout( function( ) {
      return ( element.style.opacity = 0.05 );
    }, 100 );

    window.setTimeout( function( ) {
      element.style.display = 'none';
      return ( callback || NO_OP )( );
    }, time );
  },
  mutate: function mutate( callback ) {
    _mutate( callback );
  },
  nextFrame: function nextFrame( callback ) {
    fastDom.raf( callback );
  }
};

module.exports = DT;
