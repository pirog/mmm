/**
 * Main technical analysis module
 *
 * @name ta
 */

'use strict';

// Modules
var _ = require('lodash');
var log = require('./logger');
var talib = require('talib');

/*
 * Fill in the offset with harmless data
 */
var normalizeData = function(data) {

  // If we have an offset, let's calculate a reasonable value as filler
  if (data.begIndex && data.begIndex > 0) {
    var fill = _.mean(_.take(data.result.outReal, data.begIndex));
    for (var i = 0; i < data.begIndex; i++) {
      data.result.outReal.unshift(fill);
    }
  }

  // Return the result
  return data.result.outReal;

};

/*
 * Promisified wrapper around talib.exec
 */
var compute = function(metric, data) {

  // Set our exec and set the name
  var exec = data || {};
  exec.name = metric.toUpperCase();

  // Promisify the exec
  return new Promise(function(resolve, reject) {
    talib.execute(exec, function(results) {

      // If the result contains an error then reject
      if (results.error) {
        reject(new Error(results.error));
      }

      // Else normalize results and return
      else {
        resolve(normalizeData(results));
      }

    });
  });

};

/*
{ name: 'RSI',
  group: 'Momentum Indicators',
  hint: 'Relative Strength Index',
  inputs: [ { name: 'inReal', type: 'real' } ],
  optInputs:
   [ { name: 'optInTimePeriod',
       displayName: 'Time Period',
       defaultValue: 14,
       hint: 'Number of period',
       type: 'integer_range' } ],
  outputs: [ { '0': 'line', name: 'outReal', type: 'real', flags: {} } ] }
 */
exports.rsi = function(prices, period) {

  // Build the exec
  var exec = {
    startIdx: 0,
    endIdx: prices.length - 1,
    inReal: prices,
    optInTimePeriod: period || 14
  };

  // Run the exec
  log.verbose('Computing %s period RSI on some data', exec.optInTimePeriod);
  return compute('rsi', exec);

};
