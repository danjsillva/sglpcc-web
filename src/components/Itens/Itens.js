import React, { Component } from 'react'

import API from '../../config/api'
import estados from '../../assets/estados'

import Item from './Item'

export default class Itens extends Component {
  state = {
    itens: [],
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
    },
    porcentagemMargem: 10,
    showAvisos: true,
  }

  componentDidMount() {
    this.fetchItens(this.props.match.params.licitacoes_id)
    this.fetchUnidades()
    this.fetchFornecedores()
  }

  fetchItens = async (licitacoes_id) => {
    try {
      let itens = (await API.get(`/itens/licitacao/${licitacoes_id}`)).data

      this.setState({ itens })
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
    const { itens, showAvisos, porcentagemMargem } = this.state

    return (
      <div>
        <div className="columns">
          <div className="column is-4">
            <div className="box">
              <aside className="menu">
                <span className="menu-label"> Item </span>
                <ul className="menu-list">
                  <li>
                    <div className="field">
                      <label>Descrição:</label>
                      <div className="control">
                        <input type="text" className="input is-smal" />
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="field">
                      <label>Preço:</label>
                      <div className="control">
                        <label className="radio">
                          <input type="radio" name="rsvp" />
                          Todos
                        </label><br />
                        <label className="radio">
                          <input type="radio" name="rsvp" />
                          Apenas itens abaixo da média
                        </label><br />
                        <label className="radio">
                          <input type="radio" name="rsvp" />
                          Apenas itens acima da média
                        </label>
                      </div>
                    </div>
                  </li>
                </ul>

                <br />

                <p>
                  <button type="button" className="button is-info is-fullwidth" onClick={() => this.fetchFornecedores()}>Aplicar filtro</button>
                </p>
              </aside>
            </div>
          </div>

          <div className="column is-8">
            <button className="button is-small is-pulled-right" onClick={() => this.setState({ showAvisos: !showAvisos})}>
              <i className="fa fa-eye"></i>&nbsp; Mostrar/Ocultar avisos
            </button>
            <h4 className="title is-4">Itens da licitação</h4>
            
            {itens.map(item => (
              <Item item={item} showAvisos={showAvisos} porcentagemMargem={porcentagemMargem} key={item.id} />
            ))}
          </div>
        </div>
      </div >
    )
  }
}
