var $ = require('jquery');
var contentControl = require('./contentControl');
var count = require('./count');
var textInput = require('./textInputs');
var fileInput = require('./fileInput');

// add inputs
$('#add-another').click(function(e) {
  e.preventDefault();
  textInput.add();
});

// about click
$('#link-about').click(function(e) {
  document.location.hash = '';
  e.preventDefault();
  // show about content
  contentControl.showAbout();
  // clear remove inputs
  textInput.clear();
  fileInput.clear();
  // reset counts
  count.reset();
  $('#fileError').addClass('hide');
  $('#errorMessage').addClass('hide');
  // clear tables
  contentControl.resetHTML();
});

// input blur
$('.input-address').blur(function(e) {
    textInput.isEmpty($(this));
});

// print
$('#print').click(function() {
    window.print();
});

// csv download
function detectIE() {
  var ua = window.navigator.userAgent;

  var msie = ua.indexOf('MSIE ');
  if (msie > 0) {
      // IE 10 or older => return version number
      return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  }

  var trident = ua.indexOf('Trident/');
  if (trident > 0) {
      // IE 11 => return version number
      var rv = ua.indexOf('rv:');
      return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
  }

  var edge = ua.indexOf('Edge/');
  if (edge > 0) {
     // IE 12 => return version number
     return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
  }

  // other browser
  return false;
}

$('#download').click(function() {
  generateCSV();
  if (detectIE() === false) {
      window.open('data:text/csv;charset=utf-8,' + escape(theCSV));
  } else {
      console.log(detectIE());
      var blob = new Blob([theCSV], {type: 'text/csv'});
      navigator.msSaveOrOpenBlob(blob, 'strings.csv');
  }
});

// to csv
var theCSV = '';
var currentTable = '';
var firstTable = true;
function generateCSV() {
  theCSV = 'Address Entered, Address Identified, County, Census Block, Rural or Underserved?' + '\n';

  // loop through each row
  $('.table tbody tr td').each(function () {
    // add a data row
    if (!$(this).parents('.js-table').hasClass('hide')) { // if table isn't hidden (!)
      if(!$(this).attr('colspan')) { // map cols have colspan and we don't want those
        var thisString = $(this).text().replace('Show map', '');
        theCSV = theCSV + ('"' + thisString + '"'); // put the content in first

        if ($(this).is(':last-child')) {
          theCSV = theCSV + '\n';
        } else {
          theCSV = theCSV + ',';
        }
      }
    }
  });
}
