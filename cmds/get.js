/**
 * `get` command for the CLI
 *
 * @name get
 */

'use strict';

// Get our mmm library
var mmm = require('./../lib/mmm.js');
var _ = require('lodash');

// Define the command
exports.command = 'get [symbol]';

// Describe the command
exports.desc = 'Get historical data about a ticker.';

// Define the options
exports.builder = {
  symbol: {
    default: 'GOOG'
  },
  rows: {
    default: 10000
  },
  period: {
    default: 'daily'
  }
};

// Define the command action
exports.handler = function(argv) {

  // Get the data
  return mmm.quandl.get(argv.symbol, argv.rows, argv.period, argv.desc)

  // Translate data into a nice table
  .then(function(data) {

    // Build the table and headers
    var options = {
      head: ['Date', 'Open', 'High', 'Low', 'Close', 'Volume'],
      style: {head: ['cyan'], border: ['grey']},
      colWidths: [19, 10, 10, 10, 10, 10]
    };

    // Translate our data into an array of rows
    var rows = _.map(data, function(value) {
      return [
        value.date,
        value.open,
        value.high,
        value.low,
        value.close,
        value.volume
      ];
    });

    // Print the table
    console.log(mmm.table.build(rows, options));

  });

};
