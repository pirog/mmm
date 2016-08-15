/**
 * Main config module
 *
 * @name config
 */

'use strict';

// Globally needed modules
var _ = require('lodash');
var cache = require('./cache');
var crypto = require('crypto');
var log = require('./logger');
var Promise = require('bluebird');

/*
 * Get the client
 */
var getClient = function(symbol, rows, period) {

  // Build cache hash
  var seed = symbol + rows + period;
  var key = crypto.createHash('md5').update(seed).digest('hex');

  // Check to see if we have an entry cached first
  if (cache.get(key)) {
    return Promise.resolve(cache.get(key));
  }

  // Grab the client
  var Quandl = require('d3fc-financial-feed').feedQuandl;

  // Return a promiseified client
  return Promise.resolve(
    new Quandl()
      .apiKey(require('./config')().quandlApiKey)
      .database('EOD')
      .dataset(symbol)
      .descending(true)
      .rows(rows)
      .collapse(period)
  )

  // Promisify the returned data
  .then(function(data) {
    return new Promise(function(resolve, reject) {
      data(function(error, data) {
        if (error) {
          reject(error);
        }
        else {

          // Add some basic information about our dataset
          _.map(data, function(value) {
            value.diff = value.close - value.open;
            value.change = value.diff / value.close;
            return value;
          });

          // Set into the cache
          cache.set(key, data);

          // Resolve promise
          resolve(data);

        }
      });
    });
  });

};

/*
 * Return stock data
 */
exports.get = function(symbol, rows, period) {
  var tick = symbol.toUpperCase();
  log.verbose('Getting %s rows of %s data from %s', rows, period, tick);
  return getClient(tick, rows, period);
};
