import React from 'react'
import { Link } from 'react-router-dom'
import Currency from 'react-currency-formatter'
import classNames from 'classnames'

export default function Licitacao(props) {
  const { licitacao } = props

  return (
    <Link to={'/itens/' + licitacao.id}>
      <article className="box" style={{ marginBottom: 10 }}>
        <span className="is-pulled-right">{licitacao.data.slice(0, 10)}</span>
        <span className="title is-6">{licitacao.processo}</span>
        <br />
        <span className="has-text-grey">Unidade: {licitacao.unidade.nome}</span>
        <br />
        Objeto: {licitacao.objeto}
        <div className="card-content pb-0">
          <div className="columns">
            <div className="column has-text-centered">
              <span className="title is-6">
                <i className={classNames("fa", { 'fa-thumbs-up has-text-success': true })}></i> <Currency quantity={licitacao.itens.reduce((a, b) => a + b.preco, 0) || 0} currency="BRL" />
              </span>
              <br />
              Valor total da licitação
            </div>
            <div className="column has-text-centered">
              <span className="title is-6">
                <i className="fa fa-th has-text-link"></i> {licitacao.itens.length}
              </span>
              <br />
              Quantidade de itens
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
