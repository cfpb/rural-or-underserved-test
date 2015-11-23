var $ = require('jquery');

module.exports = function() {
    var fileInput = {};

    var uploadName = '';

    fileInput.resetFileName = function() {
      $('#fileName').val('');
    }

    fileInput.setFileName = function(filename) {
      $('#fileName').val(filename);
    }

    fileInput.resetError = function() {
      $('#fileErrorDesc').html('');
      $('#fileError').addClass('hide');
    }

    fileInput.setError = function(message) {
        $('#fileErrorDesc').html(message);
        $('#fileError').removeClass('hide');
    }

    fileInput.getUploadName = function(filename) {
      var uploadName = filename;
      if (uploadName.indexOf('\\') > -1) {
        uploadNameParts = uploadName.split('\\');
        uploadName = uploadNameParts[uploadNameParts.length - 1];
      }

      return uploadName;
    }

    return fileInput;

}();
