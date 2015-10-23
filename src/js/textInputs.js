var $ = require('jquery');

module.exports = function() {
    var textInputs = {};

    textInputs.count = 1;

    textInputs.error = function(message) {
        error.html(message);
        error.removeClass('hide');
    }

    textInputs.isEmpty = function(input) {
        if (input.val() === '') {
            input.addClass('error');
        } else {
            input.removeClass('error warning');
        }
    }

    textInputs.clear = function() {
        $('.input-address').each(function(index) {
            if ($(this).attr('id') !== 'address1') {
                $(this).remove();
            } else {
                $(this).val('')
                .removeClass('error');
            }
        });

        $('#add-another').removeClass('hide');

        textInputs.count = 1;
    }

    textInputs.add = function() {
        textInputs.count ++;

        // remove the link if we have 10 textInputs
        if (textInputs.count === 10) {
            $('#add-another').addClass('hide');
        }

        var previous = textInputs.count - 1;

        if ($('#address' + previous).val() === '') {
            $('#address' + previous).addClass('error');
        } else {
            $('#address' + previous).removeClass('error');
        }

        // clone and add input
        $('#address1').clone(true)
            .appendTo('.input-container')
            .attr('id', 'address' + textInputs.count)
            .val('')
            .focus();
    }

    return textInputs;

}();