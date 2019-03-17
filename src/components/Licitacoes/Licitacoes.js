import React, { Component } from 'react'

import API from '../../config/api'

import FiltroDetalhes from '../FiltroDetalhes'
import Licitacao from './Licitacao'

export default class Licitacoes extends Component {
  state = {
    licitacoes: [],
    params: {
      margem: 10,
      licitacao: {
        data: ["2019-03-01", "2019-03-05"]
      },
      unidade: {
        id: [],
        uf: []
      },
      fornecedor: {
        id: [],
        uf: []
      }
    },
  }

  componentDidMount() {
    this.fetchLicitacoes()
  }

  fetchLicitacoes = async () => {
    try {
      let licitacoes = (await API.post(`/licitacoes`, this.state.params)).data

      this.setState({ licitacoes })
    } catch (error) {

    }
  }

  handleFiltroFormSubmit = async (params) => {
    await this.setState({ params })
    await this.fetchLicitacoes()
  }

  render() {
    const { licitacoes } = this.state

    return (
      <div>
        <div className="columns">
          <div className="column is-3">
            <FiltroDetalhes showPorcentagemMargem={false} onFiltroFormSubmit={this.handleFiltroFormSubmit} />
          </div>
          <div className="column is-9">
            <button className="button is-small is-pulled-right">
              <i className="fa fa-eye"></i>&nbsp; Mostrar/Ocultar avisos
            </button>
            <h4 className="title">Licitações</h4>

            {licitacoes.map(licitacao => (
              <Licitacao licitacao={licitacao} key={licitacao.id} />
            ))}
          </div>
        </div>
      </div>
    )
  }
}
