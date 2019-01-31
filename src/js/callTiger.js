require( 'es6-promise' ).polyfill();
var jsonP = require( 'jsonp-p' ).default;


module.exports = function( x, y, layer ) {
  var url = 'https://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/tigerWMS_Current/MapServer/'
    + layer
    + '/query'
    + '?geometryType=esriGeometryPoint'
    + '&geometry=' + x + ',' + y
    + '&inSR=4326'
    + '&spatialRel=esriSpatialRelIntersects'
    + '&returnCountOnly=false'
    + '&returnIdsOnly=false'
    + '&returnGeometry=false'
    + '&outFields=*'
    + '&f=json';

    return jsonP( url ).promise;
};
