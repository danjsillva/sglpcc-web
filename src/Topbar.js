import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class Topbar extends Component {
  render() {
    return (
      <nav className="navbar is-fixed-top is-link" role="navigation" aria-label="main navigation">
        <div className="container">
          <div className="navbar-brand">
            {/* <span className="navbar-item">
              <span className="title has-text-white is-3">
                <i className="fa fa-chart-pie has-text-grey-light"></i>
              </span>
            </span> */}
            {/* <span className="navbar-item">
              <NavLink to="/licitacoes">
                <div className="title is-6 has-text-white mb-0">Sistema de Gestão em Licitações Públicas</div>
                <span className="subtitle is-7 has-text-grey-light">com foco no Combate à Corrupção</span>
              </NavLink>
            </span> */}
            <span className="navbar-item">
              <NavLink to="/" className="link has-text-white">Home</NavLink>
            </span>
            <span className="navbar-item">
              <NavLink to="/licitacoes" className="link has-text-white">Licitações</NavLink>
            </span>
            <span className="navbar-item">
              <NavLink to="/materiais" className="link has-text-white">Materiais</NavLink>
            </span>
            <span className="navbar-item">
              <NavLink to="/servicos" className="link has-text-white">Serviços</NavLink>
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
                {/* <a href="https://github.com/danjsillva" target="blank" className="link has-text-white"><i className="fa fa-code mr-5"></i> Contribua com o projeto no GitHub</a> */}
                <NavLink to="/sobre" className="button is-link is-inverted is-outlined is-rounded is-small">Sobre o projeto</NavLink>
              </div>
            </div>
          </div></div>
      </nav>
    )
  }
}
