'use strict';

export default class TodosListCtrl {
  /** @ngInject */
  constructor(todoBackendApi, promiseTracker) {
    const todosPromise = todoBackendApi.getList();

    todosPromise.then(todos => {
      this.todos = todos;
    });

    this.tracker = promiseTracker();
    this.tracker.addPromise(todosPromise);
  }
}
