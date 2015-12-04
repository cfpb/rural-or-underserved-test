inputs = require('../src/js/textInputs');

describe('text input', function() {
  jasmine.getFixtures().fixturesPath = 'test/fixtures';
  var e = {};
  beforeEach(function(){
    loadFixtures('textInput.html');
  });

  it('should add another input and remove #add-another after 10', function() {
    expect($('#address1')[0]).toBeInDOM();
    inputs.add();
    expect($('#address2')[0]).toBeInDOM();
    inputs.add();
    expect($('#address3')[0]).toBeInDOM();
    inputs.add();
    expect($('#address4')[0]).toBeInDOM();
    inputs.add();
    expect($('#address5')[0]).toBeInDOM();
    inputs.add();
    expect($('#address6')[0]).toBeInDOM();
    inputs.add();
    expect($('#address7')[0]).toBeInDOM();
    inputs.add();
    expect($('#address8')[0]).toBeInDOM();
    inputs.add();
    expect($('#address9')[0]).toBeInDOM();
    inputs.add();
    expect($('#address10')[0]).toBeInDOM();
    expect($('#add-another')).toHaveClass('hide');
  });

  it('should remove all but 1', function() {
    inputs.reset();
    expect($('#address1')[0]).toBeInDOM();
    expect($('#address2')[0]).not.toBeInDOM();
    expect($('#add-another')).not.toHaveClass('hide');
    expect($('#address1')[0]).not.toHaveClass('error');
  });

  it('should have error', function() {
    e.target = $('#address1');
    inputs.toggleError(e);
    expect($('#address1')[0]).toBeInDOM();
    expect($('#address1')[0]).toHaveClass('error');
  });

  it('should not have error', function() {
    e.target = $('#address1');
    $('#address1').val('something');
    inputs.toggleError(e);
    expect($('#address1')[0]).toBeInDOM();
    expect($('#address1')[0]).not.toHaveClass('error');
  });
});
