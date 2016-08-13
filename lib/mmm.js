/**
 * Main library entrypoint to get all of mmm
 *
 * @name mmm
 */

'use strict';

/*
 * Load configuration module
 */
exports.config = require('./config')();

/*
 * Load quandl module
 */
exports.quandl = require('./quandl');

/*
 * Load table module
 */
exports.table = require('./table');
