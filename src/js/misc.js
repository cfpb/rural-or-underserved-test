var $ = require('jquery');
var contentControl = require('./contentControl');
var count = require('./count');
var textInputs = require('./textInputs');
var fileInput = require('./fileInput');

$(function(){
  // add inputs
  $('#add-another').on('click', function(e) {
    e.preventDefault();
    textInputs.add();
  });

  // input blur
  $('.input-address').on('blur', function(e) {
    textInputs.toggleError(e);
  });

  // about click
  $('#link-about').click(function(e) {
    e.preventDefault();
    fileInput.resetError();
    // show about content
    contentControl.showAbout();
    // clear remove inputs
    textInputs.reset();
    //fileInput.resetFileName();
    // reset counts
    count.reset();
    fileInput.resetError();
    // clear tables
    contentControl.resetHTML();
  });

  // show more rows
  $('.button-more').click(function(e) {
    e.preventDefault();
    var table = $(this).data('table');
    var lengthTotal = $('#' + table + ' tbody tr.data').length;
    var lengthShown = $('#' + table + ' tbody tr.data').not('.hide').length;

    for (i = lengthShown; i < lengthShown + 10; i++) {
      $('#' + table + ' tbody tr.data').eq(i).removeClass('hide');
    }

    if (lengthShown + 10 >= lengthTotal) {
      $('#' + table + 'More').addClass('hide');
      $('#' + table + 'All').addClass('hide');
    }
  });

  $('.view-all').click(function(e) {
    e.preventDefault();
    var table = $(this).data('table');
    $('#' + table + ' tbody tr.data').removeClass('hide');
    $('#' + table + 'More').addClass('hide');
    $('#' + table + 'All').addClass('hide');
  })

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
});
