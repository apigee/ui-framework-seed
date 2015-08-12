'use strict';

var path = require('path');

var webpack = require('webpack'),
  _ = require('lodash'),
  gitRev = require('git-rev-sync');

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
    packageJson.name + ' ' + packageJson.version + '-' + gitRev.short() + ' (' + options.buildEnv + '/' + options.appEnv + ')',
    packageJson.description,
    packageJson.copyright
  ]).join('\n');
  config.webpack.plugins.push(new webpack.BannerPlugin(banner));

  // Libraries

  // Enable extra loaders for dependencies that use ES6/ng-annotate/etc
  // which are normally disabled for node_modules and bower_components
  var jsLoader = _.find(config.webpack.module.loaders, { test: /\.js/ });
  jsLoader.include.push(/\/ui-framework-directives/);

  // angular
  config.webpack.module.loaders.push({
    test: /\/angular(?:\.min)?\.js$/,
    loaders: [
      'imports?jQuery=jquery',
      'exports?angular'
    ]
  });

  // angular-bootstrap
  config.webpack.module.loaders.push({
    test: /\/ui-bootstrap(?:-tpls)?(?:\.min)?\.js$/,
    loaders: [
      'imports?angular',
      'exports?"ui.bootstrap"'
    ]
  });

  // angular-breadcrumb
  config.webpack.module.loaders.push({
    test: /\/angular-breadcrumb(?:\.min)?\.js$/,
    loaders: [
      'imports?angular',
      'exports?"ncy-angular-breadcrumb"'
    ]
  });

  // angular-promise-tracker
  config.webpack.module.loaders.push({
    test: /\/promise-tracker\.js$/,
    loaders: [
      'imports?angular',
      'exports?"ajoslin.promise-tracker"'
    ]
  });

  // angular-ui-router
  config.webpack.module.loaders.push({
    test: /\/angular-ui-router(?:\.min)?\.js$/,
    loaders: ['imports?angular']
  });

  // restangular
  config.webpack.module.loaders.push({
    test: /\/restangular(?:\.min)?\.js$/,
    loaders: [
      'imports?angular&_=lodash',
      'exports?"restangular"'
    ]
  });

  /*
  // Examples:
  
  // angular-animate
  config.webpack.resolve.alias['angular-animate'] = 'angular-animate/angular-animate';
  config.webpack.module.loaders.push({
    test: /\/angular-animate?(?:\.min)?\.js$/,
    loaders: [
      'imports?angular',
      'exports?angular.module("ngAnimate")'
    ]
  });

  // angular-dashboard-framework
  config.webpack.module.loaders.push({
    test: /\/angular-dashboard-framework(?:\.min)?\.js$/,
    loaders: [
      'imports?angular,angularBootstrap=angular-bootstrap,Sortable',
      'exports?"adf"'
    ]
  });

  // angular-gravatar
  config.webpack.module.loaders.push({
    test: /\/angular-gravatar(?:\.min)?\.js$/,
    loaders: [
      'imports?angular',
      'exports?"ui.gravatar"'
    ]
  });

  // angular-locker
  config.webpack.module.loaders.push({
    test: /\/angular-locker(?:\.min)?\.js$/,
    loaders: [
      'imports?define=>false&angular',
      'exports?"angular-locker"'
    ]
  });

  // angular-mocks
  config.webpack.module.loaders.push({
    test: /\/angular-mocks(?:\.min)?\.js$/,
    loaders: [
      'imports?angular',
      'exports?angular.mock'
    ]
  });

  // angular-ui-sortable
  config.webpack.module.loaders.push({
    test: /\/angular-ui-sortable\/sortable(?:\.min)?\.js$/,
    loaders: [
      'imports?angular,jqueryUiSortable=jquery-ui/ui/sortable',
      'exports?"ui.sortable"'
    ]
  });

  // angular-datatables
  config.webpack.module.loaders.push({
    test: /(?:plugins\/[^\/]+)?\/angular-datatables(?:\.[^.]+)?\.js$/,
    loaders: [
      'imports?jQuery=datatables&angular',
      'exports?"datatables"'
    ]
  });

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

  // highcharts-ng
  config.webpack.module.loaders.push({
    test: /\/highcharts-ng(?:\.min)?\.js$/,
    loaders: [
      'imports?angular,Highcharts=highcharts',
      'exports?"highcharts-ng"'
    ]
  });
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

  // malhar-angular-dashboard
  config.webpack.module.loaders.push({
    test: /\/malhar-angular-dashboard(?:\.min)?\.js$/,
    loaders: [
      'imports?angular,angularUiSortable=angular-ui-sortable,angularBootstrap=angular-bootstrap,_=lodash',
      'exports?"ui.dashboard"'
    ]
  });

  // ng-clip
  config.webpack.resolve.alias['ng-clip'] = 'ng-clip/src/ngClip.js';
  config.webpack.module.loaders.push({
    test: /\/ngClip\.js$/,
    loaders: [
      'imports?ZeroClipboard=zeroclipboard',
      'exports?"ngClip"'
    ]
  });

  // angular-ui-grid
  config.webpack.resolve.alias['angular-ui-grid'] = 'angular-ui-grid/ui-grid';
  config.webpack.module.loaders.push({
    test: /\/ui-grid(?:\.min)?\.js$/,
    loaders: [
      'imports?angular',
      'exports?"ui.grid"'
    ]
  });

  // ui-router-extras
  config.webpack.module.loaders.push({
    test: /\/ct-ui-router-extras(?:\.min)?\.js$/,
    loaders: [
      'imports?define=>false&angularUiRouter=angular-ui-router',
      'exports?"ct.ui.router.extras"'
    ]
  });

  // ng-grid
  config.webpack.resolve.alias['ng-grid'] = 'ng-grid/build/ng-grid';
  config.webpack.module.loaders.push({
    test: /\/ng-grid(?:\.min|\.debug)?\.js$/,
    loaders: [
      'imports?angular',
      'exports?"ngGrid"'
    ]
  });
  */

  return config;
};
