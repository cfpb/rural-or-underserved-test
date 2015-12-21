var $ = require('jquery');
require('sammy');
var content = require('./contentControl');
var addr = require('./address');
var addrParse = require('./addressParse');
var count = require('./count');
var textInputs = require('./textInputs');
var fileInput = require('./fileInput');

var census = require('./callCensus');
var tiger = require('./callTiger');
var ruralCounties = require('./getRuralCounties');

require('./showMap');
require('papaparse');
require('./misc');
require('./search-box');
require('./header-nav');
require('./expandables');

window.callbacks = {};

callbacks.censusAPI = function(data, rural) {
  if (addr.isFound(data.result)) {
    var result = {};
    result.x = data.result.addressMatches[0].coordinates.x;
    result.y = data.result.addressMatches[0].coordinates.y;

    $.when(tiger(result.x, result.y, '86'),
      tiger(result.x, result.y, '66'),
      tiger(result.x, result.y, '64'))
    .then(function(countyData, UCData, UAData) {
      var censusCounty = JSON.parse(countyData[0]);
      var censusUC = JSON.parse(UCData[0]);
      var censusUA = JSON.parse(UAData[0]);

      result.input = data.result.input.address.address;
      result.address = data.result.addressMatches[0].matchedAddress;
      result.countyName = censusCounty.features[0].attributes.BASENAME;

      var fips = censusCounty.features[0].attributes.STATE + censusCounty.features[0].attributes.COUNTY;

      if(addr.isInCounty(fips, rural)) {
        result.type = 'rural';
      } else {
        if(addr.isRuralCensus(censusUC.features, censusUA.features)) {
          result.type = 'rural';
        } else {
          result.type = 'notRural';
        }
      }

      result.id = Date.now();

      addr.render(result);
      count.updateCount(result.type);
    });
  } else {
    var result = {};
    result.input = data.result.input.address.address;
    result.address = 'Address not identfied';
    result.countyName = '-';
    result.block = '-';
    result.type = 'notFound';
    count.updateCount(result.type);
    addr.render(result);
  }
}

processAddresses = function(addresses) {
  duplicates = [];

  $.when(ruralCounties($('#year').val()))
  .then(function(rural) {
    $.each(addresses, function(index, address) {
      // if its not dup
      if (!addr.isDup(address, duplicates)) {
        census(address, rural, 'callbacks.censusAPI');
        duplicates.push(address);
      } else {
        // setup the result to render
        var result = {};
        result.input = address;
        result.address = 'Duplicate';
        result.countyName = '-';
        result.block = '-';
        result.type = 'duplicate';
        addr.render(result);
        count.updateCount(result.type);
      }
    });
  });
}

var app = $.sammy(function() {

  this.get('/', function(context) {
    fileInput.resetError();
    // show about content
    content.showAbout();
    // clear remove inputs
    textInputs.reset();
    // reset counts
    count.reset();
    fileInput.resetError();
    // clear tables
    content.resetHTML();
  });

  this.get('#', function(context) {
    context.run('/');
  });

  this.get('#rural-or-underserved', function(context) {

  });
});

$(function() {
  app.run();
});

// on submit
$('#geocode').submit(function(e) {
  window.location.hash = 'rural-or-underserved';
  var addresses = [];

  content.setup();

  $('.input-address').each(function(index) {
    if ($(this).val() !== '') {
      addresses.push($(this).val());
    }
  });

  if (addresses.length > 1) {
    $('#results-total').removeClass('hide');
  }

  count.updateAddressCount(addresses.length);
  processAddresses(addresses);
  return false;
});

// when file upload is used
$('#file').change(function(e) {
  var rowCount = 0;
  textInputs.reset();
  $('#fileName').val(fileInput.getUploadName($('#file').val()));
  fileInput.resetError();

  if(fileInput.isCSV($('#file').val())) {
    // parse the csv to get the count
    $('#file').parse( {
      config: {
        header: true,
        step: function(results, parser) {
          if (!addrParse.isValid(results)) {
            parser.abort();
            fileInput.setError('The header row of your CSV file does not match our <a class="download-link" download href="csv-template.csv" title="Download CSV template"><span>CSV template</span>&nbsp;</a>. Please adjust your CSV file and try again.', 'error');
            return;
          } else {
            if (results.data[0]['Street Address'] !== '') {
              rowCount ++;
            }
          }
        },
        complete: function(results, file) {
          if (rowCount === 0) {
            fileInput.setError('There are no rows in this csv. Please update and try again.', 'error');
          }
          if (rowCount >= 250) {
            var leftOver = rowCount - 250;
            fileInput.setError('You entered ' + rowCount + ' addresses for ' + $('#year').val() + ' safe harbor designation. We have a limit of 250 addresses. You can run the first 250 now, but please recheck the remaining ' + leftOver + '.', 'warn');
          }
        }
      },
      complete: function() {
      }
    });
  } else {
    fileInput.setError('The file uploaded is not a CSV file. Please try again with a CSV file that uses our <a class="download-link" download href="csv-template.csv" title="Download CSV template"><span>CSV template</span>&nbsp;</a>. For more information about CSV files, view our Frequently Asked Questions below.', 'error');
  }
});

// on file submission
$('#geocode-csv').submit(function(e) {
  window.location.hash = 'rural-or-underserved';
  if ($('#file').val() === '' || $('#file').val() === 'No file chosen' || $('#file').val() === null) {
    fileInput.setError('You have not selected a file. Use the "Select file" button to select the file with your addresses.', 'error');
  } else if(fileInput.isCSV($('#file').val())) {
    var pass = true;
    var rowCount = 0;
    var addresses = [];
    textInputs.reset();

    // parse the csv to get the count
    $('#file').parse({
      config: {
        header: true,
        step: function(results, parser) {
          if (!addrParse.isValid(results)) {
            parser.abort();
            pass = false;
            fileInput.setError('The header row of your CSV file does not match our <a class="download-link" download href="csv-template.csv" title="Download CSV template"><span>CSV template</span>&nbsp;</a>. Please adjust your CSV file and try again.', 'error');
            return;
          } else {
            if(rowCount < 250 && results.data[0]['Street Address'] !== '') {
              addresses = addrParse.pushAddress(results, addresses);
            }
            rowCount ++;
          }
        },
        complete: function(results, file) {
          if (rowCount === 0) {
            pass = false;
            fileInput.setError('There are no rows in this csv. Please update and try again.', 'error');
          }
          if (rowCount >= 250) {
            var leftOver = rowCount - 250;
            fileInput.setError('You entered ' + rowCount + ' addresses for ' + $('#year').val() + ' safe harbor designation. We have a limit of 250 addresses. You can run the first 250 now, but please recheck the remaining ' + leftOver + '.', 'warn');
          }
          if (addresses.length > 1) {
            $('#results-total').removeClass('hide');
          }
          if (pass === true) {
            content.setup();
            count.updateAddressCount(addresses.length);
            processAddresses(addresses);
          }
        }
      }
    });
  } else {
    fileInput.setError('The file uploaded is not a CSV file. Please try again with a CSV file that uses our <a class="download-link" download href="csv-template.csv" title="Download CSV template"><span>CSV template</span>&nbsp;</a>. For more information about CSV files, view our Frequently Asked Questions below.', 'error');
  }

    return false;
});
