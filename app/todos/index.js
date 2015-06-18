'use strict';

import angular from 'angular';
import angularUiRouter from 'angular-ui-router';

import list from './list';
import todo from './todo';

export default angular.module('app.todos', [
  angularUiRouter,
  list.name,
  todo.name
])
  .config(/** @ngInject */ function($stateProvider) {
    $stateProvider
      .state('todos', {
        abstract: true,
        url: '/todos',
        template: '<ui-view></ui-view>',
        ncyBreadcrumb: {
          skip: true
        }
      });
  });
