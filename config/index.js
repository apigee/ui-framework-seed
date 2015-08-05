'use strict';

var _ = require('lodash');
var mergeDefaults = require('merge-defaults');

module.exports = function(options) {
  options = mergeDefaults(_.clone(options), {
    buildEnv: process.env.BUILD_ENV,
    appEnv: process.env.APP_ENV || 'default',

    // enable ESLint checking during build
    // you can disable this if your editor has ESLint support
    // to avoid running them twice. This is always enabled
    // for BUILD_ENV=production builds.
    eslint: true
  });

  var config = {};

  require('./config.paths')(config, options);
  require('./config.aws')(config, options);
  require('./webpack')(config, options);
  require('./app')(config, options);

  return config;
};
