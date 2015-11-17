module.exports = function(fips, counties) {
  console.log('isInCounty');
  var pass = false;

  for (i in counties.fips) {
    if(fips === counties.fips[i][0]) {
      pass = true;
      break;
    } else {
      continue;
    }
  }

  return pass;
};
