var $ = require('jquery');

var error = $('#fileError');
var errorDesc = $('#fileErrorDesc');

module.exports = function() {
    var fileInput = {};

    fileInput.clear = function() {
        $('#fileName').val('');
    }

    fileInput.error = function(message) {
        errorDesc.html(message);
        error.removeClass('hide');
    }

    return fileInput;

}();
