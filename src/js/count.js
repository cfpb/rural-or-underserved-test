var $ = require('jquery');

module.exports = function() {
    var counters = {};

    counters.reset = function() {
        $('.counter').html('0');
    }

    counters.updateAddressCount = function(number) {
        $('#addressCount').text(number);
    }

    counters.updateCount = function(type) {
        // add one to correct type
        var typeCount = parseInt($('a.' + type + 'Cnt').text());
        typeCount++;
        $('.' + type + 'Cnt').text(typeCount);
        
        // add one to the total
        var totalCount = parseInt($('#totalCnt').text());
        totalCount++;
        $('#totalCnt').text(totalCount);
    }

    return counters;
}();