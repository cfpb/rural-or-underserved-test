var $ = require('jquery');
var count = require('./count');

var results = $('#results'),
    r = $('#rural'),
    nR = $('#notRural'),
    nF = $('#notFound'),
    dup = $('#duplicate'),
    about = $('#about'),
    error = $('#errorMessage');

var monthNames = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
];

module.exports = function() {

    function hideData() {
        // hide the data sections
        // these get shown as needed in addresses.js (render)
        r.addClass('hide');
        nR.addClass('hide');
        nF.addClass('hide');
        dup.addClass('hide');
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

        count.reset();
        this.resetHTML();
        this.showResults();
    }

    content.showResults = function() {
        // hide about
        about.addClass('hide');

        hideData();

        // show the results
        results.removeClass('hide');
    }

    content.showAbout = function() {
        // show about
        about.removeClass('hide');

        // hide the results
        results.addClass('hide');

        hideData();
    }

    content.resetHTML = function() {
        // clear the body of all the tables (data)
        $('tbody').html('');
    }

    content.error = function(message) {
        error.html(message);
        error.removeClass('hide');
    }

    return content;
}();
