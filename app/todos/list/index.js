'use strict';

import angular from 'angular';
import angularUiRouter from 'angular-ui-router';
import angularPromiseTracker from 'angular-promise-tracker';

import todobackendapi from 'todobackendapi';

import TodosListCtrl from './controller';
import TodosListTmpl from './template.html';

export default angular.module('app.todos.list', [
  angularUiRouter,
  angularPromiseTracker,
  todobackendapi.name
])
  .config(/** @ngInject */ function($stateProvider) {
    $stateProvider
      .state('todos.list', {
        url: '',
        template: TodosListTmpl,
        controller: 'TodosListCtrl as vm',
        ncyBreadcrumb: {
          label: 'Todos'
        }
      });
  })
  .controller('TodosListCtrl', TodosListCtrl);
