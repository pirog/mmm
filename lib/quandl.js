/**
 * Main config module
 *
 * @name config
 */

'use strict';

// Globally needed modules
var log = require('./logger');
var Promise = require('bluebird');

/*
 * Get the client
 */
var getClient = function(symbol, rows, period) {

  // Grab the client
  var Quandl = require('d3fc-financial-feed').feedQuandl;

  // Return a promiseified client
  return Promise.resolve(
    new Quandl()
      .apiKey(require('./config')().quandlApiKey)
      .database('EOD')
      .dataset(symbol)
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
