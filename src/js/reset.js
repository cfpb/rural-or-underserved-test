module.exports = function () {
  var c = $('#content'),
      r = $('#rural'),
      nR = $('#notRural'),
      nF = $('#notFound');

  function hide() {
    console.log('hide');
    r.addClass('hide');
    nR.addClass('hide');
    nF.addClass('hide');
  }

  function resetHTML() {
    console.log('resetHTML');
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