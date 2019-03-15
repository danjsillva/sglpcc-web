import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'

import './App.scss';

import Topbar from './Topbar'
import Routes from './Routes'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Topbar /><br />

          <Routes />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;