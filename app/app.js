/* global __BUILD_ENV__ */
'use strict';

// actual config import path defined by webpack resolve alias
import appEnvConfig from 'APP_ENV_CONFIG';
import packageJson from '../package.json';

import $ from 'jquery';

$(function() {
  console.log(`${packageJson.name} ${packageJson.version}`);
});
