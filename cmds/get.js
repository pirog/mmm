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

/*
 * Remove unneeded keys
 * @todo REEVALUATE THIS
 */
var cleanKeys = function(datum) {
  /*jshint camelcase: false */
  /*jscs: disable */
  delete datum.dividend;
  delete datum.split;
  delete datum.adj_Open;
  delete datum.adj_High;
  delete datum.adj_Low;
  delete datum.adj_Close;
  delete datum.adj_Volume;
  return datum;
  /*jshint camelcase: true */
  /*jscs: enable */
};

// Define the command
exports.command = 'get [symbol]';

// Describe the command
exports.desc = 'Get historical data about a symbol.';

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
  },
  rsi: {
    default: 14
  }
};

// Define the command action
exports.handler = function(argv) {

  // Get the data
  return mmm.quandl.get(argv.symbol, argv.rows, argv.period, argv.desc)

  // Check to see if we need RSI and add it to the dataset if we do
  .then(function(data) {

    // We have RSI
    if (argv.rsi) {

      // Transform our data for use in TALIB
      var talibData = mmm.transform.toObject(data);

      // Transform our data to an object and submit closing prices
      return mmm.ta.rsi(talibData.close, argv.rsi)

      // Retrieve the RSI data, add it to the dataset and translate it back
      .then(function(rsi) {
        talibData.rsi = rsi;
        return mmm.transform.toArray(talibData);
      });
    }

  })

  // Translate data into a nice table
  .then(function(data) {

    // Translate our data into an array of rows
    var rows = _.map(data, function(datum) {

      // Clean up our keys
      datum = cleanKeys(datum);

      // Update the date for better preso
      datum.date = new Date(datum.date).toDateString();

      // Colorize the diff
      datum.diff = chalk[getColor(datum.diff)](_.round(datum.diff, 2));

      // Colorize the change and add some %
      datum.change = _.round(datum.change * 100, 2);
      datum.change = chalk[getColor(datum.change)](datum.change + '%');

      // Return just the values
      return _.values(datum);

    });

    // Get the headers and sex them up a bit
    var headers = _.map(_.keys(cleanKeys(data[0])), function(key) {
      return _.capitalize(_.startCase(key));
    });

    // Build the table and headers
    var options = {
      head: headers,
      style: {head: ['cyan'], border: ['grey']}
    };

    // Print the table
    console.log(mmm.table.build(rows, options));

  });

};
