'use strict';

import Promise from 'bluebird';

export default class TodosListCtrl {
  /** @ngInject */
  constructor(promiseTracker, todoBackendApi, todoId) {
    this.todoId = todoId;

    const todoPromise = Promise.delay(todoBackendApi.getOne(todoId), 500);

    todoPromise.then(todo => {
      this.todo = todo;
    });

    this.tracker = promiseTracker();
    this.tracker.addPromise(todoPromise);
  }
}
