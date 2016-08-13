/**
 * Main table module
 *
 * @name table
 */

'use strict';

// Globally needed modules
var _ = require('lodash');
var Table = require('cli-table');

/*
 * Return stock data
 */
exports.build = function(rows, options) {

  // Instantiate a table
  var table = new Table(options);

  // Add each entry to the table
  _.forEach(rows, function(row) {
    table.push(row);
  });

  // Return the table
  return table.toString();

};
