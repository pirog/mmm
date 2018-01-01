#!/usr/bin/env node

/**
 * Main CLI entrypoint to use the mmm libraries
 * This file is meant to be linked as a "mmm" executable.
 *
 * @name mmm
 */

'use strict';

// Grab stuff so we can bootstrap
var bootstrap = require('./../lib/bootstrap.js');
var errorHandler;

// Initialize mmm
bootstrap({mode: 'cli'})

// Initialize CLI
.tap(function(mmm) {
  return mmm.cli.init(mmm);
})

// Handle uncaught errors
.tap(function(mmm) {
  errorHandler = mmm.error.handleError;
  process.on('uncaughtException', errorHandler);
})

// Catch errors
.catch(errorHandler);
