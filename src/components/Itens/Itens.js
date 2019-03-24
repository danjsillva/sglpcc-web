import React, { useState, useEffect } from 'react'

import API from '../../config/api'

import FiltroDetalhes from '../FiltroDetalhes'
import Licitacao from './../Licitacoes/Licitacao'
import Item from './Item'

export default function Itens(props) {
  const [licitacao, setLicitacao] = useState({})
  const [itens, setItens] = useState([])
  const [params, setParams] = useState({
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
  })
  const [showAvisos, setShowAvisos] = useState(true)

  useEffect(() => {    
    fetchLicitacao(props.match.params.licitacoes_id)
    fetchItens(props.match.params.licitacoes_id)
  }, [params])

  const fetchLicitacao = async (licitacoes_id) => {
    try {
      let licitacao = (await API.post(`/licitacoes/${licitacoes_id}`, params)).data

      setLicitacao(licitacao)
    } catch (error) {

    }
  }

  const fetchItens = async (licitacoes_id) => {
    try {
      let itens = (await API.post(`/licitacoes/itens/${licitacoes_id}`, params)).data

      setItens(itens)
    } catch (error) {

    }
  }

  const handleFiltroFormSubmit = (params) => {
    setParams(params)
  }

  return (
    <div className="columns">
      <div className="column is-3">
        <FiltroDetalhes showPorcentagemMargem={true} onFiltroFormSubmit={handleFiltroFormSubmit} />
      </div>

      <div className="column is-9">
        <button className="button is-small is-pulled-right" onClick={() => setShowAvisos(!showAvisos)}>
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
  )
}
