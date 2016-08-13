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
var getClient = function(symbol) {
  var Quandl = require('d3fc-financial-feed').feedQuandl;
  return Promise.resolve(
    new Quandl()
      .apiKey(require('./config')().quandlApiKey)
      .database('EOD')
      .dataset(symbol)
      .rows(5)
      .collapse('daily')
  );
};

/*
 * Return stock data
 */
exports.get = function(symbol) {
  var tick = symbol.toUpperCase();
  log.verbose('Getting data from %s', tick);
  return getClient(tick);
};
