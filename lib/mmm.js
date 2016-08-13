/**
 * Main library entrypoint to get all of mmm
 *
 * @name mmm
 */

'use strict';

/*
 * Load configuration modules
 */
exports.config = require('./config')();

/*
 * Load quandl module
 */
exports.quandl = require('./quandl');
