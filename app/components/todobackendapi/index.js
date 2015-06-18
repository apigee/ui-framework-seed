'use strict';

import angular from 'angular';
import angularCache from 'angular-cache';
import restangular from 'restangular';

import TodoBackendApiService from './service';

export default angular.module('app.todobackendapi', [
  angularCache,
  restangular
])
  .factory('TodoBackendApiRestangular', /** @ngInject */ function(Restangular, API_BASE_URL) {
    return Restangular.withConfig(function(RestangularConfigurer) {
      RestangularConfigurer.setBaseUrl(API_BASE_URL);
    });
  })
  .service('todoBackendApi', TodoBackendApiService);
