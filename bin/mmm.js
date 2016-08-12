#!/usr/bin/env node

'use strict';

/*
 * This file is meant to be linked as a "mmm" executable.
 */

// Define our basic CLI
var yargs = require('yargs');
var argv = yargs
  .commandDir('../cmds')
  .demand(1)
  .help()
  .strict()
  .argv;

// Silence code style checking
argv = argv;
