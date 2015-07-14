'use strict';

import React, { Component } from 'react';

import Nav from './Nav';

export default class Root extends Component {
  render() {
    return (
      <div>
        <Nav/>
        <div className="container-fluid">
          {this.props.children}
        </div>
      </div>
    );
  }
}
