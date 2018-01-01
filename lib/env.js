/**
 * Env module.
 *
 * @module env
 */

'use strict';

// Modules
var _ = require('./node')._;
var os = require('os');
var path = require('path');

// Constants
var MMM_SYS_CONF_DIRNAME = '.mmm';

/**
 * Document
 */
var getHomeDir = function() {
  return os.homedir();
};

/**
 * Document
 */
var getUserConfRoot = function() {
  return path.join(getHomeDir(), MMM_SYS_CONF_DIRNAME);
};

/**
 * Document
 */
var getSysConfRoot = function() {

  // Win path
  var win = process.env.MMM_INSTALL_PATH || 'C:\\Program Files\\mmm';

  // Return sysConfRoot based on path
  switch (process.platform) {
    case 'win32': return win;
    case 'darwin': return '/Applications/mmm.app/Contents/MacOS';
    case 'linux': return '/usr/share/mmm';
  }

};

/**
 * Document
 */
var getSourceRoot = function() {
  return path.resolve(__dirname, '..');
};

/*
 * Set process Env
 */
var getProcessEnv = function() {

  // Load up our initial env
  var env = process.env || {};

  // Return the env
  return env;

};

/**
 * Get config
 */
var getEnv = _.memoize(function() {
  return {
    env: getProcessEnv(),
    home: getHomeDir(),
    srcRoot: getSourceRoot(),
    sysConfRoot: getSysConfRoot(),
    userConfRoot: getUserConfRoot()
  };
});

/**
 * Export func to get conf
 */
module.exports = getEnv();
