/* global __BUILD_ENV__ */
'use strict';

import React from 'react';
import { Router, Route, Link } from 'react-router';
import { history } from 'react-router/lib/HashHistory';

// actual config import path defined by webpack resolve alias
// import appEnvConfig from 'APP_ENV_CONFIG';
// import packageJson from '../package.json';

import Root from './Root';
import Hello from './Hello';

// import { ReactRouterBootstrap,
  // NavItemLink } from 'react-router-bootstrap';

document.addEventListener('DOMContentLoaded', () => {
  React.render((
    <Router history={history}>
      <Route path='/' component={Root}>
        <Router path="hello" component={Hello}/>
      </Route>
    </Router>
  ), document.body);
});
