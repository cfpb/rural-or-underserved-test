module.exports = function(result) {
  var container = document.getElementById(result.type);
  var tableBody = document.getElementById(result.type).getElementsByTagName('tbody')[0];
  var mapID = Date.now();

  var rowHTML = '<tr><td>' + result.input + '</td>'
    + '<td>' + result.address + '</td>'
    + '<td>' + result.countyName + '</td>'
    + '<td>' + result.block + '</td>'
    + '<td>' + result.rural;

  // add the map link if needed
  if(result.rural != '-') {
    rowHTML = rowHTML
      + ' <a href="#" class="no-decoration hide-print jsLoadMap right" data-map="false" data-lat="' + result.x + '" data-lon="' + result.y + '" data-id="loc-' + mapID + '">'
      + 'Show map <span class="cf-icon cf-icon-plus-round"></span></a>';
  }

  rowHTML = rowHTML
    + '</td></tr>'
    + '<tr class="hide"><td colspan="5">'
    + '<div class="map" id="loc-' + mapID + '"></div>'
    + '</td></tr>';

  container.classList.remove('hide');
  tableBody.insertAdjacentHTML('beforeend', rowHTML);
}
