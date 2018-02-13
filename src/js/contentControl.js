var DT = require( './dom-tools' );
var count = require( './count' );

var monthNames = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August', 'September',
  'October', 'November', 'December'
];

module.exports = function() {

  function hideData() {

    // hide the data sections
    // these get shown as needed in addresses.js (render)
    DT.addClass( '#rural', 'hide' );
    DT.addClass( '#notRural', 'hide' );
    DT.addClass( '#duplicate', 'hide' )
    DT.addClass( '#notFound', 'hide' );
  }

  var content = {};

  content.setup = function() {

    // set year
    var yearValue =  DT.getEl( '#year' ).value;

    DT.changeElText( '.chosenYear', yearValue );
    DT.changeElText( '.chosenYear1', yearValue + 1 );
    DT.changeElText( '.chosenYear2', yearValue + 2 );

    // set report generated date
    var date = new Date();
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    DT.changeElText( '.report-date',
      'Report generated ' + monthNames[monthIndex] + ' ' + day + ', ' + year
    );

    DT.addClass( '#fileError', 'hide' );
    DT.addClass( '#errorMessage', 'hide' );
    DT.removeClass( '#spinner', 'hide' );

    count.reset();
    this.resetHTML();
    this.showResults();
  }

  content.showResults = function() {

    // hide about
    DT.addClass( '#about', 'hide' );
    hideData();

    // show the results
    DT.removeClass( '#results', 'hide' );
  }

  content.showAbout = function() {

    // show about
    DT.removeClass( '#about', 'hide' );

    // hide the results
    DT.addClass( '#results', 'hide' );

    hideData();
  }

  content.resetHTML = function() {

    // clear the body of all the tables (data)
    DT.changeElHTML( 'tbody', '' );
  }

  content.error = function(message) {
    DT.changeElHTML( '#errorMessage', message );
    DT.removeClass( '#errorMessage', 'hide' );
  }

  return content;
}();
