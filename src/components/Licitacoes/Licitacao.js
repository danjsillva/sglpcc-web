import React from 'react'
import { Link } from 'react-router-dom'
import Currency from 'react-currency-formatter'
import classNames from 'classnames'

export default function Licitacao(props) {
  const { licitacao } = props

  return (
    <article className="custom-list-item">
      {/* <span className="is-pulled-right">{licitacao.data.slice(0, 10)}</span> */}
      <Link to={'/licitacoes/' + licitacao.id} className="link has-text-dark">
        <div className="title is-6">{licitacao.processo || ''}</div>
      </Link >
      <div className="subtitle is-7 mb-0">{licitacao.data ? licitacao.data.slice(0, 10) : ''}</div>
      <div className=""><strong>{licitacao.unidade ? licitacao.unidade.nome : ''}</strong></div>
      {licitacao.objeto}

      <div className="columns mt-5 mb-0">
        <div className="column has-text-centered">
          <span className="title is-6">
            <i className={classNames("fa", { 'fa-thumbs-up has-text-success': true })}></i> <Currency quantity={licitacao.itens ? licitacao.itens.reduce((a, b) => a + b.preco, 0) : 0} currency="BRL" />
          </span>
          <br />
          Valor total da licitação
            </div>
        <div className="column has-text-centered">
          <span className="title is-6">
            <i className="fa fa-th has-text-link"></i> {licitacao.itens ? licitacao.itens.length : 0}
          </span>
          <br />
          Quantidade de itens
            </div>
      </div>
    </article>
  )
}
