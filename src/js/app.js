var $ = require('jquery');
var content = require('./contentControl');
var addressRender = require('./addressRender');
var count = require('./count');
var textInput = require('./textInputs');
var fileInput = require('./fileInput');

var census = require('./callCensus');
var isDup = require('./isDup');
var isFound = require('./isFound');
var ruralCounties = require('./getRuralCounties');
var isInCounty = require('./isInCounty');
var countyName = require('./setCountyName');
var isUrban = require('./isUrban');

require('./showMap');
require('papaparse');
require('./misc');
require('./search-box');
require('./header-nav');
require('./expandables');

var censusResponse;

window.callbacks = {};

callbacks.censusAPI = function(data) {
  censusResponse = data;

  if (isFound(data.result)) {
    ruralCounties($('#year').val(), callbacks.getRuralCounties);
  } else {
    var result = {};
    result.input = data.result.input.address.address;
    result.address = 'Address not identfied';
    result.countyName = '-';
    result.block = '-';
    result.rural = '-';
    result.type = 'notFound';
    count.updateCount(result.type);
    addressRender(result);
  }
}

callbacks.getRuralCounties = function(data) {
  var result = {};
  result.input = censusResponse.result.input.address.address;
  result.address = censusResponse.result.addressMatches[0].matchedAddress;
  result.block = censusResponse.result.addressMatches[0].geographies['Census Blocks'][0].BLOCK;
  result.x = censusResponse.result.addressMatches[0].coordinates.x;
  result.y = censusResponse.result.addressMatches[0].coordinates.y;

  var fips = censusResponse.result.addressMatches[0].geographies['Census Blocks'][0].STATE + censusResponse.result.addressMatches[0].geographies['Census Blocks'][0].COUNTY;
  result.countyName = countyName(fips);

  if(isInCounty(fips, data)) {
    result.rural = 'Yes';
    result.type = 'rural';
  } else {
    var urbanClusters = censusResponse.result.addressMatches[0].geographies['Urban Clusters'];
    var urbanAreas = censusResponse.result.addressMatches[0].geographies['Urbanized Areas'];

    if(isUrban(urbanClusters, urbanAreas)) {
      result.rural = 'Yes';
      result.type = 'rural';
    } else {
      result.rural = 'No';
      result.type = 'notRural';
    }
  }

  result.id = Date.now();

  addressRender(result);
  count.updateCount(result.type);
}

processAddresses = function(addresses) {
  duplicates = [];

  $.each(addresses, function(index, address) {
    // if its not dup
    if (!isDup(address, duplicates)) {
      census(address, 'callbacks.censusAPI');
      duplicates.push(address);
    } else {
      // setup the result to render
      var result = {};
      result.input = address;
      result.address = 'Duplicate';
      result.countyName = '-';
      result.block = '-';
      result.rural = '-';
      result.type = 'duplicate';
      addressRender(result);
      count.updateCount(result.type);
    }
  });
}

// on submit
$('#geocode').submit(function(e) {
  var addresses = [];

  content.setup();
  document.location.hash = 'results';

  $('.input-address').each(function(index) {
      if ($(this).val() !== '') {
          addresses.push($(this).val());
      }
  });

  count.updateAddressCount(addresses.length);
  processAddresses(addresses);
  return false;
});

// when file upload is used
$('#file').change(function(e) {

    var addresses = [];

    // clear text inputs
    textInput.clear();

    // show file name
    var uploadName = $('#file').val();
    if (uploadName.indexOf('\\') > -1) {
      uploadNameParts = uploadName.split('\\');
      uploadName = uploadNameParts[uploadNameParts.length - 1];
    }
    $('#fileName').val(uploadName);

    $('#fileError').addClass('hide');

    // parse the csv to get the count
    $('#file').parse( {
        config: {
            header: true,
            step: function(results, parser) {
                if (results.data[0]['Street Address'] === '' && results.errors) {
                    return;
                } else {
                    addresses.push(results.data[0]['Street Address'] + ', ' + results.data[0].City + ', ' + results.data[0].State + ' ' + results.data[0].Zip);
                }
            },
            complete: function(results, file) {
                if (addresses.length === 0) {
                    fileInput.error('- There are no rows in this csv. Please update and try again.');
                }
                if (addresses.length >= 250) {
                    fileInput.error('- There are over 250 rows in the csv. We will only process the first 250 rows.');
                }
            }
        },
        complete: function() {
            console.log('All files done!');
        }
    });
});

// on file submission
$('#geocode-csv').submit(function(e) {
    content.setup();
    var rowCount = 0;
    var processedCount = 0;

    document.location.hash = 'results';

    // clear remove inputs, except the first one
    textInput.clear();

    var addresses = [];

    // parse the csv to get the count
    $('#file').parse({
        config: {
            header: true,
            step: function(results, parser) {
                if (results.data[0]['Street Address'] === '' && results.errors) {
                    return;
                } else {
                    if(rowCount < 250) {
                        addresses.push(results.data[0]['Street Address'] + ', ' + results.data[0].City + ', ' + results.data[0].State + ' ' + results.data[0].Zip);
                        processedCount ++;
                    }
                    rowCount ++;
                }
            },
            complete: function(results, file) {
                $('#rowCount').text(rowCount);
                if (rowCount > 250) {
                  var leftOver = rowCount - 250;

                  fileInput.error('You entered ' + rowCount + ' addresses for ' + $('#year').val() + ' safe harbor designation. We have a limit of 250 addresses. Please recheck the remaining ' + leftOver + '.');
                }
                count.updateAddressCount(addresses.length);
                processAddresses(addresses);
            }
        }
    });

    return false;
});
