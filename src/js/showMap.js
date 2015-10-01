require('mapbox.js');

L.mapbox.accessToken = 'pk.eyJ1IjoiY29tcHV0ZWNoIiwiYSI6InMyblMya3cifQ.P8yppesHki5qMyxTc2CNLg';

$('body').on('click', 'a.jsLoadMap', function(e) {
  e.preventDefault();

  /*var id = $(this).data('id');

  // check if id already exists
  if ($('#loc-' + id).length) {
    // remove the map and container
    //$('#loc-' + id).remove();
    $(this).parents('tbody > tr').eq(rowIndex).remove();
  } else {
    // get the lat/lon
    var lat = $(this).data('lat');
    var lon = $(this).data('lon');
    
    //console.log($(this).parents('tr').index());
    var rowIndex = $(this).parents('tr').index();
    console.log(rowIndex);
    $(this).parents('tbody > tr').eq(rowIndex - 1).after('<tr><td colspan="5"><div class="map" id="loc-' + id + '"></div></td></tr>');
    // append the map container
    //$(this).parent().append('<div class="map" id="loc-' + id + '"></div>');

    // create the map and add marker
    var latlng = L.latLng(lon, lat);
    map = L.mapbox.map('loc-' + id, 'cfpb.k55b27gd', { center: latlng }).setView(latlng,15);
    var marker = L.marker(latlng).addTo(map);
  }*/

  var lat = $(this).data('lat');
  var lon = $(this).data('lon');
  var id = $(this).data('id');
  //var mapShown = $(this).data('map')

  if ($(this).parents('tr').next().hasClass('hide')) {
    $(this).parents('tr').next().removeClass('hide');
    $(this).text('Hide map');
    
    if ($(this).data('map') === false) {
      $(this).data('map', 'true');
      var latlng = L.latLng(lon, lat);

      map = L.mapbox.map(id, 'cfpb.k55b27gd', { center: latlng, zoomControl: false }).setView(latlng,10);

      map.dragging.disable();
      map.touchZoom.disable();
      map.doubleClickZoom.disable();
      map.scrollWheelZoom.disable();
      if (map.tap) map.tap.disable();
      
      var marker = L.marker(latlng).addTo(map);
    }
  } else {
    $(this).parents('tr').next().addClass('hide');
    $(this).text('Show map');
  }
});