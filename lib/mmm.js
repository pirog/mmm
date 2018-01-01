/**
 * This is the high level object that contains the mmm libraries.
 *
 * @since 1.0.0
 * @namespace mmm
 *
 */

'use strict';

// Modules
var _ = require('./node')._;
var AsyncEvents = require('./events');
var events = new AsyncEvents();

/*
 * Return mmm
 */
module.exports = _.memoize(function(config) {

  // Create the mmm object
  var mmm = {

    /**
     * The bootstrap module.
     *
     * Contains helpful methods to bootstrap mmm.
     *
     * @since 1.0.0
     * @memberof mmm
     * @see {@link bootstrap.md}
     */
    bootstrap: require('./bootstrap'),

    /**
     * The cache module.
     *
     * Contains helpful methods to cache data.
     *
     * @since 1.0.0
     * @memberof mmm
     * @see {@link cache.md}
     */
    cache: require('./cache'),

    /**
     * The cli module.
     *
     * Contains helpful methods to init a CLI, inject commands and display CLI data.
     *
     * @since 1.0.0
     * @memberof mmm
     * @see {@link cli.md}
     */
    cli: require('./cli'),

    /**
     * The global config object
     *
     * @since 1.0.0
     * @memberof mmm
     * @see {@link config.md}
     */
    config: config,

    /**
     * The error module.
     *
     * Contains helpful error handling methods.
     *
     * @since 1.0.0
     * @memberof mmm
     * @see {@link error.md}
     */
    error: require('./error'),

    /**
     * The events module.
     *
     * An instance of AsyncEvents.
     *
     * @since 1.0.0
     * @memberof mmm
     * @see {@link events.md}
     */
    events: events,

    /**
     * The logging module.
     *
     * Contains logging methods.
     *
     * @since 1.0.0
     * @memberof mmm
     * @see {@link log.md}
     */
    log: require('./logger'),

    /**
     * The node module.
     *
     * Contains helpful node modules like `lodash` and `restler` that can be
     * used in plugins.
     *
     * @since 1.0.0
     * @memberof mmm
     * @see {@link node.md}
     */
    node: require('./node'),

    /**
     * The plugins module.
     *
     * Contains helpful methods to load mmm plugins.
     *
     * @since 1.0.0
     * @memberof mmm
     * @see {@link plugins.md}
     */
    plugins: require('./plugins'),

    /**
     * The Promise module.
     *
     * An extended `bluebird` Promise object.
     *
     * @since 1.0.0
     * @memberof mmm
     * @see {@link promise.md}
     */
    Promise: require('./promise'),

    /**
     * The shell module.
     *
     * Contains helpful methods to parse and execute commands.
     *
     * @since 1.0.0
     * @memberof mmm
     * @see {@link shell.md}
     */
    shell: require('./shell'),

    /**
     * The tasks module.
     *
     * Contains helpful methods to define and parse mmm tasks.
     *
     * @since 1.0.0
     * @memberof mmm
     * @see {@link tasks.md}
     */
    tasks: require('./tasks'),

    /**
     * The user module.
     *
     * Contains helpful methods to get information about user running mmm.
     *
     * @since 1.0.0
     * @memberof mmm
     * @see {@link user.md}
     */
    user: require('./user'),

    /**
     * The utils module.
     *
     * Contains helpful utility methods.
     *
     * @since 1.0.0
     * @memberof mmm
     * @see {@link utils.md}
     */
    utils: require('./utils'),

    /**
     * The yaml module.
     *
     * Contains helpful yaml methods.
     *
     * @since 1.0.0
     * @memberof mmm
     * @see {@link yaml.md}
     */
    yaml: require('./yaml')

  };

  // Return mmm
  return mmm;

});
