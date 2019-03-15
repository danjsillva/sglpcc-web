import React, { Component } from 'react'
import Currency from 'react-currency-formatter';

import API from '../../config/api'

import FiltroDetalhes from '../FiltroDetalhes'

export default class Itens extends Component {
  state = {
    material: {},
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
    }
  }

  componentDidMount() {
    this.fetchDetalhes(this.props.match.params.id)
  }
  
  fetchDetalhes = async (materiais_id) => {
    try {
      let material = (await API.post(`/materiais/detalhes/${materiais_id}`, this.state.params)).data
      
      this.setState({ material })
    } catch (error) {
      
    }
  }
  
  handleFiltroFormSubmit = async (params) => {
    this.setState({ params })
    this.fetchDetalhes(this.props.match.params.id)
  }

  render() {
    const { material } = this.state

    return (
      <div>
        <div className="columns">
          <div className="column is-3">
            <FiltroDetalhes showPorcentagemMargem={false} onFiltroFormSubmit={this.handleFiltroFormSubmit} />
          </div>

          <div className="column is-9">
            <h4 className="title is-4">Detalhes do material</h4>

            <span className="title is-6">{material.descricao} ({material.unidade})</span><br />

            <div className="tags" style={{marginTop: 5}}>
              <span className="tag">Material</span>
              <span className="tag">312673872613</span>
              <span className="tag is-success">Sustentável</span>
            </div>

            <div className="box">
              {/* <h5 className="title is-6">{material.descricao}</h5> */}
              Análise dos preços do material nos processos de compras
              <div className="card-content">
                <div className="columns">
                  <div className="column has-text-centered">
                    <span className="title is-6"><i className="fa fa-sort has-text-link"></i> <Currency quantity={material.preco_avg || 0} currency="BRL" /></span><br />
                    Média
                    </div>
                  <div className="column has-text-centered">
                    <span className="title is-6"><i className="fa fa-sort has-text-warning"></i> <Currency quantity={((material.preco_min + material.preco_max) / 2) || 0} currency="BRL" /></span><br />
                    Mediana
                    </div>
                  <div className="column has-text-centered">
                    <span className="title is-6"><i className="fa fa-sort-down has-text-success"></i> <Currency quantity={material.preco_min || 0} currency="BRL" /></span><br />
                    Menor preço
                    </div>
                  <div className="column has-text-centered">
                    <span className="title is-6"><i className="fa fa-sort-up has-text-danger"></i> <Currency quantity={material.preco_max || 0} currency="BRL" /></span><br />
                    Maior preço
                    </div>
                </div>
              </div>

              <footer className="card-footer">
                <p className="card-footer-item has-text-centered">
                  <span>
                    <span className="title is-6"><i className="fa fa-folder has-text-link"></i> {material.total_quantidade}</span><br />
                    Quantidade de processos
                  </span>
                </p>
                <p className="card-footer-item has-text-centered">
                  <span>
                    <span className="title is-6"><i className="fa fa-comments-dollar has-text-link"></i> <Currency quantity={material.total_preco || 0} currency="BRL" /></span><br />
                    Valor total
                  </span>
                </p>
              </footer>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
