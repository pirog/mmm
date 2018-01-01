/**
 * Contains utility functions.
 *
 * @since 1.0.0
 * @module utils
 * @example
 */

'use strict';

// Modules
var _ = require('./node')._;

/**
 * Used with _.mergeWith to concat arrays
 *
 * @since 1.0.0
 * @example
 *
 * // Take an object and write a docker compose file
 * var newObject = _.mergeWith(a, b, mmm.utils.merger);
 */
exports.merger = function(objValue, srcValue) {
  if (_.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
};
