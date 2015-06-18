'use strict';

function addEntry(webpackConfig, key, value) {
  if (Array.isArray(webpackConfig.entry)) {
    webpackConfig.entry.unshift(value);
  } else if (typeof webpackConfig.entry === 'object') {
    webpackConfig.entry[key] = value;
  } else if (webpackConfig.entry) {
    webpackConfig.entry = [value, webpackConfig.entry];
  } else {
    webpackConfig.entry = value;
  }
}

module.exports = function(config, options) {
  config.webpack = require('./config.webpack')(config, options);
  config.webpackServer = require('./config.webpackServer')(config, options);

  if (options.buildEnv === 'development') {
    addEntry(config.webpack, 'webpack-dev-server-client', 'webpack-dev-server/client?' + config.webpackServer.url);

    if (options.hot && config.webpackServer.hot) {
      addEntry(config.webpack, 'webpack-hot-dev-server', 'webpack/hot/dev-server');
    }
  }
};
