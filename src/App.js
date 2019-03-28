import React, { Component } from 'react';
import { HashRouter } from 'react-router-dom'

import './App.scss';

import Topbar from './Topbar'
import Routes from './Routes'

class App extends Component {
  render() {
    return (
      <HashRouter>
        <>
          <Topbar />
          {/* <div className="container"> */}

            <Routes />
          {/* </div> */}
        </>
      </HashRouter>
    );
  }
}

export default App;