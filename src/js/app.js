var $ = require('jquery');
var render = require('./render');
var census = require('./censusCall');
var ruralChecker = require('./rural');

/* new stuff */
var address = require('./addresses');

require('./showMap');
require('papaparse');
require('./misc');

var notFoundCnt = 0,
    notRuralCnt = 0,
    ruralCnt = 0,
    totalCnt = 0;
    dupCnt = 0;
    rowCnt = 0;
    processedCnt = 0,
    inputCnt = 1;

var dups = [];

var monthNames = [
  "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
];

window.censusAPI = {};

censusAPI.callback = function(data) {

    // save the query address
    //console.log (data);
    var input = data.result.input.address.address;

    var date = new Date();
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    $('.report-date').text('Report generated ' + monthNames[monthIndex] + ' ' + day + ', ' + year);

    //var result = {};

    //result.input = data.result.input.address.address;
  
    var result = address.isFound(data.result);
    // if nothing found, render a not found
    if (result) {
        // render
        address.render(result);
    } else {
        // check for rural or underserved
        result = address.isRural(data.result, '2016');
        address.render(result);
    }
}

// reset all the things
function resets() {
    // set year
    $('.chosenYear').text($('#year').val());
    $('#noRows').addClass('hide');

    render.resetHTML();
    render.showResults();
}

// add duplicates
function addDups(address) {
  // add to counts
  dupCnt ++;
  totalCnt ++;
  // render to counts and dups table
  render.renderCount('dup', dupCnt, totalCnt);
  render.renderTableRow('dup', address);
}

// on submit
$('#geocode').submit(function(e) {

    resets();

    document.location.hash = 'results';

    var addresses = [];
    
    $('.input-address').each(function(index) {
        if ($(this).val() !== '') {
            addresses.push($(this).val());
        }
    });

    address.process(addresses);

    return false;
});

/*// when file upload is used
$('#file').change(function(e) {
  rowCnt = 0;
  // clear text inputs
  render.clearTextInputs();

  $('#noRows').addClass('hide');

  // reset input count
  inputCnt = 1;

  // check for rows
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
        if (rowCnt === 0) {
          $('#noRows').removeClass('hide');
        }
      }
    }
  });
});*/

// on file submission
$('#geocode-csv').submit(function(e) {

    resets();

    document.location.hash = 'results';

    // clear remove inputs, except the first one
    //render.clearTextInputs();

    var addresses = [];

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
                address.process(addresses);
            }
        }, 
        complete: function() {
            console.log('All files done!');
        }
    });

    return false;
});