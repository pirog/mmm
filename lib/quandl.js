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
  var Quandl = require('d3fc-financial-feed').feedQuandl;
  return Promise.resolve(
    new Quandl()
      .apiKey(require('./config')().quandlApiKey)
      .database('EOD')
      .dataset(symbol)
      .rows(rows)
      .collapse(period)
  );
};

/*
 * Return stock data
 */
exports.get = function(symbol, rows, period) {
  var tick = symbol.toUpperCase();
  log.verbose('Getting data from %s', tick);
  return getClient(tick, rows, period);
};
