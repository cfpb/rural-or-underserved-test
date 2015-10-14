var $ = require('jquery');

module.exports = function() {
    var counters = {};

    counters.reset = function() {
        $('.counter').html('0');
    }

    counters.updateAddressCount = function(number) {
        $('#addressCount').text(number);
    }

    counters.updateCount = function() {
        var thisTable = table.getTable();
        if (thisTable === 'notFound') {
            count = this.notFound;
        }
        if (thisTable === 'rural') {
            count = this.rural;
        }
        if (thisTable === 'notRural') {
            count = this.notRural;
        }
        if (thisTable === 'duplicate') {
            count = this.duplicate;
        }

        $('.' + thisTable + 'Cnt').html(count);
        $('#totalCnt').html(this.total);
    }

    return counters;
}();