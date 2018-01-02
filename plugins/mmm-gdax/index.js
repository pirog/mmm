/**
 * Our gdax plugin
 *
 * @name index
 */

'use strict';

module.exports = function(mmm) {

  // Bootstrap gdax config
  require('./lib/bootstrap')(mmm);

};
