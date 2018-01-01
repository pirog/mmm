/**
 * Generates and returns the global config object
 *
 * @since 1.0.0
 * @module config
 * @example
 *
 * // Get the config
 * var config = mmm.config;
 */

'use strict';

// Modules
var _ = require('./node')._;
var env = require('./env');
var fs = require('./node').fs;
var os = require('os');
var path = require('path');
var yaml = require('js-yaml');

// "Constants"
var CONFIG_FILENAME = 'config.yml';

/*
 * Define default config
 */
var getDefaultConfig = function() {

  // Grab version things
  var packageJson = require(path.join(env.srcRoot, 'package.json'));

  // Check whether we are in NW or not
  var isNw = _.has(process.versions, 'node-webkit');

  var config = {
    cache: true,
    configFilename: CONFIG_FILENAME,
    isNW: isNw,
    logLevel: 'debug',
    logLevelConsole: 'info',
    node: process.version,
    os: {
      type: os.type(),
      platform: os.platform(),
      release: os.release(),
      arch: os.arch()
    },
    version: packageJson.version
  };

  // Merge in the env
  config = _.merge(config, env);

  // Return default config
  return config;

};

/*
 * Merge in config file if it exists
 */
var mergeConfigFile = function(file) {

  // Merge in file if it exists
  if (fs.existsSync(file)) {
    return yaml.safeLoad(fs.readFileSync(file));
  }

  // Return emptiness
  return {};

};

/*
 * Validate our config
 */
var validateConfig = function(config) {

  // Make sure we have something needed
  if (_.isEmpty(config)) {
    // throw new Error('Need to define something');
  }

  // return our config
  return config;

};

/*
 * Get config
 */
var getConfig = _.memoize(function() {

  // Start with the default config
  var config = getDefaultConfig();

  // Check for other config soruces
  var configSources = [
    path.join(config.srcRoot, CONFIG_FILENAME),
    path.join(config.sysConfRoot, CONFIG_FILENAME),
    path.join(config.userConfRoot, CONFIG_FILENAME)
  ];

  // Check to see if we have more config files and merge those in
  _.forEach(configSources, function(file) {
    config = _.merge(config, mergeConfigFile(file));
  });

  // Return our config
  return validateConfig(config);

});

/*
 * Export func to get conf
 */
module.exports = getConfig();
