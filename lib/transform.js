/**
 * Main technical analysis module
 *
 * @name ta
 */

'use strict';

// Modules
var _ = require('lodash');
var log = require('./logger');

/*
 * Transform an array of objects to an object of arrays
 */
exports.toObject = function(data) {
  log.verbose('Mapping array of objects to object of arrays.');
  var keys = _.keys(data[0]);
  return _.zipObject(keys, _.map(keys, key => _.map(data, key)));
};

/*
 * Transform an object of arrays to an array of objects
 */
exports.toArray = function(data) {
  log.verbose('Mapping object of arrays to array of objects.');
  var keys = _.keys(data);
  return _.map(_.zip.apply(this, _.values(data)), function(datum) {
    return _.zipObject(keys, datum);
  });
};

