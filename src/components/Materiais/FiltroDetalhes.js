import React, { Component } from 'react'
import Select from 'react-select';

import API from '../../config/api'
import estados from '../../assets/estados'

export default class FiltroDetalhes extends Component {
  state = {
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
    this.fetchUnidades()
    this.fetchFornecedores()
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
    const { params } = this.state

    return (
      <div className="box">
        <div className="menu">
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
            <button
              type="button"
              className="button is-info is-fullwidth"
              onClick={() => this.props.onFiltroFormSubmit(params)}>
              Aplicar filtro
              </button>
          </p>
        </div>
      </div>
    )
  }
}
