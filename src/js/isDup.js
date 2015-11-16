module.exports = function(address, duplicates) {
  var pass = false;

  if (typeof address === 'string' && Array.isArray(duplicates) && duplicates.indexOf(address) !== -1) {
    pass = true;
  }

  return pass;
};
