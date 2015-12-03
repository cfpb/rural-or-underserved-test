module.exports = function(year) {
  return $.get('data/' + year + '.json');
};
