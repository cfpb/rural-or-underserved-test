module.exports = function(response) {
  if (response.addressMatches.length !== 0) {
      return true;
  } else {
      return false;
  }
};
