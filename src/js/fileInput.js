var DT = require( './dom-tools' );

module.exports = function() {
  var fileInput = {};
  var uploadName = '';

  fileInput.resetFileName = function() {
    DT.getEl( '#fileName' ).value = 'No file chosen';
  }

  fileInput.setFileName = function( fileName ) {
    DT.getEl( '#fileName' ).value = fileName;
  }

  fileInput.resetError = function() {
    DT.addClass( '#fileError', 'hide' );
    DT.addClass( '#processError', 'hide' );
    DT.changeElHTML( '.js-error-message', '' );
  }

  fileInput.setError = function( message, type ) {
    DT.changeElHTML( '#fileErrorDesc', message );
    DT.removeClass( '#fileError', 'hide', 'warn', 'error' );
    DT.addClass( '#fileError', type );
  }

  fileInput.getUploadName = function( fileName ) {
    var uploadName = fileName;
    if ( uploadName.indexOf( '\\' ) > -1) {
      uploadNameParts = uploadName.split( '\\' );
      uploadName = uploadNameParts[uploadNameParts.length - 1];
    }

    return uploadName;
  }

  fileInput.isCSV = function( fileName ) {
    return fileName.substr( fileName.lastIndexOf( '.' ) + 1 ) === 'csv';
  }

  return fileInput;
}();
