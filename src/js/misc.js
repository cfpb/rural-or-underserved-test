var $ = require('jquery');
var render = require('./render');

// add inputs
$('#add-another').click(function(e) {
  e.preventDefault();
  inputCnt ++;

  // remove the link if we have 10 inputs
  if (inputCnt === 10) {
    $('#add-another').remove();
  }

  if ($('#address' + inputCnt).val() === '') {
    $('#address' + inputCnt).addClass('error');
  } else {
    $('#address' + inputCnt).removeClass('error');
  }

  // clone and add input
  $('#address1').clone(true)
    .appendTo('.input-container')
    .attr('id', 'address' + inputCnt)
    .val('')
    .focus();
});

// about click
$('#link-about').click(function(e) {
  document.location.hash = '';
  e.preventDefault();
  // clear remove inputs, except the first one
  render.clearTextInputs();
  render.clearFileInput();
  render.showAbout();
});

// input blur
$('.input-address').blur(function(e) {
  if ($(this).val() === '') {
    $(this).addClass('error');
  } else {
    $(this).removeClass('error warning');
  }
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
  theCSV = '';

  // loop through each row
  $('.table thead tr th, .table thead tr td, .table tbody tr td').each(function () {
    // set the heading for csv
    // one for each table
    if (currentTable !== $(this).parents('.js-table').attr('id')) {
      if (firstTable != true) { // for a new line after
        theCSV = theCSV + '\n';
      }
      firstTable = false;
      theCSV = theCSV + $(this).parents('.js-table').children('h3').text() + '\n';

      currentTable = $(this).parents('.js-table').attr('id');
    }

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