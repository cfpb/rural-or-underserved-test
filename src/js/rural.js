module.exports = function () {
  function fipsCheck(fips, fipsCode) {
    $.each(fips.fips, function(key, val) {
      // if result is in fips its rural
      // stop, no need to continue
      if (val[0] === fipsCode) {
        return true;
      } else {
        return false;
      }
    });
  }

  return {
    fipsCheck: fipsCheck
  };
};