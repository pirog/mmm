/**
 * Contains methods to help initialize and display the CLI
 *
 * @since 1.0.0
 * @module cli
 * @example
 *
 * // Initialize CLI
 * return mmm.cli.init(mmm);
 */

'use strict';

// Modules
var _ = require('./node')._;
var chalk = require('./node').chalk;
var path = require('path');
var Table = require('cli-table');

// Yargonaut must come before yargs
var yargonaut = require('yargonaut');
yargonaut.style('green').errorsStyle('red');

// Get yargs
var yargs = require('yargs');

/**
 * Utility function to help construct CLI displayable tables
 *
 * @since 1.0.0
 * @param {Object} [opts] - Options for how the table should be built
 * @param {String} [opts.arrayJoiner=', '] - A delimiter to be used when joining array data
 * @returns {Object} Table metadata that can be printed with toString()
 * @example
 *
 * // Grab a new cli table
 * var table = new mmm.cli.Table();
 *
 * // Add data
 * table.add('NAME', app.name);
 * table.add('LOCATION', app.root);
 * table.add('SERVICES', _.keys(app.services));
 * table.add('URLS', urls, {arrayJoiner: '\n'});
 *
 * // Print the table
 * console.log(table.toString());
 */
exports.Table = function(opts) {

  // Default opts
  var tableDefaults = {
    chars: {
      'top': '',
      'top-mid': '',
      'top-left': '',
      'top-right': '',
      'bottom': '',
      'bottom-mid': '',
      'bottom-left': '',
      'bottom-right': '',
      'left': '',
      'left-mid': '',
      'mid': '',
      'mid-mid': '',
      'right': '',
      'right-mid': '',
      'middle': ''
    }
  };

  // Add a push method
  Table.prototype.add = function(key, value, opts) {

    // Set the default opts
    var addDefaults = {
      arrayJoiner: ', ',
    };

    // merge opts
    opts = _.merge(addDefaults, opts);

    // Colorize key
    key = chalk.cyan(key);

    // Do some special things for arrays
    if (_.isArray(value)) {
      value = value.join(opts.arrayJoiner);
    }

    // Do the normal push
    Table.prototype.push([key, value]);

  };

  // Return our default table
  return new Table(_.merge(tableDefaults, opts));

};

/**
 * Initializes the CLI.
 *
 * This will either print the CLI usage to the console or route the command and
 * options given by the user to the correct place.
 *
 * @since 1.0.0
 * @fires pre-cli-load
 * @param {Object} mmm - An initialized mmm object.
 * @example
 *
 * // Initialize the CLI
 * return mmm.cli.init(mmm);
 */
exports.init = function(mmm) {

  // Log
  mmm.log.info('Initializing cli');

  // Get global tasks
  var tasks = _.sortBy(mmm.tasks.tasks, 'name');

  // Get cmd
  var cmd = '$0';

  // If we are packaged lets get something else
  if (_.has(process, 'pkg')) {
    cmd = path.basename(_.get(process, 'execPath', 'mmm'));
  }

  // Define our default CLI
  yargs
    .usage('Usage: ' + cmd + ' <command> [args] [options] [-- global options]');

  /**
   * Event that allows other things to alter the tasks being loaded to the CLI.
   *
   * @since 1.0.0
   * @event module:cli.event:pre-cli-load
   * @property {Object} tasks An object of mmm tasks
   * @example
   *
   * // As a joke remove all tasks and give us a blank CLI
   * mmm.events.on('pre-cli-load', function(tasks) {
   *   tasks = {};
   * });
   */
  return mmm.events.emit('pre-cli-load', tasks)

  // Print our result
  .then(function() {

    // Parse any global opts for usage later
    tasks.largv = mmm.tasks.parseGlobals();

    // Create epilogue for our global options
    var epilogue = [
      chalk.green('Global Options:\n'),
      '  --help, -h  Show help\n',
      '  --verbose, -v, -vv, -vvv, -vvvv  Change verbosity of output'
    ];

    // Loop through the tasks and add them to the CLI
    _.forEach(tasks, function(task) {
      mmm.log.verbose('Loading cli task %s', task.name);
      yargs.command(mmm.tasks.parseToYargs(task));
    });

    // Invoke help if global option is specified
    if (tasks.largv.help) {
      yargs.showHelp();
      process.exit(0);
    }

    // Finish up the yargs
    var argv = yargs
      .strict(true)
      .demandCommand(1, 'You need at least one command before moving on')
      .epilog(epilogue.join(''))
      .wrap(yargs.terminalWidth() * 0.75)
      .argv;

    // Log the CLI
    mmm.log.debug('CLI args', argv);

  });

};
