import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class Topbar extends Component {
  render() {
    return (
      <nav className="navbar is-dark" role="navigation" aria-label="main navigation">
        <div className="container">
          <div className="navbar-brand">
            {/* <span className="navbar-item">
              <span className="title has-text-white is-3">
                <i className="fa fa-search-dollar"></i>
              </span>
            </span> */}
            <span className="navbar-item">
              {/* <img src="https://bulma.io/images/bulma-logo.png" alt="logo" width="112" height="28" /> */}
              <span className="title is-6 has-text-white">Sistema de Gestão em Licitações Públicas
                <br />
                <span className="subtitle is-7 has-text-white">com foco no Combate à Corrupção</span>
              </span>
            </span>

            <span role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </span>
          </div>

          <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-start">
              {/* <NavLink to="/licitacoes" className="navbar-item"> Licitações </NavLink> */}
            </div>

            <div className="navbar-end">
              <div className="navbar-item">
                <a href="https://github.com/danjsillva" target="_blank" className="link has-text-white"><i class="fa fa-code"></i> Contribua com o projeto no GitHub</a>
              </div>
            </div>
          </div></div>
      </nav>
    )
  }
}
