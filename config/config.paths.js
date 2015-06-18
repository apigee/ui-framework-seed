'use strict';

var path = require('path');

module.exports = function(config, options) {
  config.paths = {
    root: path.join(__dirname, '..')
  };

  config.paths.node_modules = path.join(config.paths.root, 'node_modules');
  config.paths.bower_components = path.join(config.paths.root, 'bower_components');
  config.paths.web_modules = path.join(config.paths.root, 'web_modules');

  config.paths.config = path.join(config.paths.root, 'config');
  config.paths.dist = path.join(config.paths.root, 'dist');
  config.paths.static = path.join(config.paths.root, 'static');

  config.paths.app = path.join(config.paths.root, 'app');
  config.paths.components = path.join(config.paths.app, 'components');
};
