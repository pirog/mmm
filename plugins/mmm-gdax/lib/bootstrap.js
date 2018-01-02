/**
 * This bootstraps the gdax framework
 *
 * @name bootstrap
 */

'use strict';

module.exports = function(mmm) {

  // Constants
  var REST_API = 'https://api.gdax.com';
  var REST_SANDBOX_API = 'https://api-public.sandbox.gdax.com';
  var WS_API = 'wss://ws-feed.gdax.com';
  var WS_SANDBOX_API = 'wss://ws-feed-public.sandbox.gdax.com';

  // Modules
  var _ = mmm.node._;

  // Process config things
  mmm.events.on('post-bootstrap', 1, function(mmm) {

    // Start an auth collector
    var auth = {};

    // Ensure we have auth things
    _.forEach(['gdaxKey', 'gdaxSecret', 'gdaxPassphrase'], function(key) {
      if (_.isEmpty(mmm.config[key])) {
        var badKey = _.toUpper('MMM_' + _.snakeCase(key));
        mmm.log.error('Environment variable %s is not set', badKey);
        process.exit(666);
      }
      else {
        auth[_.toLower(_.trim(key, 'gdax'))] = mmm.config[key];
      }
    });

    // Augment auth with API endpoints
    auth.rest = (mmm.config.gdaxSandbox) ? REST_SANDBOX_API : REST_API;
    auth.ws = (mmm.config.gdaxSandbox) ? WS_SANDBOX_API : WS_API;

    // Log
    mmm.log.verbose('GDAX auth envvars are set with %j', auth);

    // Add them to mmm
    mmm.gdax = {auth: auth};

  });

};
