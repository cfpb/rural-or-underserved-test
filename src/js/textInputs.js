var $ = require('jquery');

module.exports = function() {
    var textInputs = {};

    textInputs.count = 1;

    textInputs.reset = function() {
      textInputs.count = 1;

      $('.input-address').each(function(index) {
          if ($(this).attr('id') !== 'address1') {
              $(this).remove();
          } else {
              $(this).val('').removeClass('error');
          }
      });

      $('#add-another').removeClass('hide');
    }

    textInputs.add = function() {
      textInputs.count++;

      if (textInputs.count === 10) {
        $('#add-another').addClass('hide');
      }

      var previous = textInputs.count - 1;

      if ($('#address' + previous).val() === '') {
          $('#address' + previous).addClass('error');
      } else {
          $('#address' + previous).removeClass('error');
      }

      $('#address1').clone(true)
        .appendTo('.input-container')
        .attr('id', 'address' + textInputs.count)
        .val('')
        .focus();
    }

    textInputs.toggleError = function(e) {
      if ($(e.target).val() === '') {
          $(e.target).addClass('error');
      } else {
          $(e.target).removeClass('error');
      }
    }

    return textInputs;

}();
