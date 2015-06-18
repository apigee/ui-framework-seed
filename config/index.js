'use strict';

var _ = require('lodash');
var _mergeDefaults = require('merge-defaults');

module.exports = function(options) {
  options = _mergeDefaults(_.clone(options), {
    buildEnv: process.env.BUILD_ENV,
    appEnv: process.env.APP_ENV || 'default',

    // check code style (JSHint/JSCS) during build
    // you can disable this if your editor has JSHint/JSCS support
    // to avoid running them twice
    checkCodeStyle: false
  });

  var config = {};

  require('./config.paths')(config, options);
  require('./config.aws')(config, options);
  require('./webpack')(config, options);
  require('./app')(config, options);

  return config;
};
