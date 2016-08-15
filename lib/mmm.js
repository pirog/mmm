/**
 * Main library entrypoint to get all of mmm
 *
 * @name mmm
 */

'use strict';

/*
 * Load cache module
 */
exports.cache = require('./cache');

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
