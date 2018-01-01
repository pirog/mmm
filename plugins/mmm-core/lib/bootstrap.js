/**
 * This bootstraps the init framework
 *
 * @name bootstrap
 */

'use strict';

module.exports = function(mmm) {

  // Add services modules to mmm
  mmm.events.on('post-bootstrap', 1, function(mmm) {

    // Load our tasks
    mmm.tasks.add('config', require('./tasks/config')(mmm));
    mmm.tasks.add('version', require('./tasks/version')(mmm));

  });

};
