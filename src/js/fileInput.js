var $ = require('jquery');

module.exports = function() {
    var fileInput = {};

    fileInput.clear = function() {
        $('#fileName').val('');
    }

    fileInput.error = function(message) {
        $('#fileErrorDesc').html(message);
        $('#fileError').removeClass('hide');
    }

    return fileInput;

}();
