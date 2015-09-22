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

  function addToTable(table, input, matchedAddress, x, y, county, block) {
    var htmlString = '';
    var ruralOrNot = '';

    if (table === 'notRural') {
      ruralOrNot = 'No';
    }

    if (table === 'rural') {
      ruralOrNot = 'Yes';
    }
    // show
    $('#' + table).removeClass('hide');

    // create html
    if (table === 'notFound') {
      htmlString = '<tr><td>' + input + '</td>'
        + '<td>Address not identfied</td>'
        + '<td>-</td>'
        + '<td>-</td>'
        + '<td>-</td></tr>'
    } else {
      htmlString = '<tr><td>' + input + '</td>'
          + '<td><a href="#" class="jsLoadMap" data-lat="' + x + '" data-lon="' + y + '" data-id="loc-' + Date.now() + '">' + matchedAddress + '</a></td>'
          + '<td>' + county + '</td>'
          + '<td>' + block + '</td>'
          + '<td>' + ruralOrNot + '</td></tr>';
    }

    // add to table
    $('#' + table + ' tbody').append(htmlString);
  }

  function addToCount (table, count, total) {
    $('.' + table + 'Cnt').html(count);
    $('#totalCnt').html(total);
  }

  return {
    hide: hide,
    resetHTML: resetHTML,
    addToTable: addToTable,
    addToCount: addToCount
  };
};