/**
 * `get` command for the CLI
 *
 * @name get
 */

'use strict';

// Get our mmm library
var _ = require('lodash');
var chalk = require('chalk');
var mmm = require('./../lib/mmm.js');

/*
 * Basic helper to colorize up/down data
 */
var getColor = function(datum) {

  // Colorize if needed
  if (datum > 0) {
    return 'green';
  }
  else if (datum < 0) {
    return 'red';
  }

  // Guess no change so return original
  return 'white';

};

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
    default: 100000
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

    // Var headers
    var headers = [
      'Date',
      'Open',
      'High',
      'Low',
      'Close',
      'Volume',
      'Change',
      '% Change'
    ];

    // Build the table and headers
    var options = {
      head: headers,
      style: {head: ['cyan'], border: ['grey']}
    };

    // Translate our data into an array of rows
    var rows = _.map(data, function(value) {

      // Update the date
      value.date = new Date(value.date).toDateString();

      // Colorize the diff
      value.diff = chalk[getColor(value.diff)](_.round(value.diff, 2));

      // Colorize the change and add some %
      value.change = _.round(value.change * 100, 2);
      value.change = chalk[getColor(value.change)](value.change + '%');

      return [
        value.date,
        value.open,
        value.high,
        value.low,
        value.close,
        value.volume,
        value.diff ,
        value.change
      ];
    });

    // Print the table
    console.log(mmm.table.build(rows, options));

  });

};
