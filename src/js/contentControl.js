var $ = require('jquery');
var count = require('./count');

var monthNames = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
];

module.exports = function() {

    function hideData() {
        // hide the data sections
        // these get shown as needed in addresses.js (render)
        $('#rural').addClass('hide');
        $('#notRural').addClass('hide');
        $('#duplicate').addClass('hide');
        $('#notFound').addClass('hide');
    }

    var content = {};

    content.setup = function() {
        // set year
        $('.chosenYear').text($('#year').val());
        $('.chosenYear1').text(Number($('#year').val()) + 1);
        $('.chosenYear2').text(Number($('#year').val()) + 2);
        // set report generated date
        var date = new Date();
        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();
        $('.report-date').text('Report generated ' + monthNames[monthIndex] + ' ' + day + ', ' + year);

        $('#fileError').addClass('hide');
        $('#errorMessage').addClass('hide');

        count.reset();
        this.resetHTML();
        this.showResults();
    }

    content.showResults = function() {
        // hide about
        $('#about').addClass('hide');

        hideData();

        // show the results
        $('#results').removeClass('hide');
    }

    content.showAbout = function() {
        // show about
        $('#about').removeClass('hide');

        // hide the results
        $('#results').addClass('hide');

        hideData();
    }

    content.resetHTML = function() {
        // clear the body of all the tables (data)
        $('tbody').html('');
    }

    content.error = function(message) {
        $('#errorMessage').html(message);
        $('#errorMessage').removeClass('hide');
    }

    return content;
}();
