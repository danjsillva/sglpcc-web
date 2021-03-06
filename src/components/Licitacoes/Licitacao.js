import React from 'react'
import { Link } from 'react-router-dom'
import Currency from 'react-currency-formatter'
import classNames from 'classnames'

export default function Licitacao(props) {
  return (
    <article className="custom-list-item">
      {/* <span className="is-pulled-right">{props.licitacao.data.slice(0, 10)}</span> */}
      <Link to={'/licitacoes/' + props.licitacao.id} className="link has-text-dark">
        <div className="title is-6">{props.licitacao.processo || ''}</div>
      </Link >
      <div className="subtitle is-7 mb-0">{props.licitacao.data ? props.licitacao.data.slice(0, 10) : ''}</div>
      <div className=""><strong>{props.licitacao.unidade ? props.licitacao.unidade.nome : ''}</strong></div>
      {props.licitacao.objeto}

      <div className="columns mt-5 mb-0">
        <div className="column has-text-centered">
          <span className="title is-6">
            <i className="fa fa-search has-text-link"></i> <Currency quantity={props.licitacao.itens ? props.licitacao.itens.reduce((a, b) => a + (b.preco * b.quantidade), 0) : 0} currency="BRL" />
          </span>
          <br />
          Valor total da licitação
            </div>
        <div className="column has-text-centered">
          <span className="title is-6">
            <i className="fa fa-th has-text-link"></i> {props.licitacao.itens ? props.licitacao.itens.length : 0}
          </span>
          <br />
          Quantidade de itens
            </div>
      </div>
    </article>
  )
}
