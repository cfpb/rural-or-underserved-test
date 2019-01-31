var contentControl = require( './contentControl' );
var count = require( './count' );
var textInputs = require( './textInputs' );
var fileInput = require( './fileInput' );
var DT = require( './dom-tools' );

document.addEventListener( 'DOMContentLoaded', function(){

  // add inputs
  DT.bindEvents( '#add-another', 'click', function( e ) {
    e.preventDefault();
    textInputs.add();
  } );

  // input blur
  DT.bindEvents( '.input-address', 'blur', function( e ) {
    textInputs.toggleError(e);
  } );

  // show more rows
  DT.bindEvents( '.button-more', 'click', function( e ) {
    var moreButton = e.target;
    e.preventDefault();
    var tableID = DT.getElData( moreButton, 'table' );
    var tableRows = DT.getEls( '#' + tableID + ' tbody tr.data' );
    var tableRowsLength = tableRows.length;
    var lengthShown = Array.prototype.filter.call(
      tableRows, function(v) {
        return !v.classList.contains('hide')
      }).length
    for ( var i = lengthShown; i < lengthShown + 10; i++ ) {
      DT.removeClass(
        tableRows[i],
        'hide'
      );
    }

    if ( lengthShown + 10 >= tableRowsLength ) {
      DT.addClass( '#' + tableID + 'More', 'hide' );
      DT.addClass( '#' + tableID + 'All', 'hide' );
    }
  } );

  DT.bindEvents( '.view-all', 'click', function( e ) {
    e.preventDefault();
    var tableID = DT.getElData( e.target, 'table' );
    DT.removeClass( '#' + tableID + ' tbody tr.data', 'hide' );
    DT.addClass( '#' + tableID + 'More', 'hide' );
    DT.addClass( '#' + tableID + 'All', 'hide' );
  } )

  // print
  DT.bindEvents( '#print', 'click',  window.print.bind(window) );

  // csv download
  function detectIE() {
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {

        // IE 10 or older => return version number
        return parseInt(
          ua.substring( msie + 5, ua.indexOf( '.', msie ) ), 10
        );
    }

    var trident = ua.indexOf( 'Trident/' );
    if ( trident > 0 ) {

        // IE 11 => return version number
        var rv = ua.indexOf( 'rv:' );
        return parseInt(
                ua.substring( rv + 3, ua.indexOf('.', rv ) ), 10
              );
    }

    var edge = ua.indexOf( 'Edge/' );
    if ( edge > 0 ) {

       // IE 12 => return version number
       return parseInt( ua.substring( edge + 5, ua.indexOf( '.', edge ) ), 10) ;
    }

    // other browser
    return false;
  }

  DT.bindEvents( '#download', 'click', function( e ) {
    e.preventDefault();
    var theCSV = generateCSV();
    if ( detectIE() === false ) {
      window.open(
        ' data:text/csv;charset=utf-8,' + encodeURIComponent( theCSV )
      );
    } else {
      var blob = new Blob( [theCSV], { type: 'text/csv;charset=utf-8,' } );
      navigator.msSaveOrOpenBlob( blob, 'rural-or-underserved.csv' );
    }
  } );

  function generateCSV() {
    var theCSV = '';
    var date = new Date();
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    theCSV =
      'Address entered, Address identified, County, Rural'
      + ' or underserved?, Date processed' + '\n';

    function _loopHandler( element ) {
      var isHidden = DT.hasClass( DT.getParentEls( '.js-table' ), 'hide' );

      // add a data row, if table isn't hidden (!)
      if ( isHidden === false ) {

        // map cols have colspan and we don't want those
        if( element.getAttribute( 'colspan' ) === null ) {
          var CSVLabel = element.textContent.replace( 'Show map', '' );
          theCSV = theCSV + ( '"' + CSVLabel + '"' ); // put the content in first

          if ( element.matches( ':last-child' ) ) {
            theCSV = theCSV + ',' + monthIndex + '/' + day + '/' + year + '\n';
          } else {
            theCSV = theCSV + ',';
          }
        }
      }
    }

    // loop through each row
    [].slice.call( DT.getEls( '.table tbody tr td' ) )
    .forEach( _loopHandler  );

    return theCSV;
  }
} );
