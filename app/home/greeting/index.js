'use strict';

import angular from 'angular';
import angularUiRouter from 'angular-ui-router';

import greetingmessage from 'greetingmessage';

import GreetingCtrl from './controller';
import GreetingTmpl from './template.html';

export default angular.module('app.home.greeting', [
  angularUiRouter,
  greetingmessage.name
])
  .config(function($stateProvider) {
    'ngInject';

    $stateProvider
      .state('home.greeting', {
        url: 'greeting',
        template: GreetingTmpl,
        controller: 'GreetingCtrl as vm',
        ncyBreadcrumb: {
          label: 'Greeting'
        }
      });
  })
  .controller('GreetingCtrl', GreetingCtrl);
