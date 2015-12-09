var $ = require('jquery');
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

// on submit
$('#geocode').submit(function(e) {
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
            return;
          } else {
            rowCount ++;
          }
        },
        complete: function(results, file) {
          if (rowCount === 0) {
            fileInput.setError('There are no rows in this csv. Please update and try again.');
          }
          if (rowCount >= 250) {
            var leftOver = rowCount - 250;
            fileInput.setError('You entered ' + rowCount + ' addresses for ' + $('#year').val() + ' safe harbor designation. We have a limit of 250 addresses. You can run the first 250 now, but please recheck the remaining ' + leftOver + '.');
          }
        }
      },
      complete: function() {
      }
    });
  } else {
    fileInput.setError('The file uploaded is not a CSV file. Please try again with a CSV file that uses our <a class="download-link" download href="csv-template.csv" title="Download CSV template"><span>CSV template</span>&nbsp;</a>. For more information about CSV files, view our Frequently Asked Questions below.');
  }
});

// on file submission
$('#geocode-csv').submit(function(e) {
  if(fileInput.isCSV($('#file').val())) {
    content.setup();
    var rowCount = 0;
    textInputs.reset();

    var addresses = [];

    // parse the csv to get the count
    $('#file').parse({
      config: {
        header: true,
        step: function(results, parser) {
          if (!addrParse.isValid(results)) {
            return;
          } else {
            if(rowCount < 250) {
              addresses = addrParse.pushAddress(results, addresses);
            }
            rowCount ++;
          }
        },
        complete: function(results, file) {
          if (rowCount === 0) {
            fileInput.setError('There are no rows in this csv. Please update and try again.');
          }
          if (rowCount >= 250) {
            var leftOver = rowCount - 250;
            fileInput.setError('You entered ' + rowCount + ' addresses for ' + $('#year').val() + ' safe harbor designation. We have a limit of 250 addresses. You can run the first 250 now, but please recheck the remaining ' + leftOver + '.');
          }
          if (addresses.length > 1) {
            $('#results-total').removeClass('hide');
          }
          count.updateAddressCount(addresses.length);
          processAddresses(addresses);
        }
      }
    });
  } else {
    fileInput.setError('The file uploaded is not a CSV file. Please try again with a CSV file that uses our <a class="download-link" download href="csv-template.csv" title="Download CSV template"><span>CSV template</span>&nbsp;</a>. For more information about CSV files, view our Frequently Asked Questions below.');
  }

    return false;
});
