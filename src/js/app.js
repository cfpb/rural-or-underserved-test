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
        result = address.isRural(data.result, '2016');
        // render
        address.render(result);
        count.updateCount(result.type);
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

    document.location.hash = 'results';

    // clear remove inputs, except the first one
     textInput.clear();

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
                count.updateAddressCount(addresses.length);
                address.process(addresses);
            }
        }, 
        complete: function() {
            console.log('All files done!');
        }
    });

    return false;
});