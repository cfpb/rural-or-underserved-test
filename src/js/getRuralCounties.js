require( 'es6-promise' ).polyfill();
var axios = require( 'axios' );

module.exports = function( year ) {
  return axios.get( window.location.origin + '/data/' + year + '.json' );
};
