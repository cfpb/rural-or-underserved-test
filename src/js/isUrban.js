module.exports = function(urbanClusters, urbanAreas) {
  var pass = false;

  if ((urbanClusters === null || urbanClusters.length === 0) && (urbanAreas === null || urbanAreas.length === 0)) {
    pass = true;
  }

  return pass;
};
