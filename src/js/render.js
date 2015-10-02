var results = $('#results'),
    r = $('#rural'),
    nR = $('#notRural'),
    nF = $('#notFound'),
    dup = $('#dup'),
    about = $('#about'),
    error = $('#errorMessage');

module.exports = {

  showResults: function() {
    about.addClass('hide');
    results.removeClass('hide');
    r.addClass('hide');
    nR.addClass('hide');
    nF.addClass('hide');
    dup.addClass('hide');
  },

  showAbout: function() {
    about.removeClass('hide');
    results.addClass('hide');
    r.addClass('hide');
    nR.addClass('hide');
    nF.addClass('hide');
    dup.addClass('hide');
  },
  
  resetHTML: function() {
    // clear content each time
    $('#rural tbody').html('');
    $('#notRural tbody').html('');
    $('#notFound tbody').html('');
    $('#dup tbody').html('');
    // reset all counters
    $('.counter').html('0');
    error.html('');
    error.addClass('hide');
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
    } else if (table === 'dup') {
      htmlString = '<tr><td>' + input + '</td>'
        + '<td>Duplicate</td>'
        + '<td>-</td>'
        + '<td>-</td>'
        + '<td>-</td></tr>'
    } else {
      var mapID = Date.now();
      htmlString = '<tr><td>' + input + '</td>'
          + '<td>' + matchedAddress + '</td>'
          + '<td>' + county + '</td>'
          + '<td>' + block + '</td>'
          + '<td>' + ruralOrNot + ' <a href="#" class="jsLoadMap right" data-map="false" data-lat="' + x + '" data-lon="' + y + '" data-id="loc-' + mapID + '">Show map</a></td></tr>'
          + '<tr class="hide"><td colspan="5"><div class="map" id="loc-' + mapID + '"></div></td></tr>';
    }

    // add to table
    $('#' + table + ' tbody').append(htmlString);
  },

  renderCount: function (table, count, total) {

    $('.' + table + 'Cnt').html(count);
    $('#totalCnt').html(total);
  },

  renderError: function (message) {
    error.html(message);
    error.removeClass('hide');
  },

  removeInput: function (input) {
    input.remove();
  },

  clearFileInput: function () {
    $('#file').val('');
  },

  clearTextInputs: function () {
    $('.input-address').each(function(index) {
      if ($(this).attr('id') !== 'address1') {
        $(this).remove();
      } else {
        $(this).val('')
          .removeClass('error');
      }
    });
  }
};