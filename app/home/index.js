'use strict';

import angular from 'angular';
import angularUiRouter from 'angular-ui-router';

import HomeTmpl from './template.html';

import welcome from './welcome';
import greeting from './greeting';

export default angular.module('app.home', [
  angularUiRouter,
  welcome.name,
  greeting.name
])
  .config(/** @ngInject */ function($stateProvider) {
    $stateProvider
      .state('home', {
        abstract: true,
        url: '/',
        template: HomeTmpl,
        ncyBreadcrumb: {
          label: 'Home'
        }
      });
  });
