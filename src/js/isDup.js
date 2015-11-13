var duplicates = [];

module.exports = function(address) {
  if (duplicates.indexOf(address) !== -1) {
      return true;
  } else {
      duplicates.push(address);
      return false;
  }
};
