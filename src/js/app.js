var $ = require('jquery');
var render = require('./render');
var census = require('./censusCall');
var ruralChecker = require('./rural');

require('./showMap');
require('papaparse');

var notFoundCnt = 0,
    notRuralCnt = 0,
    ruralCnt = 0,
    totalCnt = 0;
    dupCnt = 0;
    rowCnt = 0;
    processedCnt = 0,
    inputCnt = 1;

var dups = [];

window.censusAPI = {};

censusAPI.callback = function(data) {
  // save the query address
  //console.log (data);
  var input = data.result.input.address.address;
  
  // nothing found, render a not found
  if (data.result.addressMatches.length === 0) {
    totalCnt ++;
    notFoundCnt ++;

    render.renderTableRow('notFound', input);

    render.renderCount('notFound', notFoundCnt, totalCnt);
  } else {
    // used to check rural
    var urbanClusters = data.result.addressMatches[0].geographies['Urban Clusters'];
    var urbanAreas = data.result.addressMatches[0].geographies['Urbanized Areas'];

    // used to render results
    var matchedAddress = data.result.addressMatches[0].matchedAddress;
    var x = data.result.addressMatches[0].coordinates.x;
    var y = data.result.addressMatches[0].coordinates.y;
    var county = data.result.addressMatches[0].geographies['Census Blocks'][0].COUNTY;
    var block = data.result.addressMatches[0].geographies['Census Blocks'][0].BLOCK;
    var state = data.result.addressMatches[0].geographies['Census Blocks'][0].STATE;

    // get fips from result (state and county)
    var fipsCode = state + county;

    // load fips (counties that are rural)
    $.getJSON('data/' + $('#year').val() + '.json', function(fips) {
      var rural = false;
      rural = ruralChecker.isRural(fips, fipsCode, urbanAreas, urbanClusters);

      totalCnt ++;

      // if rural is still false
      if (rural === false) {
        notRuralCnt ++;
        render.renderTableRow('notRural', input, matchedAddress, x, y, county, block);
        render.renderCount('notRural', notRuralCnt, totalCnt);
      } else {
        ruralCnt ++;
        render.renderTableRow('rural', input, matchedAddress, x, y, county, block);
        render.renderCount('rural', ruralCnt, totalCnt);
      }
    });
  }
}

// on submit
$('#geocode').submit(function(e) {
  resets();

  render.clearFileInput();

  // count the inputs used
  $('.input-address').each(function(index) {
    if ($(this).val() !== '') {
      rowCnt ++;
    }
  });

  // if no inputs used
  if (rowCnt === 0) {
    // error
    render.renderError('No rows entered.');
  } else {

    // update count
    $('#rowCnt').text(rowCnt);

    // for each input
    $('.input-address').each(function(index) {
      // if its blank do nothing
      // someone could leave a blank input in the middle of others
      if ($(this).val() === '') {
        return;
      }
      // check for duplicates
      if (dups.indexOf($(this).val()) !== -1) {
        // add to counts
        dupCnt ++;
        totalCnt ++;
        // render to counts and dups table
        render.renderCount('dup', dupCnt, totalCnt);
        render.renderTableRow('dup', $(this).val());
        // add warning to the field
        $(this).addClass('warning');
      } else {
        // not a dup, remove the warning and error
        $(this).removeClass('warning error');
        // call API
        census.getRuralUrban($(this).val());
      }
      // push the value to dups for checking others
      dups.push($(this).val());
    });
  }

  return false;
});

// when file upload is used
$('#file').change(function(e) {
  // clear text inputs
  render.clearTextInputs();
  // reset input count
  inputCnt = 1;
});

// on file submission
$('#geocode-csv').submit(function(e) {
  // reset values
  resets();

  // clear remove inputs, except the first one
  render.clearTextInputs();

  // parse the csv to get the count
  $('#file').parse( {
    config: {
      header: true,
      step: function(results, parser) {
        if (results.data[0]['Street Address'] !== '' && !results.errors) {
          return;
        } else {
          rowCnt ++;
        }
      },
      complete: function(results, file) {
        $('#rowCnt').text(rowCnt);
      }
    }, 
    complete: function() {
      // must have been an empty csv
      if (rowCnt === 0) {
        render.renderError('The csv was empty.');
      } else {
        if (rowCnt > 250) {
          var leftOver = rowCnt - 250;
          render.renderError('You entered ' + rowCnt + ' addresses for ' + $('#year').val() + ' safe harbor designation. We have a limit of 250 addresses. Please recheck the remaining ' + leftOver + '.');
        }
        // parse the csv to query API
        $('#file').parse( {
          config: {
            header: true,
            step: function(results, parser) {
              if (processedCnt < 250) {
                // check for blank row
                if (results.data[0]['Street Address'] === '' && results.errors) {
                  return;
                } else {
                  address = results.data[0]['Street Address'] + ', ' + results.data[0].City + ', ' + results.data[0].State + ' ' + results.data[0].Zip;
                  if (dups.indexOf(address) !== -1) {
                    dupCnt ++;
                    totalCnt ++;
                    render.renderCount('dup', dupCnt, totalCnt);
                    render.renderTableRow('dup', address);
                  } else {
                    census.getRuralUrban(address);
                  }
                  dups.push(address);
                  processedCnt ++;
                }
              }
            },
            complete: function(results, file) {
              console.log('query complete');
            }
          }, 
          complete: function() {
            console.log('All files done!');
          }
        });
      }
      console.log('All files done!');
    }
  });

  return false;
});

// reset all the things
function resets() {
  // set year
  $('.chosenYear').text($('#year').val());
  
  render.resetHTML();
  render.showResults();

  notFoundCnt = 0;
  notRuralCnt = 0;
  ruralCnt = 0;
  dupCnt = 0;
  totalCnt = 0;
  rowCnt = 0;
  dups = [];
  inputCnt = 1;
}