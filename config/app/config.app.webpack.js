'use strict';

var path = require('path');
var webpack = require('webpack');
var _ = require('lodash');
var packageJson = require('../../package.json');

module.exports = function(config, options) {
  // Expose environment config (defined by APP_ENV env var) as a module
  config.webpack.resolve.alias['APP_ENV_CONFIG$'] = path.join(
    config.paths.config,
    'app',
    'environment',
    options.appEnv + '.json'
  );

  // Add a banner message to compiled webpack bundles
  var banner = _.compact([
    packageJson.name + ' ' + packageJson.version + ' (' + options.buildEnv + '/' + options.appEnv + ')',
    packageJson.description,
    packageJson.copyright
  ]).join('\n');
  config.webpack.plugins.push(new webpack.BannerPlugin(banner));

  // Libraries

  /*
  // Examples:

  // datatables
  // config.webpack.resolve.alias['datatables'] = 'datatables/media/js/jquery.dataTables';
  config.webpack.module.loaders.push({
    test: /\/jquery\.dataTables(?:\.min)?\.js$/,
    loaders: [
      'imports?jQuery=jquery',
      'exports?jQuery'
    ]
  });

  // highstock
  config.webpack.resolve.alias['highstock'] = 'highstock-release/highstock.src';
  config.webpack.module.loaders.push({
    test: /\/highstock(?:\.src)?\.js$/,
    loaders: [
      'imports?jQuery=jquery',
      'exports?Highcharts'
    ]
  });

  // highcharts
  config.webpack.resolve.alias['highcharts'] = 'highstock';
  config.webpack.module.loaders.push({
    test: /\/highcharts\/modules\/(?:[^\/]*)?\.js$/,
    loaders: [
      'imports?Highcharts=highcharts'
    ]
  });

  // jquery
  config.webpack.module.loaders.push({
    test: /\/jquery(?:\.min)?\.js$/,
    loaders: ['expose?jQuery'] // for libraries that expect window.jQuery (e.g. highcharts)
  });

  // lodash
  config.webpack.resolve.alias['lodash$'] = 'lodash/index';
  config.webpack.module.loaders.push({
    test: /\/lodash\/index\.js$/,
    loaders: ['imports?define=>false'] // don't leak _ var into global
  });

  // moment
  config.webpack.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/])); // don't bundle locales
  */

  return config;
};
