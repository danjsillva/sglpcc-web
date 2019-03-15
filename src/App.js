import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'

import './App.scss';

import Topbar from './Topbar'
import Routes from './Routes'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Topbar /><br />
          <div className="container">

            <Routes />
          </div>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;