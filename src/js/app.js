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
rowCnt = 0;

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

var inputCnt = 1;
$('#add-another').click(function(e) {
  e.preventDefault();

  if ($('#address' + inputCnt).val() === '') {
    $('#address' + inputCnt).addClass('error');
  } else {
    $('#address' + inputCnt).removeClass('error');
  }

  inputCnt ++;

  if (inputCnt === 10) {
    $('#add-another').remove();
  }
  // clone and add input
  $( "#address1" ).clone(true)
    .appendTo( ".input-container" )
    .attr('id', 'address' + inputCnt)
    .val('')
    .focus();
});

var dups = [];
// on submit
$('#geocode').submit(function(e) {
  resets();

  // reset file field
  $('#file').val('');

  $('.input-address').each(function(index) {
    rowCnt ++;
  });

  $('#rowCnt').text(rowCnt);

  $('.input-address').each(function(index) {
    if ($(this).val() === '') {
      return;
    }
    if (dups.indexOf($(this).val()) !== -1) {
      dupCnt ++;
      totalCnt ++;
      render.renderCount('dup', dupCnt, totalCnt);
      render.renderTableRow('dup', $(this).val());
      $(this).addClass('warning');
    } else {
      $(this).removeClass('warning error');
      census.getRuralUrban($(this).val());
    }
    dups.push($(this).val());
  });

  return false;
});

$('#file').change(function(e) {
  inputCnt = 1;

  $('.input-address').each(function(index) {
    if ($(this).attr('id') !== 'address1') {
      $(this).remove();
    } else {
      $(this).val('')
              .removeClass('error');
    }
  });
});

// on upload
$('#geocode-csv').submit(function(e) {
  resets();

  inputCnt = 1;

  // clear remove inputs, except the first one
  $('.input-address').each(function(index) {
    if ($(this).attr('id') !== 'address1') {
      $(this).remove();
    } else {
      $(this).val('')
              .removeClass('error');
    }
  });

  // parse the csv to get the count
  $('#file').parse( {
    config: {
      header: true,
      step: function(results, parser) {
        rowCnt ++;
      },
      complete: function(results, file) {
        $('#rowCnt').text(rowCnt);
      }
    }, 
    complete: function() {
      console.log('All files done!');
    }
  });

  // parse the csv to query API
  $('#file').parse( {
    config: {
      header: true,
      step: function(results, parser) {
        // check for blank row
        if (results.data[0]['Street Address'] === '' && results.errors) {
          return;
        }
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
  // clear remove inputs, except the first one
  $('.input-address').each(function(index) {
    if ($(this).attr('id') !== 'address1') {
      $(this).remove();
    } else {
      $(this).val('');
    }
  });
  $('#file').val('');

  render.showAbout();
});

function resets() {
  render.resetHTML();
  render.showResults();

  notFoundCnt = 0;
  notRuralCnt = 0;
  ruralCnt = 0;
  dupCnt = 0;
  totalCnt = 0;
  rowCnt = 0;
  dups = [];
}

$('.input-address').blur(function(e) {
  if ($(this).val() === '') {
    $(this).addClass('error');
  } else {
    $(this).removeClass('error');
  }
});