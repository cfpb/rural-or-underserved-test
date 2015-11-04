var $ = require('jquery');

var error = $('#fileError');
var errorDesc = $('#fileErrorDesc');

module.exports = function() {
    var fileInput = {};

    fileInput.clear = function() {
        $('#file').val('');
    }

    fileInput.error = function(message) {
        errorDesc.html(message);
        error.removeClass('hide');
    }

    return fileInput;

}();
