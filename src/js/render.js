var results = $('#results'),
    r = $('#rural'),
    nR = $('#notRural'),
    nF = $('#notFound')
    about = $('#about');

module.exports = {

  showResults: function() {
    about.addClass('hide');
    results.removeClass('hide');
    r.addClass('hide');
    nR.addClass('hide');
    nF.addClass('hide');
  },

  showAbout: function() {
    about.removeClass('hide');
    results.addClass('hide');
    r.addClass('hide');
    nR.addClass('hide');
    nF.addClass('hide');
  },
  
  resetHTML: function() {
    // clear content each time
    //results.html('');
    $('#rural tbody').html('');
    $('#notRural tbody').html('');
    $('#notFound tbody').html('');
    // reset all counters
    $('.counter').html('0');
  },

  renderTableRow: function(table, input, matchedAddress, x, y, county, block) {
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
  },

  renderCount: function (table, count, total) {

    $('.' + table + 'Cnt').html(count);
    $('#totalCnt').html(total);
  }
};