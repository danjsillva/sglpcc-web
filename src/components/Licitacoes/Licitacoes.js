import React, { useState, useEffect } from 'react'

import API from '../../config/api'

import FiltroDetalhes from '../FiltroDetalhes'
import Licitacao from './Licitacao'

export default function Licitacoes(props) {
  const [licitacoes, setLicitacoes] = useState([])
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

  useEffect(() => {
    fetchLicitacoes()
  }, [params])

  const fetchLicitacoes = async () => {
    try {      
      let licitacoes = (await API.post(`/licitacoes`, params)).data

      setLicitacoes(licitacoes)
    } catch (error) {

    }
  }

  const handleFiltroFormSubmit = async (value) => {    
    setParams(value)
  }

  return (
    <div className="columns">
      <div className="column is-3">
        <FiltroDetalhes showPorcentagemMargem={false} onFiltroFormSubmit={handleFiltroFormSubmit} />
      </div>
      <div className="column is-9">
        <button className="button is-small is-pulled-right">
          <i className="fa fa-eye"></i>&nbsp; Mostrar/Ocultar avisos
            </button>
        <h4 className="title">Licitações</h4>

        {licitacoes.map(licitacao => (
          <Licitacao licitacao={licitacao} key={licitacao.id} />
        ))}
      </div>
    </div>
  )
}
