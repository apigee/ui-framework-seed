'use strict';

var url = require('url');

module.exports = function(config, options) {
  var webpackServerConfig = {
    hostname: 'localhost',
    port: process.env.PORT || 3000,

    hot: options.hot,

    contentBase: config.paths.static,

    stats: {
      colors: true
    }
  };

  webpackServerConfig.url = url.format({
    protocol: 'http',
    hostname: webpackServerConfig.hostname,
    port: webpackServerConfig.port
  });

  return webpackServerConfig;
};
