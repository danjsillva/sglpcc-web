import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import API from '../../config/api'

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
        Licitacoes

        <div className="columns">
          <div className="column is-2">Filtros</div>
          <div className="column is-10">
            <ul>
              {licitacoes.map(licitacao => (
                <li key={licitacao.id}>
                  <Link to={`/itens/${licitacao.id}`}>
                    {licitacao.objeto}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
