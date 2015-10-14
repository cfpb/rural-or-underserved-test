var $ = require('jquery');

var error = $('#fileError');

module.exports = function() {
    var fileInput = {};

    fileInput.clear = function () {
        $('#file').val('');
    }

    fileInput.error = function (message) {
        error.html(message);
        error.removeClass('hide');
    }

    return fileInput;

}();