import React, { useState, useEffect } from 'react'
import Select from 'react-select';

import API from '../config/api'
import estadosData from '../assets/estados'

export default function FiltroDetalhes(props) {
  const [estados, setEstados] = useState(estadosData)
  const [unidades, setUnidades] = useState([])
  const [fornecedores, setFornecedores] = useState([])
  const [selectedUnidadeId, setSelectedUnidadeId] = useState([])
  const [selectedUnidadeUf, setSelectedUnidadeUf] = useState([])
  const [selectedFornecedorId, setSelectedFornecedorId] = useState([])
  const [selectedFornecedorUf, setSelectedFornecedorUf] = useState([])
  const [params, setParams] = useState({
    margem: 10,
    licitacao: {
      numero: 0,
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
  })

  useEffect(() => {
    fetchUnidades()
    fetchFornecedores()
  }, [])

  const fetchUnidades = async () => {
    try {
      let unidades = (await API.get(`/unidades/0/0/0`)).data
      unidades = unidades.map(unidade => ({ value: unidade.id, label: unidade.nome }))

      setUnidades(unidades)
    } catch (error) {

    }
  }

  const fetchFornecedores = async () => {
    try {
      let fornecedores = (await API.get(`/fornecedores/0/0/0`)).data
      fornecedores = fornecedores.map(fornecedor => ({ value: fornecedor.id, label: fornecedor.nome }))

      setFornecedores(fornecedores)
    } catch (error) {

    }
  }

  const handleUnidadeIdChange = (value) => {
    let newParams = { ...params }
    newParams.unidade.id = value.map(elem => elem.value)

    setSelectedUnidadeId(value)
    setParams(newParams)
  }

  const handleUnidadeUfChange = (value) => {
    let newParams = { ...params }
    newParams.unidade.uf = value.map(elem => elem.value)

    setSelectedUnidadeUf(value)
    setParams(newParams)
  }

  const handleFornecedorIdChange = (value) => {
    let newParams = { ...params }
    newParams.fornecedor.id = value.map(elem => elem.value)

    setSelectedFornecedorId(value)
    setParams(newParams)
  }

  const handleFornecedorUfChange = (value) => {
    let newParams = { ...params }
    newParams.fornecedor.uf = value.map(elem => elem.value)

    setSelectedFornecedorUf(value)
    setParams(newParams)
  }

  return (
    <>
      <h4 className="title is-5 mb-10">Busca e filtros</h4>

      {props.showPorcentagemMargem && (
        <div className="field">
          <label>Margem</label>
          <div className="control">
            <input
              type="text"
              value={params.margem}
              onChange={(e) => setParams({ ...params, margem: e.target.value })}
              placeholder="Porcentagem"
              className="input is-small" />
          </div>
        </div>
      )}

      {props.showLicitacaoNumero && (
        <div className="field">
          <label>Processo ou identificador</label>
          <div className="control">
            <input
              type="text"
              value={params.licitacao.numero}
              onChange={(e) => setParams({ ...params, licitacao: { ...params.licitacao, numero: e.target.value} })}
              placeholder="Porcentagem"
              className="input is-small" />
          </div>
        </div>
      )}

      {props.showLicitacaoData && (
        <div className="field">
          <label>Período</label>
          <div className="control">
            <input
              type="text"
              value={params.licitacao.data}
              onChange={(e) => setParams({ ...params, licitacao: { ...params.licitacao, data: e.target.value} })}
              placeholder="Porcentagem"
              className="input is-small" />
          </div>
        </div>
      )}

      <div className="field mb-0">
        <label>Unidades</label>
        <Select
          value={selectedUnidadeId}
          onChange={handleUnidadeIdChange}
          options={unidades}
          isMulti
          isSearchable
          className="custom-select-container mb-10"
          classNamePrefix="custom-select"
          placeholder="Unidade"
          noOptionsMessage={() => 'Nenhum resultado'}
        />
        <Select
          value={selectedUnidadeUf}
          onChange={handleUnidadeUfChange}
          options={estados}
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
          value={selectedFornecedorId}
          onChange={handleFornecedorIdChange}
          options={fornecedores}
          isMulti
          isSearchable
          className="custom-select-container mb-10"
          classNamePrefix="custom-select"
          placeholder="Fornecedores"
          noOptionsMessage={() => 'Nenhum resultado'}
        />
        <Select
          value={selectedFornecedorUf}
          onChange={handleFornecedorUfChange}
          options={estados}
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
        className="button is-link is-fullwidt is-small mt-10 pl-15 pr-15"
        onClick={() => props.onFiltroFormSubmit(params)}>
        <i className="fa fa-search mr-5"></i> Aplicar filtro
        </button>
    </>
  )
}
