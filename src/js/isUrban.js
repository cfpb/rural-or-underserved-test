module.exports = function(urbanClusters, urbanAreas) {
  if ((urbanClusters === null || urbanClusters.length === 0) && (urbanAreas === null || urbanAreas.length === 0)) {
    return true;
  } else {
    return false;
  }
};
