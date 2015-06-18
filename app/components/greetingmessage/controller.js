'use strict';

import _ from 'lodash';

export default class GreetingMessageCtrl {
  /** @ngInject */
  constructor() {
    this.greetings = ['Hello', 'Greetings', 'Hola', 'Привет'];
  }

  greeting() {
    return _.sample(this.greetings);
  }
}
