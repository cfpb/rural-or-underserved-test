require( 'mapbox.js' );

var DT = require( './dom-tools' );

L.mapbox.accessToken =
  'pk.eyJ1IjoiY2ZwYiIsImEiOiJodmtiSk5zIn0.VkCynzmVYcLBxbyHzlvaQw';

// when a.jsLoadMap is clicked
DT.bindEvents( '#results', 'click', function( e ) {
  var target = e.target;
  var toggleMapLink = target;
  if(DT.hasClass( target.parentNode, 'jsLoadMap' )) toggleMapLink = target.parentNode;

  if ( DT.hasClass( toggleMapLink, 'jsLoadMap' ) ) {

    e.preventDefault();

    // setup vars (data attributes)
    var lat = DT.getElData( toggleMapLink, 'lat' );
    var lon = DT.getElData( toggleMapLink, 'lon' );
    var id = DT.getElData( toggleMapLink, 'id' );
    var isMapShown = DT.getElData( toggleMapLink, 'map' ) === 'true';

    var parentMapRow = DT.getParentEls( toggleMapLink, 'tr' )[0];
    var mapTDs = DT.getChildEls( parentMapRow, 'td' );
    var mapRow = DT.getNextEls( parentMapRow, 'tr' )[0];
    var hasHideClass = DT.hasClass( mapRow, 'hide' );

    // if the map row is hidden
    if ( hasHideClass ) {

      // show it
      DT.removeClass( mapRow, 'hide' );

      // remove border to better associate map with row
      DT.addClass( mapTDs, 'no-border' );

      // change text
      DT.changeElHTML(
        toggleMapLink,
        'Hide map <span class="cf-icon cf-icon-minus-round"></span>'
      );

      // only show initiate the map the first time
      if ( isMapShown === false ) {

        // set the map to true (won't try to initate again)
        toggleMapLink.setAttribute( 'data-map', true );

        DT.nextFrame( function() {
          var latlng = L.latLng( lon, lat );
          map = L.mapbox.map( id, 'cfpb.k55b27gd', { center: latlng } )
          .setView( latlng, 12 );
          map.dragging.disable();
          map.touchZoom.disable();
          map.doubleClickZoom.disable();
          map.scrollWheelZoom.disable();
          if ( map.tap ) map.tap.disable();

          // add marker
          var marker = L.marker( latlng ).addTo( map );
        } );
      }
    } else {  // map is being displayed

      // hide it
      DT.addClass( mapRow, 'hide' );

      // add border back
      DT.removeClass( mapTDs, 'no-border' );

      // change text
      DT.changeElHTML(
        toggleMapLink,
        'Show map <span class="cf-icon cf-icon-plus-round"></span>'
      );
    }
  }
});
