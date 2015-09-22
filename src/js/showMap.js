$('body').on('click', 'a.jsLoadMap', function(e) {
  e.preventDefault();

  var id = $(this).data('id');

  // check if id already exists
  if ($('#loc-' + id).length) {
    // remove the map and container
    $('#loc-' + id).remove();
  } else {
    // get the lat/lon
    var lat = $(this).data('lat');
    var lon = $(this).data('lon');
    
    // append the map container
    $(this).parent().append('<div class="map" id="loc-' + id + '"></div>');

    // create the map and add marker
    var latlng = L.latLng(lon, lat);
    map = L.mapbox.map('loc-' + id, 'cfpb.k55b27gd', { center: latlng }).setView(latlng,15);
    var marker = L.marker(latlng).addTo(map);
  }
});