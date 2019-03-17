import React, { Component } from 'react'
import Select from 'react-select';

import API from '../config/api'
import estados from '../assets/estados'

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
    const { showPorcentagemMargem } = this.props

    return (
      <div className="">
        <h4 className="title is-5 mb-10">Busca e filtros</h4>

        {showPorcentagemMargem && (
          <React.Fragment>
            <div className="field">
              <label>Margem</label>
              <div className="control">
                <input
                  type="text"
                  value={params.margem}
                  onChange={(e) => this.setState({ params: { ...params, margem: e.target.value } })}
                  placeholder="Porcentagem"
                  className="input is-small" />
              </div>
            </div>
          </React.Fragment>
        )}

        <div className="field mb-0">
          <label>Unidades</label>
          <Select
            value={this.state.selectedUnidadeId}
            onChange={this.handleUnidadeIdChange}
            options={this.state.unidades}
            isMulti
            isSearchable
            className="custom-select-container mb-10"
            classNamePrefix="custom-select"
            placeholder="Unidade"
            noOptionsMessage={() => 'Nenhum resultado'}
          />
          <Select
            value={this.state.selectedUnidadeUf}
            onChange={this.handleUnidadeUfChange}
            options={this.state.estados}
            isMulti
            isSearchable
            className="custom-select-container mb-10"
            classNamePrefix="custom-select"
            placeholder="UF"
            noOptionsMessage={() => 'Nenhum resultado'}
          />
        </div>

        <div className="field mb-0">
          <label>Fornecedores</label>
          <Select
            value={this.state.selectedFornecedorId}
            onChange={this.handleFornecedorIdChange}
            options={this.state.fornecedores}
            isMulti
            isSearchable
            className="custom-select-container mb-10"
            classNamePrefix="custom-select"
            placeholder="Fornecedores"
            noOptionsMessage={() => 'Nenhum resultado'}
          />
          <Select
            value={this.state.selectedFornecedorUf}
            onChange={this.handleFornecedorUfChange}
            options={this.state.estados}
            isMulti
            isSearchable
            className="custom-select-container mb-10"
            classNamePrefix="custom-select"
            placeholder="UF"
            noOptionsMessage={() => 'Nenhum resultado'}
          />
        </div>

        <button
          type="button"
          className="button is-link is-fullwidt is-small mt-10"
          onClick={() => this.props.onFiltroFormSubmit(params)}>
          <i className="fa fa-search mr-5"></i> Aplicar filtro
        </button>
      </div>
    )
  }
}
