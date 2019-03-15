import React, { Component } from 'react'

import API from '../../config/api'

import FiltroDetalhes from '../Materiais/FiltroDetalhes'
import Item from './Item'

export default class Itens extends Component {
  state = {
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
    this.fetchItens(this.props.match.params.licitacoes_id)
  }

  fetchItens = async (licitacoes_id) => {
    try {
      let itens = (await API.post(`/itens/licitacao/${licitacoes_id}`, this.state.params)).data

      this.setState({ itens })
    } catch (error) {

    }
  }

  handleFiltroFormSubmit = async (params) => {
    this.setState({ params })
    this.fetchItens(this.props.match.params.licitacoes_id)
  }

  render() {
    const { itens, showAvisos, params } = this.state

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
            <h4 className="title is-4">Itens da licitação</h4>

            {itens.map(item => (
              <Item item={item} showAvisos={showAvisos} porcentagemMargem={params.margem} key={item.id} />
            ))}
          </div>
        </div>
      </div >
    )
  }
}
