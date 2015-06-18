'use strict';

import angular from 'angular';
import angularUiRouter from 'angular-ui-router';
import angularPromiseTracker from 'angular-promise-tracker';

import auispinneroverlay from 'ui-framework-directives/auispinneroverlay';
import auistatus from 'ui-framework-directives/auistatus';

import todobackendapi from 'todobackendapi';

import TodoCtrl from './controller';
import TodoTmpl from './template.html';

export default angular.module('app.todos.todo', [
  angularUiRouter,
  angularPromiseTracker,
  auispinneroverlay.name,
  auistatus.name,
  todobackendapi.name
])
  .config(/** @ngInject */ function($stateProvider) {
    $stateProvider
      .state('todos.todo', {
        url: '/{todoId}',
        template: TodoTmpl,
        resolve: {
          todoId: /** @ngInject */ function($stateParams) {
            return $stateParams.todoId;
          }
        },
        controller: 'TodoCtrl as vm',
        ncyBreadcrumb: {
          label: '{{ vm.todoId }}',
          parent: 'todos.list'
        }
      });
  })
  .controller('TodoCtrl', TodoCtrl);
