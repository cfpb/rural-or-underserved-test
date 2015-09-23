var $ = require('jquery');
var render = require('./render');
var censusCall = require('./censusCall');

require('./showMap');

require('papaparse');

// on submit
$('#geocode').submit(function(e) {
  censusCall.getRuralUrban($('#address').val());
  return false;
});

// on keypress of enter
$('#address').keypress(function(e) {
  if (e.which == 13) {
    censusCall.getRuralUrban($('#address').val());
    return false;
  }
});

// on upload
$("#file").change(function(e) {
  render.hide();
  render.resetHTML();

  /*notFoundCnt = 0;
  notRuralCnt = 0;
  ruralCnt = 0;
  totalCnt = 0;*/

  // parse the csv
  $("#file").parse( {
    config: {
      header: false,
      step: function(results, parser) {
        censusCall.getRuralUrban(results.data[0][0]);
      },
      complete: function(results, file) {
        console.log("Complete!");
      }
    }, 
    complete: function() {
      console.log("All files done!");
    }
  });
  return false;
});