var $ = require('jquery');

module.exports = function() {
    var fileInput = {};

    var uploadName = '';

    fileInput.resetFileName = function() {
      $('#fileName').val('No file chosen');
    }

    fileInput.setFileName = function(filename) {
      $('#fileName').val(filename);
    }

    fileInput.resetError = function() {
      $('#fileError').addClass('hide');
      $('#processError').addClass('hide');
      $('.js-error-message').html('');
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

    fileInput.isCSV = function(filename) {
      return filename.substr(filename.lastIndexOf('.')+1) === 'csv';
    }

    return fileInput;

}();
