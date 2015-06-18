'use strict';

import angular from 'angular';
import angularUiRouter from 'angular-ui-router';

import WelcomeTmpl from './template.html';

export default angular.module('app.home.welcome', [
  angularUiRouter
])
  .config(/** @ngInject */ function($stateProvider) {
    $stateProvider
      .state('home.welcome', {
        url: '',
        template: WelcomeTmpl,
        ncyBreadcrumb: {
          label: 'Welcome'
        }
      });
  });
