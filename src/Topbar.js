import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class Topbar extends Component {
  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <span className="navbar-item">
            <img src="https://bulma.io/images/bulma-logo.png" alt="logo" width="112" height="28" />
          </span>

          <span role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </span>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <NavLink to="/licitacoes" className="navbar-item"> Licitações </NavLink>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <button type="button" className="button is-light"> Log in </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}
