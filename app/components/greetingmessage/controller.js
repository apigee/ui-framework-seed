'use strict';

import _ from 'lodash';

export default class GreetingMessageCtrl {
  constructor() {
    'ngInject';
    this.greetings = ['Hello', 'Greetings', 'Hola', 'Привет'];
  }

  greeting() {
    return _.sample(this.greetings);
  }
}
