import React, { Component } from 'react'

import API from '../../config/api'

import Licitacao from './Licitacao'

export default class Licitacoes extends Component {
  state = {
    licitacoes: []
  }

  componentDidMount() {
    this.fetchLicitacoes()
  }

  fetchLicitacoes = async () => {
    try {
      let licitacoes = (await API.get(`/licitacoes/0/0/0`)).data

      this.setState({ licitacoes })
    } catch (error) {

    }
  }

  render() {
    const { licitacoes } = this.state

    return (
      <div>
        <div className="columns">
          <div className="column is-3">Filtros</div>
          <div className="column is-9">
            <button className="button is-small is-pulled-right">
              <i className="fa fa-eye"></i>&nbsp; Mostrar/Ocultar avisos
            </button>
            <h4 className="title is-4">Licitações</h4>

            {licitacoes.map(licitacao => (
              <Licitacao licitacao={licitacao} key={licitacao.id} />
            ))}
          </div>
        </div>
      </div>
    )
  }
}
