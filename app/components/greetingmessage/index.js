'use strict';

import angular from 'angular';
import angularBootstrap from 'angular-bootstrap';

import GreetingMessageCtrl from './controller';
import GreetingMessageTmpl from './template.html';

export default angular.module('app.greetingmessage', [
  angularBootstrap
])
  .directive('greetingMessage', function() {
    return {
      restrict: 'E',
      scope: {},
      bindToController: {
        subject: '@'
      },
      template: GreetingMessageTmpl,
      controller: 'GreetingMessageCtrl as vm'
    };
  })
  .controller('GreetingMessageCtrl', GreetingMessageCtrl);
