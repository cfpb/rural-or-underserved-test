var content = require('../src/js/contentControl');

describe('controlling content', function() {
  jasmine.getFixtures().fixturesPath = 'test/fixtures';

  beforeEach(function(){
    loadFixtures('aboutAndResults.html');
  });

  it('show and hide results and about', function() {
    content.showResults();
    expect($('#results')).not.toHaveClass('hide');
    expect($('#about')).toHaveClass('hide');
    expect($('#rural')).toHaveClass('hide');
    expect($('#notRural')).toHaveClass('hide');
    expect($('#notFound')).toHaveClass('hide');
    expect($('#duplicate')).toHaveClass('hide');

    content.showAbout();
    expect($('#about')).not.toHaveClass('hide');
    expect($('#results')).toHaveClass('hide');
    expect($('#rural')).toHaveClass('hide');
    expect($('#notRural')).toHaveClass('hide');
    expect($('#notFound')).toHaveClass('hide');
    expect($('#duplicate')).toHaveClass('hide');
  });

  it('reset all tbody to empty string', function() {
    content.resetHTML();
    expect($('tbody')).toBeEmpty();
  });

  it('sets up everything for results', function() {
    content.setup();
    expect($('.chosenYear')).toContainText('2015');
    expect($('.chosenYear1')).toContainText('2016');
    expect($('.chosenYear2')).toContainText('2017');

    expect($('#fileError')).toHaveClass('hide');
    expect($('#errorMessage')).toHaveClass('hide');

    expect($('tbody')).toBeEmpty();

    expect($('#results')).not.toHaveClass('hide');
    expect($('#about')).toHaveClass('hide');
  });


});
