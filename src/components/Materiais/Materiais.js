import React, { useState, useEffect } from 'react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import Currency from 'react-currency-formatter'

import API from '../../config/api'

import FiltroDetalhes from '../FiltroDetalhes'

export default function Itens(props) {
  const [material, setMaterial] = useState({})
  const [dataChart, setDataChart] = useState({})
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
    fetchMaterial(props.match.params.id)
  }, [])

  async function fetchMaterial(materiais_id) {
    try {
      let material = (await API.post(`/materiais/detalhes/${materiais_id}`, params)).data

      let dataChart = [{
        avg1: material.preco_avg,
        avg2: (material.preco_min + material.preco_max) / 2,
        min: material.preco_min,
        max: material.preco_max
      }]

      setMaterial(material)
      setDataChart(dataChart)
    } catch (error) {

    }
  }

  async function handleFiltroFormSubmit(params) {
    await setParams(params)
    await fetchMaterial(props.match.params.id)
  }

  return (
    <div className="container mt-25">
      <div className="columns">
        <div className="column is-3">
          <FiltroDetalhes showPorcentagemMargem={false} onFiltroFormSubmit={handleFiltroFormSubmit} />
        </div>

        <div className="column is-9">
          <h4 className="title">Análise de preços do material</h4>

          <span className="title is-6">{material.descricao} ({material.unidade})</span><br />

          <div className="tags" style={{ marginTop: 5 }}>
            <span className="tag is-rounded">Material</span>
            <span className="tag is-rounded">312673872613</span>
            <span className="tag is-rounded is-success">Sustentável</span>
          </div>

          <article className="message is-link is-smal">
            <div className="message-header">
              <small>Análise de preços nos processos de compras</small>
            </div>
            <div className="message-body">
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

          <div className="columns">
            <div className="column">
              <article className="message is-link is-smal">
                <div className="message-header">
                  <small>Processos de compra</small>
                </div>
                <div className="message-body">
                  <div className="column has-text-centered">
                    <span className="title is-6"><i className="fa fa-folder has-text-link"></i> {material.total_processos}</span><br />
                    Processos de compra
                    </div>
                  <div className="columns mt-5 mb-0">
                    <div className="column has-text-centered">
                      <span className="title is-6"><i className="fa fa-th has-text-link"></i> {material.total_quantidade || 0}</span><br />
                      Quantidade total
                      </div>
                    <div className="column has-text-centered">
                      <span className="title is-6"><i className="fa fa-comments-dollar has-text-link"></i> <Currency quantity={material.total_preco || 0} currency="BRL" /></span><br />
                      Valor total
                      </div>
                  </div>
                </div>
              </article>
            </div>

            <div className="column">
              <article className="message is-link is-smal">
                <div className="message-header">
                  <small>Valores em gráfico</small>
                </div>
                <div className="message-body">
                  <ResponsiveContainer width='100%' aspect={4.0 / 2.5}>
                    <BarChart data={dataChart} barGap={10} margin={{
                      top: 0, right: 0, left: 0, bottom: 0,
                    }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="avg1" name="Média" barSize={30} fill="hsl(217, 71%, 53%)" />
                      <Bar dataKey="avg2" name="Mediana" barSize={30} fill="hsl(48, 100%, 67%)" />
                      <Bar dataKey="min" name="Menor preço" barSize={30} fill="hsl(141, 71%, 48%)" />
                      <Bar dataKey="max" name="Maior preço" barSize={30} fill="hsl(348, 100%, 61%)" />
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
