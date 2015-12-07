fileInput = require('../src/js/fileInput');

describe('file input', function() {
  jasmine.getFixtures().fixturesPath = 'test/fixtures';
  var filename;
  var error;
  beforeEach(function(){
    loadFixtures('fileInput.html');
  });

  it('should return the filename', function() {
    filename = 'C:\\FakePath\\filename.csv';
    expect(fileInput.getUploadName(filename)).toBe('filename.csv');
    filename = 'test.csv';
    expect(fileInput.getUploadName(filename)).toBe('test.csv');
  });

  it('should set the filename', function() {
    filename = 'test.csv';
    fileInput.setFileName(filename);
    expect($('#fileName')).toHaveValue('test.csv');
  });

  it('should REset the filename', function() {
    fileInput.resetFileName();
    expect($('#fileName')).toHaveValue('No file chosen');
  });

  it('should set the file error', function() {
    error = 'This is an error';
    fileInput.setError(error);
    expect($('#fileErrorDesc')).toContainText('This is an error');
    expect($('#fileError')).not.toHaveClass('hide');
  });

  it('should REset the file error', function() {
    fileInput.resetError();
    expect($('#fileErrorDesc')).toContainText('');
    expect($('#fileError')).toHaveClass('hide');
  });

  it('should be a csv', function() {
    filename = 'test.csv';
    expect(fileInput.isCSV(filename)).toBeTruthy();
    filename = 'test.txt';
    expect(fileInput.isCSV(filename)).toBeFalsy();
  });
});
