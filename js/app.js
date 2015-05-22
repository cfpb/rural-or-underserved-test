var $ = require('jquery');

$(function() {
    $('.show-hide').click(function() {
        if ($(this).parent('td').parent('tr').hasClass('no-border')) {
            $(this).parent('td').parent('tr').removeClass('no-border');
            $(this).parent('td').parent('tr').next().addClass('hide');
        } else {
            $(this).parent('td').parent('tr').addClass('no-border');
            $(this).parent('td').parent('tr').next().removeClass('hide');
        }
        return false;
    });
});