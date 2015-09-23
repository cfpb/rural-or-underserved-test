var $ = require('jquery');
var render = require('./render');
var census = require('./censusCall');

require('./showMap');

require('papaparse');

notFoundCnt = 0,
notRuralCnt = 0,
ruralCnt = 0,
totalCnt = 0;
dupCnt = 0;

var ruralChecker = require('./rural');
var render = require('./render');

window.callback = function(data) {
  // save the query address
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
    $.getJSON('data/fips.json', function(fips) {
      var rural = false;
      rural = ruralChecker.isRural(fips, fipsCode, urbanAreas, urbanClusters);

      // if rural is still false
      if (rural === false) {
        notRuralCnt ++;
        totalCnt ++;

        render.renderTableRow('notRural', input, matchedAddress, x, y, county, block);

        render.renderCount('notRural', notRuralCnt, totalCnt);
      } else {
        ruralCnt ++;
        totalCnt ++;

        render.renderTableRow('rural', input, matchedAddress, x, y, county, block);

        render.renderCount('rural', ruralCnt, totalCnt);
      }
    });
  }
}

// on submit
$('#geocode').submit(function(e) {
  census.getRuralUrban($('#address').val());
  return false;
});

// on keypress of enter
$('#address').keypress(function(e) {
  if (e.which == 13) {
    census.getRuralUrban($('#address').val());
    return false;
  }
});

var dups = [];
// on upload
$('#file').change(function(e) {
  render.resetHTML();
  render.showResults();

  notFoundCnt = 0;
  notRuralCnt = 0;
  ruralCnt = 0;
  dupCnt = 0;
  totalCnt = 0;

  // parse the csv
  $('#file').parse( {
    config: {
      header: true,
      step: function(results, parser) {
        address = results.data[0]['Street Address'] + ', ' + results.data[0].City + ', ' + results.data[0].State + ' ' + results.data[0].Zip;
        if (dups.indexOf(address) !== -1) {
          console.log('dup');
          console.log(address);
          dupCnt ++;
          totalCnt ++;
          render.renderCount('dup', dupCnt, totalCnt);
          render.renderTableRow('dup', address);
        } else {
          census.getRuralUrban(address);
        }
        dups.push(address);
      },
      complete: function(results, file) {
        console.log('Complete!');
      }
    }, 
    complete: function() {
      console.log('All files done!');
    }
  });
  return false;
});

$('#link-about').click(function(e) {
  e.preventDefault();
  render.showAbout();
});