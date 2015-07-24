'use strict';

import Promise from 'bluebird';

export default class TodosListCtrl {
  constructor(promiseTracker, todoBackendApi, todoId) {
    'ngInject';

    this.todoId = todoId;

    const todoPromise = Promise.delay(todoBackendApi.getOne(todoId), 500);

    todoPromise.then(todo => {
      this.todo = todo;
    });

    this.tracker = promiseTracker();
    this.tracker.addPromise(todoPromise);
  }
}
