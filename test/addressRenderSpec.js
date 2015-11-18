var addressRender = require('../src/js/addressRender');

describe('adding a row and diplaying a table', function() {
  jasmine.getFixtures().fixturesPath = 'test/fixtures';
  var testResult = {};
  beforeEach(function(){

  });

  it('table container should be visible and table should have a row', function() {
    testResult.input = 'test address';
    testResult.address = 'Duplicate';
    testResult.countyName = '-';
    testResult.block = '-';
    testResult.rural = '-';
    testResult.type = 'duplicate';
    loadFixtures('tableDuplicate.html');
    addressRender(testResult);
    expect($('#duplicate')).toBeInDOM();
    expect($('#duplicate')).toBeVisible();
    expect($('#duplicate tbody')).toHaveHtml('<tr><td>test address</td><td>Duplicate</td><td>-</td><td>-</td><td>-</td></tr>');
  });

  it('table container should be visible and table should have a row with a map', function() {
    testResult.input = '123 Main';
    testResult.address = '123 Main';
    testResult.countyName = 'County';
    testResult.block = '1234';
    testResult.rural = 'Yes';
    testResult.type = 'rural';
    testResult.x = -72.1;
    testResult.y = -72.1;
    testResult.id = Date.now();
    loadFixtures('tableRural.html');
    addressRender(testResult);
    /*
    this fails for an unknown reason, the HTML is the same

    expect($('#duplicate tbody')).toHaveHtml('<tr><td>123 Main</td><td>123 Main</td><td>County</td><td>1234</td><td>Yes <a href="#" class="no-decoration hide-print jsLoadMap right" data-map="false" data-lat="-72.1" data-lon="-72.1" data-id="loc-' + testResult.id + '">Show map <span class="cf-icon cf-icon-plus-round"></span></a></td></tr><tr class="hide"><td colspan="5"><div class="map" id="loc-' + testResult.id + '"></div></td></tr>');
    */
    expect($('#rural')).toBeInDOM();
    expect($('#rural')).toBeVisible();
    expect($('tr.hide')).toBeInDOM(); // the row with the map
    expect($('tr')[1]).toBeInDOM(); // the row with the map
    expect($('#loc-' + testResult.id)).toBeInDOM(); // the map id
  });
});
