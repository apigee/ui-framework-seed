/* global __BUILD_ENV__ __GIT_REV__ */
'use strict';

// actual config import path defined by webpack resolve alias
import appEnvConfig from 'APP_ENV_CONFIG';

import angular from 'angular';
import angularBootstrap from 'angular-bootstrap';
import angularBreadcrumb from 'angular-breadcrumb';
import angularUiRouter from 'angular-ui-router';
import restangular from 'restangular';

import packageJson from '../package.json';

import auialerts from 'ui-framework-directives/auialerts';

import home from './home';
import todos from './todos';

export default angular.module('app', [
  angularBootstrap,
  angularBreadcrumb,
  angularUiRouter,
  restangular,
  auialerts.name,
  home.name,
  todos.name
])
  .constant('APP_NAME', 'UI Framework Seed')
  .constant('APP_VERSION', packageJson.version)
  .constant('GIT_REV', __GIT_REV__)
  .config(function($provide) {
    'ngInject';

    const appEnvConstants = [
      'API_BASE_URL'
    ];

    appEnvConstants.forEach(key => $provide.value(key, appEnvConfig[key]));
  })
  .config(function($urlRouterProvider) {
    'ngInject';
    $urlRouterProvider.otherwise('/');
  })
  .config(function($breadcrumbProvider) {
    'ngInject';
    $breadcrumbProvider.setOptions({
      includeAbstract: true
    });
  })
  .config(function($compileProvider, $httpProvider) {
    'ngInject';

    if (__BUILD_ENV__ === 'production') {
      $compileProvider.debugInfoEnabled(false);
    }

    $httpProvider.useApplyAsync(true);
  })
  .run(function($rootScope, $breadcrumb, Restangular, APP_NAME, APP_VERSION, GIT_REV, auiAlerts) {
    'ngInject';

    console.log(`${APP_NAME} ${APP_VERSION}-${GIT_REV}`);

    $rootScope.APP_NAME = APP_NAME;

    // Error alerts
    Restangular.setErrorInterceptor(function(response, promise) {
      if (response.status !== 0) {
        auiAlerts.add({
          type: 'danger',
          msg: 'Backend error: ' +
            response.config.method + ' ' +
            response.config.url + ' ' +
            response.status + ': ' +
            response.data
        });
      }

      return true;
    });
  });
