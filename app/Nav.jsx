'use strict';

import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Nav extends Component {
  render() {
    return (
      <nav className="navbar navbar-default navbar-static-top" role="navigation">
          <div className="container-fluid">
              <div className="navbar-header navbar-header-apigee">
                  <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar">
                      <span className="sr-only">Toggle navigation</span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                  </button>
                  <a className="navbar-brand navbar-brand-apigee"><span className="text-hide">Apigee</span>&#8203;<span className="navbar-brand-text">UI Framework Seed</span></a>
              </div>

              <div className="collapse navbar-collapse" id="navbar">
                  <ul className="nav navbar-nav">
                      <li><Link to="/hello">Hello</Link></li>
                  </ul>
              </div>
          </div>
      </nav>
    );
  }
}
