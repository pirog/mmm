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
  }
};

// Define the command action
exports.handler = function(argv) {

  // Get the data
  return mmm.quandl.get(argv.symbol)

  .then(function(data) {
    data(function(error, data) {

      var Table = require('cli-table');
      var table = new Table({
        head: ['Date', 'Open', 'High', 'Low', 'Close', 'Volume'],
        style: {head: ['cyan'], border: ['grey']},
        colWidths: [19, 10, 10, 10, 10, 10]
      });

      var things = _.map(data, function(value) {
        return [
          value.date,
          value.open,
          value.high,
          value.low,
          value.close,
          value.volume
        ];
      });

      // table is an Array, so you can `push`, `unshift`, `splice` and friends
      _.forEach(things, function(thing) {
        table.push(thing);
      });

      console.log(table.toString());
    });
  });

};
