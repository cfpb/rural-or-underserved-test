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
      var noun = 'addresses';
      var verb = 'are';

      // add one to correct type
      var typeCount = parseInt($('a.' + type + 'Cnt').text(), 10);
      typeCount++;
      $('.' + type + 'Cnt').text(typeCount);

      if(typeCount === 1) {
        noun = 'address';
        verb = 'is'
      }

      $('.' + type + 'Verb').text(verb);

      $('.' + type + 'Case').text(noun + ' ' + verb);

      // add one to the total
      var totalCount = parseInt($('#totalCnt').text(), 10);
      totalCount++;
      $('#totalCnt').text(totalCount);
    }

    return counters;
}();
