var fullCountyList = require('../data/counties.json');

module.exports = function(fipsCode) {
  var countyName = '';

  for(i in fullCountyList.counties) {
    if(fullCountyList.counties[i][0] === fipsCode) {
      countyName = fullCountyList.counties[i][1]
                    .substring(fullCountyList.counties[i][1].indexOf(',')+1)
                    .replace('County', '')
                    .replace(/^\s+|\s+$/gm,'');
      break;
    } else {
      continue;
    }
  }

  return countyName;
};
