import React, { Component } from 'react'

import API from '../../config/api'

import FiltroDetalhes from '../FiltroDetalhes'
import Licitacao from './../Licitacoes/Licitacao'
import Item from './Item'

export default class Itens extends Component {
  state = {
    licitacao: {},
    itens: [],
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
    showAvisos: true,
  }

  componentDidMount() {
    this.fetchLicitacao(this.props.match.params.licitacoes_id)
    this.fetchItens(this.props.match.params.licitacoes_id)
  }

  fetchLicitacao = async (licitacoes_id) => {
    try {
      let licitacao = (await API.post(`/licitacoes/${licitacoes_id}`, this.state.params)).data

      this.setState({ licitacao })
    } catch (error) {

    }
  }

  fetchItens = async (licitacoes_id) => {
    try {
      let itens = (await API.post(`/licitacoes/itens/${licitacoes_id}`, this.state.params)).data

      this.setState({ itens })
    } catch (error) {

    }
  }

  handleFiltroFormSubmit = async (params) => {
    await this.setState({ params })
    await this.fetchItens(this.props.match.params.licitacoes_id)
  }

  render() {
    const { licitacao, itens, showAvisos, params } = this.state

    return (
      <div>
        <div className="columns">
          <div className="column is-3">
            <FiltroDetalhes showPorcentagemMargem={true} onFiltroFormSubmit={this.handleFiltroFormSubmit} />
          </div>

          <div className="column is-9">
            <button className="button is-small is-pulled-right" onClick={() => this.setState({ showAvisos: !showAvisos })}>
              <i className="fa fa-eye"></i>&nbsp; Mostrar/Ocultar avisos
            </button>
            <h4 className="title">Licitação</h4>

            <Licitacao licitacao={licitacao} />

            <h4 className="title is-5">Itens da licitação</h4>

            {itens.map(item => (
              <Item item={item} showAvisos={showAvisos} porcentagemMargem={params.margem} key={item.id} />
            ))}
          </div>
        </div>
      </div >
    )
  }
}
