module.exports = function(response) {
  var pass = false;
  var match = response.addressMatches;

  if (Array.isArray(match) && match.length !== 0) {
    pass = true;
  }
  return pass;
};
