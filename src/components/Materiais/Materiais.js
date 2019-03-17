import React, { Component } from 'react'
import { ResponsiveContainer, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import Currency from 'react-currency-formatter'

import API from '../../config/api'

import FiltroDetalhes from '../FiltroDetalhes'

export default class Itens extends Component {
  state = {
    material: {},
    data_chart: {},
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
    this.fetchMaterial(this.props.match.params.id)
  }

  fetchMaterial = async (materiais_id) => {
    try {
      let material = (await API.post(`/materiais/detalhes/${materiais_id}`, this.state.params)).data

      let data_chart = [{
        // name: 'Teste',
        avg1: material.preco_avg,
        avg2: (material.preco_min + material.preco_max) / 2,
        min: material.preco_min,
        max: material.preco_max
      }]

      this.setState({ material, data_chart })
    } catch (error) {

    }
  }

  handleFiltroFormSubmit = async (params) => {
    await this.setState({ params })
    await this.fetchMaterial(this.props.match.params.id)
  }

  render() {
    const { material, data_chart } = this.state

    return (
      <div>
        <div className="columns">
          <div className="column is-3">
            <FiltroDetalhes showPorcentagemMargem={false} onFiltroFormSubmit={this.handleFiltroFormSubmit} />
          </div>

          <div className="column is-9">
            <h4 className="title">Análise de preços do material</h4>

            <span className="title is-6">{material.descricao} ({material.unidade})</span><br />

            <div className="tags" style={{ marginTop: 5 }}>
              <span className="tag is-rounded">Material</span>
              <span className="tag is-rounded">312673872613</span>
              <span className="tag is-rounded is-success">Sustentável</span>
            </div>

            <article class="message is-smal">
              <div class="message-header">
                <small>Análise de preços nos processos de compras</small>
              </div>
              <div class="message-body">
                <div className="columns mt-5 mb-0">
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
            </article>



            <div class="columns">
              <div class="column">
                <article class="message is-smal">
                  <div class="message-header">
                    <small>Processos de compras</small>
                  </div>
                  <div class="message-body">
                    <div className="columns mt-5 mb-0">
                      <div className="column has-text-centered">
                        <span className="title is-6"><i className="fa fa-folder has-text-link"></i> {material.total_quantidade}</span><br />
                        Quantidade
                      </div>
                      <div className="column has-text-centered">
                        <span className="title is-6"><i className="fa fa-comments-dollar has-text-link"></i> <Currency quantity={material.total_preco || 0} currency="BRL" /></span><br />
                        Valor total
                      </div>
                    </div>
                  </div>
                </article>
              </div>

              <div class="column">
                <article class="message is-smal">
                  <div class="message-header">
                    <small>Valores em gráfico</small>
                  </div>
                  <div class="message-body">
                    <ResponsiveContainer width='100%' aspect={4.0 / 2.5}>
                      <BarChart data={data_chart} barGap={10} margin={{
                        top: 0, right: 0, left: 0, bottom: 0,
                      }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="avg1" name="Média" barSize={50} fill="hsl(217, 71%, 53%)" />
                        <Bar dataKey="avg2" name="Mediana" barSize={50} fill="hsl(48, 100%, 67%)" />
                        <Bar dataKey="min" name="Menor preço" barSize={50} fill="hsl(141, 71%, 48%)" />
                        <Bar dataKey="max" name="Maior preço" barSize={50} fill="hsl(348, 100%, 61%)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </article>

              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
