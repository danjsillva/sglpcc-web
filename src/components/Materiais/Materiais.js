import React, { Component } from 'react'
import Select from 'react-select';
import Currency from 'react-currency-formatter';

import API from '../../config/api'
import estados from '../../assets/estados'

export default class Itens extends Component {
  state = {
    detalhes: {},
    estados: estados,
    unidades: [],
    fornecedores: [],
    selectedLicitacaoData: [],
    selectedUnidadeId: [],
    selectedUnidadeUf: [],
    selectedFornecedorId: [],
    selectedFornecedorUf: [],
    params: {
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
    this.fetchUnidades()
    this.fetchFornecedores()
  }

  fetchDetalhes = async (materiais_id) => {
    try {
      let detalhes = (await API.post(`/materiais/detalhes/${materiais_id}`, this.state.params)).data

      this.setState({ detalhes })
    } catch (error) {

    }
  }

  fetchUnidades = async () => {
    try {
      let unidades = (await API.get(`/unidades/0/0/0`)).data
      unidades = unidades.map(unidade => ({ value: unidade.id, label: unidade.nome }))

      this.setState({ unidades })
    } catch (error) {

    }
  }

  fetchFornecedores = async () => {
    try {
      let fornecedores = (await API.get(`/fornecedores/0/0/0`)).data
      fornecedores = fornecedores.map(fornecedor => ({ value: fornecedor.id, label: fornecedor.nome }))

      this.setState({ fornecedores })
    } catch (error) {

    }
  }

  handleUnidadeIdChange = async (value) => {
    let params = { ...this.state.params }
    params.unidade.id = value.map(elem => elem.value)

    this.setState({ selectedUnidadeId: value, params })
  }

  handleUnidadeUfChange = async (value) => {
    let params = { ...this.state.params }
    params.unidade.uf = value.map(elem => elem.value)

    this.setState({ selectedUnidadeUf: value, params })
  }

  handleFornecedorIdChange = async (value) => {
    let params = { ...this.state.params }
    params.fornecedor.id = value.map(elem => elem.value)

    this.setState({ selectedFornecedorId: value, params })
  }

  handleFornecedorUfChange = async (value) => {
    let params = { ...this.state.params }
    params.fornecedor.uf = value.map(elem => elem.value)

    this.setState({ selectedFornecedorUf: value, params })
  }

  render() {
    const { detalhes } = this.state

    return (
      <div>
        <div className="columns">
          <div className="column is-4">
            <div className="box">
              <aside className="menu">
                <span className="menu-label">Licitação</span>
                <ul className="menu-list">
                  <li>
                    <div className="field">
                      <label>Período:</label>
                      <div className="control">
                        <input type="text" className="input is-smal" />
                      </div>
                    </div>
                  </li>
                </ul>
                <br />
                <span className="menu-label">Unidade</span>
                <ul className="menu-list">
                  <li>
                    <div className="field">
                      <label>Unidade:</label>
                      <Select
                        value={this.state.selectedUnidadeId}
                        onChange={this.handleUnidadeIdChange}
                        options={this.state.unidades}
                        isMulti
                        isSearchable
                      />
                    </div>
                  </li>
                  <li>
                    <div className="field">
                      <label>UF:</label>
                      <Select
                        value={this.state.selectedUnidadeUf}
                        onChange={this.handleUnidadeUfChange}
                        options={this.state.estados}
                        isMulti
                        isSearchable
                      />
                    </div>
                  </li>
                </ul>
                <br />
                <span className="menu-label"> Fornecedor </span>
                <ul className="menu-list">
                  <li>
                    <div className="field">
                      <label>Razão social:</label>
                      <Select
                        value={this.state.selectedFornecedorId}
                        onChange={this.handleFornecedorIdChange}
                        options={this.state.fornecedores}
                        isMulti
                        isSearchable
                      />
                    </div>
                  </li>
                  <li>
                    <div className="field">
                      <label>UF:</label>
                      <Select
                        value={this.state.selectedFornecedorUf}
                        onChange={this.handleFornecedorUfChange}
                        options={this.state.estados}
                        isMulti
                        isSearchable
                      />
                    </div>
                  </li>
                </ul>

                <br />

                <p>
                  <button type="button" className="button is-info is-fullwidth" onClick={() => this.fetchDetalhes(this.props.match.params.id)}>Aplicar filtro</button>
                </p>
              </aside>
            </div>
          </div>

          <div className="column is-8">
            <h4 className="title is-4">Detalhes do material</h4>

            <span className="title is-6">{detalhes.descricao} ({detalhes.unidade})</span><br />

            <div className="tags">
              <span className="tag">Material</span>
              <span className="tag">312673872613</span>
              <span className="tag is-success">Sustentável</span>
            </div>





            <div className="box">
              {/* <h5 className="title is-6">{detalhes.descricao}</h5> */}
              Análise dos preços do material nos processos de compras
              <div className="card-content">
                <div className="columns">
                  <div className="column has-text-centered">
                    <span className="title is-6"><i className="fa fa-sort has-text-info"></i> <Currency quantity={detalhes.preco_avg} currency="BRL" /></span><br />
                    Média
                    </div>
                  <div className="column has-text-centered">
                    <span className="title is-6"><i className="fa fa-sort has-text-warning"></i> <Currency quantity={(detalhes.preco_min + detalhes.preco_max) / 2} currency="BRL" /></span><br />
                    Mediana
                    </div>
                  <div className="column has-text-centered">
                    <span className="title is-6"><i className="fa fa-sort-down has-text-success"></i> <Currency quantity={detalhes.preco_min} currency="BRL" /></span><br />
                    Menor preço
                    </div>
                  <div className="column has-text-centered">
                    <span className="title is-6"><i className="fa fa-sort-up has-text-danger"></i> <Currency quantity={detalhes.preco_max} currency="BRL" /></span><br />
                    Maior preço
                    </div>
                </div>
              </div>

              <footer className="card-footer">
                <p className="card-footer-item has-text-centered">
                  <span>
                    <h5 className="title is-6"><i className="fa fa-folder has-text-info"></i> {detalhes.total_quantidade}</h5>
                    Quantidade de processos
                  </span>
                </p>
                <p className="card-footer-item has-text-centered">
                  <span>
                    <h5 className="title is-6"><i className="fa fa-comments-dollar has-text-info"></i> <Currency quantity={detalhes.total_preco} currency="BRL" /></h5>
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
