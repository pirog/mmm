/**
 * `get` command for the CLI
 *
 * @name get
 */

'use strict';

// Get our mmm library
//var mmm = require('./../lib/mmm.js');

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
exports.handler = function(/*argv*/) {

/*
var Quandl = require('d3fc-financial-feed').feedQuandl;

var quandl = Quandl()
  .database('EOD')
  .dataset('BAC')
  .apiKey('kHbnwouKiGdgBstKr-AW')
  .descending(true)
  .collapse('daily');

quandl((error, data) => {
  if (error) throw error;
  console.log(data);
});
*/
/*
  var Quandl = require("quandl");
  var quandl = new Quandl({
    auth_token: "kHbnwouKiGdgBstKr-AW",
    api_version: 3
  });

  quandl.dataset({
    source: "EOD",
    table: "BAC",
  }, {
    order: "desc"

    // Notice the YYYY-MM-DD format
    //download_type: 'complete',
    //start_date: "1986-05-29",
    //end_date: "2016-8-16"
  }, function(err, response){
      if(err)
          throw err;

      var data = JSON.parse(response).dataset;
        console.log(data, null, 2);
        console.log(data.column_names);

      var Table = require('cli-table');

      // instantiate
      var table = new Table({
          head: data.column_names,
          style: {head: ['cyan'], border: ['grey']}
      });

      // table is an Array, so you can `push`, `unshift`, `splice` and friends
      var _ = require('lodash');
      _.forEach(data.data, function(datum) {
        table.push(datum);
      })

      console.log(table.toString());
      console.log(data.data.length);
  });
*/
};
