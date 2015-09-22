var ruralChecker = require('./rural');

window.callback = function(data) {
  // save the query address
  var input = data.result.input.address.address;
  
  // nothing found
  if (data.result.addressMatches.length === 0) {
    totalCnt ++;
    notFoundCnt ++;

    render.addToTable('notFound', input);

    render.addToCount('notFound', notFoundCnt, totalCnt);
  } else {
    // used to check rural
    var urbanClusters = data.result.addressMatches[0].geographies['Urban Clusters'];
    var urbanAreas = data.result.addressMatches[0].geographies['Urbanized Areas'];

    // used to render results
    var matchedAddress = data.result.addressMatches[0].matchedAddress;
    var x = data.result.addressMatches[0].coordinates.x;
    var y = data.result.addressMatches[0].coordinates.y;
    var county = data.result.addressMatches[0].geographies['Census Blocks'][0].COUNTY;
    var block = data.result.addressMatches[0].geographies['Census Blocks'][0].BLOCK;
    var state = data.result.addressMatches[0].geographies['Census Blocks'][0].STATE;

    // get fips from result (state and county)
    var fipsCode = state + county;

    // load fips (counties that are rural)
    // loop through fips looking for fips from data
    $.getJSON('data/fips.json', function(fips) {
      var rural = false;
      rural = ruralChecker(fips, fipsCode, urbanAreas, urbanClusters);

      // if rural is still false
      if (rural === false) {
        notRuralCnt ++;
        totalCnt ++;

        render.addToTable('notRural', input, matchedAddress, x, y, county, block);

        render.addToCount('notRural', notRuralCnt, totalCnt);
      } else {
        ruralCnt ++;
        totalCnt ++;

        render.addToTable('rural', input, matchedAddress, x, y, county, block);

        render.addToCount('rural', ruralCnt, totalCnt);
      }
    });
  }
}