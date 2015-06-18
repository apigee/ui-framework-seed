'use strict';

module.exports = function(config, options) {
  // app-specific configs, loaded after all others, so
  // put any overrides in a file in this directory and add it here

  require('./config.app.aws')(config, options);
  require('./config.app.webpack')(config, options);

  return config;
};
