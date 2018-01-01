/**
 * Command to print out the config
 *
 * @name config
 */

'use strict';

module.exports = function(mmm) {

  // Define our task
  return {
    command: 'config',
    describe: 'Display the mmm configuration',
    run: function() {
      console.log(JSON.stringify(mmm.config, null, 2));
    }
  };

};
