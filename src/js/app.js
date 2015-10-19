var $ = require('jquery');
var content = require('./contentControl');
var address = require('./addresses');
var count = require('./count');
var textInput = require('./textInputs');
var fileInput = require('./fileInput');
require('./showMap');
require('papaparse');
require('./misc');

window.censusAPI = {};

censusAPI.callback = function(data) {
    var input = data.result.input.address.address;

    // check if found in api
    var result = address.isFound(data.result);

    // if nothing found, render a not found
    if (result) {
        // render
        address.render(result);
        count.updateCount(result.type);
    } else { // api returned a match
        // check for rural or underserved
        address.isRural(data.result, $('#year').val());
    }
}

// on submit
$('#geocode').submit(function(e) {

    content.setup();

    document.location.hash = 'results';

    var addresses = [];

    $('.input-address').each(function(index) {
        if ($(this).val() !== '') {
            addresses.push($(this).val());
        }
    });

    count.updateAddressCount(addresses.length);
    address.process(addresses);

    return false;
});

// when file upload is used
$('#file').change(function(e) {

    var addresses = [];

    // clear text inputs
    textInput.clear();

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
                    fileInput.error('There are no rows in this csv. Please update and try again.');
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
                    rowCount ++;
                }
            },
            complete: function(results, file) {
                $('#rowCount').text(rowCount);
            }
        },
        complete: function() {
            if (rowCount === 0) {
                content.error('The csv was empty.');
            } else {
                if (rowCount > 250) {
                  var leftOver = rowCount - 250;
                  content.error('You entered ' + rowCount + ' addresses for ' + $('#year').val() + ' safe harbor designation. We have a limit of 250 addresses. Please recheck the remaining ' + leftOver + '.');
                }
                $('#file').parse( {
                    config: {
                        header: true,
                        step: function(results, parser) {
                            if (results.data[0]['Street Address'] === '' && results.errors) {
                                return;
                            } else {
                                if (processedCount < 250) {
                                    addresses.push(results.data[0]['Street Address'] + ', ' + results.data[0].City + ', ' + results.data[0].State + ' ' + results.data[0].Zip);
                                    processedCount ++;
                                }
                            }
                        },
                        complete: function(results, file) {
                            count.updateAddressCount(addresses.length);
                            address.process(addresses);
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