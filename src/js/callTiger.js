var $ = require('jquery');

module.exports = function(x, y, layer) {
  /*var url = 'http://geocoding.geo.census.gov/geocoder/geographies/onelineaddress?&callback=' + cb
    + '&address=' + address
    + '&benchmark=Public_AR_Census2010'
    + '&vintage=Census2010_Census2010'
    + '&layers=68,70,14'
    + '&format=jsonp';

    86 = counties
    66 = urban Clusters
    64 = urban areas
    */

  var url = 'http://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/tigerWMS_Current/MapServer/'
    + layer
    + '/query'
    //+ '?callback=' + cb
    + '?geometryType=esriGeometryPoint'
    + '&geometry=' + x + ',' + y
    + '&inSR=4326'
    + '&spatialRel=esriSpatialRelIntersects'
    + '&returnCountOnly=false'
    + '&returnIdsOnly=false'
    + '&returnGeometry=false'
    + '&outFields=*'
    + '&f=json';

    return $.get(url);

  /*var response = document.createElement('script');
  document.body.appendChild(response);
  response.src = url;*/
};
