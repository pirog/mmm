/**
 * Contains the main bootstrap function.
 *
 * @since 1.0.0
 * @module bootstrap
 * @example
 *
 * // Get the bootstrap function
 * var bootstrap = require('./../lib/bootstrap.js');
 *
 * // Initialize mmm in CLI mode
 * bootstrap({mode: 'cli'})
 *
 * // Initialize CLI
 * .tap(function(mmm) {
 *   return mmm.cli.init(mmm);
 * })
 */

'use strict';

// Modules
var _ = require('./node')._;
var config = require('./config');
var SILLY_TEXT = 'It\'s not particularly silly, is it? I mean, the right leg' +
  ' isn\'t silly at all and the left leg merely does a forward aerial half' +
  ' turn every alternate step.';

/**
 * The main bootstrap function.
 *
 * This will:
 *
 *   1. Instantiate the mmm object.
 *   2. Emit bootstrap events
 *   3. Initialize plugins
 *
 * @since 1.0.0
 * @name bootstrap
 * @static
 * @fires pre-bootstrap
 * @fires post-bootstrap
 * @param {Object} opts - Options to tweak the bootstrap
 * @param {String} opts.mode - The mode to run the bootstrap with
 * @returns {Object} An initialized mmm object
 * @example
 *
 * // Get the bootstrap function
 * var bootstrap = require('./../lib/bootstrap.js');
 *
 * // Initialize mmm in CLI mode
 * bootstrap({mode: 'cli'})
 *
 * // Initialize CLI
 * .tap(function(mmm) {
 *   return mmm.cli.init(mmm);
 * })
 */
module.exports = _.once(function(opts) {

  // Merge in our opts to the configs
  config = _.merge(config, opts);

  // Summon mmm
  var mmm = require('./mmm')(config);

  // Log that we've begun
  mmm.log.info('Bootstrap starting...');
  mmm.log.debug('Boostrapping with', mmm.config);
  mmm.log.silly(SILLY_TEXT);

  /**
   * Event that allows other things to augment the mmm global config.
   *
   * This is useful so plugins can add additional config settings to the global
   * config.
   *
   * @since 1.0.0
   * @event module:bootstrap.event:pre-bootstrap
   * @property {Object} config The global mmm config
   * @example
   *
   * // Add engine settings to the config
   * mmm.events.on('pre-bootstrap', function(config) {
   *
   *   // Get the docker config
   *   var engineConfig = daemon.getEngineConfig();
   *
   *   // Add engine host to the config
   *   config.engineHost = engineConfig.host;
   *
   * });
   */
  return mmm.events.emit('pre-bootstrap', mmm.config)

  // Return our plugins so we can init them
  .then(function() {
    mmm.log.verbose('Trying to load plugins', mmm.config.plugins);
    return mmm.config.plugins;
  })

  // Init the plugins
  .map(function(plugin) {
    return mmm.plugins.load(plugin);
  })

  /**
   * Event that allows other things to augment the mmm object.
   *
   * This is useful so plugins can add additional modules to mmm before
   * the bootstrap is completed.
   *
   * @since 1.0.0
   * @event module:bootstrap.event:post-bootstrap
   * @property {Object} mmm The mmm object
   * @example
   *
   * // Add the services module to mmm
   * mmm.events.on('post-bootstrap', function(mmm) {
   *   mmm.services = require('./services')(mmm);
   * });
   */
  .then(function() {
    mmm.log.info('Core plugins loaded');
    return mmm.events.emit('post-bootstrap', mmm);
  })

  // Return a fully initialized mmm
  .then(function() {
    mmm.log.info('Bootstrap completed.');
    return mmm;
  });

});
