/**
 * Env module.
 *
 * @module env
 */

'use strict';

// Modules
var _ = require('./node')._;
var dotenv = require('dotenv');
var os = require('os');
var path = require('path');

// Constants
var ENV_PREFIX = 'MMM_';

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
  return path.join(getHomeDir(), '.mmm');
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

  // Get default env
  var env = {
    env: getProcessEnv(),
    home: getHomeDir(),
    srcRoot: getSourceRoot(),
    sysConfRoot: getSysConfRoot(),
    userConfRoot: getUserConfRoot()
  };

  // Merge in envvars
  _.forEach(_.merge(process.env, dotenv.config()), function(value, key) {
    if (_.includes(key, ENV_PREFIX)) {

      // Add to our config object
      env[_.camelCase(_.trimStart(key, ENV_PREFIX))] = value;

    }
  });

  // Return the env
  return env;

});

/**
 * Export func to get conf
 */
module.exports = getEnv();
