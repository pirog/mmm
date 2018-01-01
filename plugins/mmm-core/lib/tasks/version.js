/**
 * Command to show the version
 *
 * @name version
 */

'use strict';

module.exports = function(mmm) {

  // Define our task
  return {
    command: 'version',
    describe: 'Display the mmm version',
    run: function() {
      console.log('v' + mmm.config.version);
    }
  };

};
