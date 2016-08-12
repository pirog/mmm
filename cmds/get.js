
'use strict';

// Define the command
exports.command = 'get [ticker]';

// Describe the command
exports.desc = 'Get historical data about a ticker';

// Define the options
exports.builder = {
  ticker: {
    default: 'GOOG'
  }
};

// Define the command action
exports.handler = function(argv) {
  console.log(argv);
  console.log('init called for dir', argv.ticker);
};
