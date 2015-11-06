require('mapbox.js');

L.mapbox.accessToken = 'pk.eyJ1IjoiY29tcHV0ZWNoIiwiYSI6InMyblMya3cifQ.P8yppesHki5qMyxTc2CNLg';

// when a.jsLoadMap is clicked
$('body').on('click', 'a.jsLoadMap', function(e) {
  e.preventDefault();

  // setup vars (data attributes)
  var lat = $(this).data('lat');
  var lon = $(this).data('lon');
  var id = $(this).data('id');
  var mapShown = $(this).data('map');

  // if the map row is hidden
  if ($(this).parents('tr').next().hasClass('hide')) {
    // show it
    $(this).parents('tr').next().removeClass('hide');
    // remove border to better associate map with row
    $(this).parents('tr').children('td').addClass('no-border');
    // change text
    $(this).html('Hide map <span class="cf-icon cf-icon-minus-round"></span>');

    // only show initiate the map the first time
    if (mapShown === false) {
      // set the map to true (won't try to initate again)
      $(this).data('map', 'true');

      // setup and app map
      var latlng = L.latLng(lon, lat);
      map = L.mapbox.map(id, 'cfpb.k55b27gd', { center: latlng }).setView(latlng,12);
      map.dragging.disable();
      map.touchZoom.disable();
      map.doubleClickZoom.disable();
      map.scrollWheelZoom.disable();
      if (map.tap) map.tap.disable();

      // add marker
      var marker = L.marker(latlng).addTo(map);
    }
  } else {  // map is being displayed
    // hide it
    $(this).parents('tr').next().addClass('hide');
    // add border back
    $(this).parents('tr').children('td').removeClass('no-border');
    // change text
    $(this).html('Show map <span class="cf-icon cf-icon-plus-round"></span>');
  }
});
