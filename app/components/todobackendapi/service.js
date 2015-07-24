'use strict';

export default class TodoBackendApiService {
  constructor(TodoBackendApiRestangular, CacheFactory) {
    'ngInject';

    this.TodoBackendApiRestangular = TodoBackendApiRestangular;

    this.cache = CacheFactory('apiCache', {
      maxAge: 15 * 60 * 1000, // 15 minutes
      cacheFlushInterval: 60 * 60 * 1000, // 1 hour
      deleteOnExpire: 'passive'
    });
  }

  getList(useCache) {
    let req = this.TodoBackendApiRestangular
      .all('/');

    if (useCache) {
      req = req.withHttpConfig({ cache: this.cache });
    }

    return req.getList();
  }

  getOne(id) {
    return this.TodoBackendApiRestangular
      .one(id)
      .get();
  }
}

