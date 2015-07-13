'use strict';

module.exports = function(config, options) {
  config.aws = {
    sync: false,

    // gulp-awspublish-router
    router: {
      cache: {
        cacheTime: 31536000 // 1 year by default
      },
      routes: {
        '^index\.html$': {
          gzip: true,
          cacheTime: 0
        },
        '\\.(?:js|css|svg|ttf|eot)': {
          gzip: true
        },
        '^.+$': {}
      }
    },

    // gulp-awspublish
    options: {
      params: {}
    },
    headers: {}
  };
};
