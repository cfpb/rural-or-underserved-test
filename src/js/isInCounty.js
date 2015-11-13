module.exports = function(fips, year, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', encodeURI('data/' + year + '.json'));
  xhr.onload = function() {
    if (xhr.status === 200) {
      var counties = JSON.parse(xhr.responseText);
      var inCounty = false;
      for (i in counties.fips) {
        if(fips === counties.fips[i][0]) {
          inCounty = true;
          break;
        } else {
          continue;
        }
      }
      cb(inCounty);
    }
    else {
      cb(xhr.status);
    }
  };
  xhr.send();
};
