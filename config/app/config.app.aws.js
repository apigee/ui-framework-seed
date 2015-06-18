'use strict';

module.exports = function(config, options) {
  if (options.appEnv === 'prod') {
    config.aws.options.params.Bucket = 'mycoolapp.apigee.com';
    config.aws.options.params.region = 'us-east-1';
  } else if (options.appEnv === 'e2e') {
    config.aws.options.params.Bucket = 'mycoolapp.e2e.apigee.net';
    config.aws.options.params.region = 'us-west-2';
  }

  return config;
};
