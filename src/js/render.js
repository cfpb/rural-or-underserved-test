var $ = require('jquery');

var results = $('#results'),
    r = $('#rural'),
    nR = $('#notRural'),
    nF = $('#notFound'),
    dup = $('#dup'),
    about = $('#about');

module.exports = function() {

    function hideData() {
        // hide the data sections
        // these get shown as needed in addresses.js (render)
        r.addClass('hide');
        nR.addClass('hide');
        nF.addClass('hide');
        dup.addClass('hide');
    }

    var render = {};

    render.showResults = function() {
        // hide about
        about.addClass('hide');

        hideData();

        // show the results
        results.removeClass('hide');
    }

    render.showAbout = function() {
        // show about
        about.removeClass('hide');

        // hide the results
        results.addClass('hide');
        
        hideData();
    }

    render.resetHTML = function() {
        // clear the body of all the tables (data)
        $('tbody').html('');
    }

    return render;
}();