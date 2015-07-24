'use strict';

export default class TodosListCtrl {
  constructor(todoBackendApi, promiseTracker) {
    'ngInject';

    const todosPromise = todoBackendApi.getList();

    todosPromise.then(todos => {
      this.todos = todos;
    });

    this.tracker = promiseTracker();
    this.tracker.addPromise(todosPromise);
  }
}
