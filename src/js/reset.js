module.exports = function () {
  var c = $('#content'),
      r = $('#rural'),
      nR = $('#notRural'),
      nF = $('#notFound');

  function hide() {
    r.addClass('hide');
    nR.addClass('hide');
    nF.addClass('hide');
  }

  function resetHTML() {
    // clear content each time
    c.html('');
    $('#rural tbody').html('');
    $('#notRural tbody').html('');
    $('#notFound tbody').html('');
    // reset all counters
    $('.counter').html('0');
  }

  return {
    hide: hide,
    resetHTML: resetHTML
  };
};