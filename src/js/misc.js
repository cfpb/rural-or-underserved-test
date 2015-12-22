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

  $('#download').click(function(e) {
    // this works but on windows both chrome and ff don't give .csv extension
    e.preventDefault();
    var theCSV = generateCSV();
    if (detectIE() === false) {
      window.open('data:text/csv;charset=utf-8,' + encodeURIComponent(theCSV));
    } else {
      var blob = new Blob([theCSV], {type: 'text/csv;charset=utf-8,'});
      navigator.msSaveOrOpenBlob(blob, 'rural-or-underserved.csv');
    }

    /*
    TEST 2
    //
    // this works but on windows both chrome and ff don't give .csv extension
    //
    e.preventDefault();
    var theCSV = generateCSV();
    if (detectIE() === false) {
      var blob = new Blob([theCSV], {
        "type": "text/csv;charset=utf8;"
      });
      var element = document.createElement('a');
      element.setAttribute('download', 'rural-or-underserved.csv');
      element.setAttribute('href', window.URL.createObjectURL(blob));
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    } else {
        var blob = new Blob([theCSV], {type: 'text/csv;charset=utf-8,'});
        navigator.msSaveOrOpenBlob(blob, 'rural-or-underserved.csv');
    }
    */

    /*
    TEST 3
    //
    // this causes a new window to open containing the contents of the csv
    // this happens even on a mac
    //
    e.preventDefault();
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(theCSV));
    element.setAttribute('download', 'rural-or-underserved.csv');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    */
  });

  function generateCSV() {
    var theCSV = '';
    var date = new Date();
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    theCSV = 'Address entered, Address identified, County, Rural or underserved?, Date processed' + '\n';

    // loop through each row
    $('.table tbody tr td').each(function () {
      // add a data row
      if (!$(this).parents('.js-table').hasClass('hide')) { // if table isn't hidden (!)
        if(!$(this).attr('colspan')) { // map cols have colspan and we don't want those
          var thisString = $(this).text().replace('Show map', '');
          theCSV = theCSV + ('"' + thisString + '"'); // put the content in first

          if ($(this).is(':last-child')) {
            theCSV = theCSV + ',' + monthIndex + '/' + day + '/' + year + '\n';
          } else {
            theCSV = theCSV + ',';
          }
        }
      }
    });

    return theCSV;
  }
});
