import React from 'react'
import { Link } from 'react-router-dom'
import Currency from 'react-currency-formatter'
import classNames from 'classnames'

export default function Item(props) {
  const { item, showAvisos, porcentagemMargem } = props

  return (
    <Link to={'/materiais/' + item.material.id}>
      <article className="box" style={{ marginBottom: 10 }}>
        <span className="title is-6">{item.material.descricao}</span>
        <br />
        Fornecedor: {item.fornecedor.nome} ({item.fornecedor.uf})
        <div className="card-content">
          <div className="columns">
            <div className="column has-text-centered">
              <span className="title is-6">
                <i className={classNames("fa", { 'fa-thumbs-up has-text-success': item.preco <= item.preco_avg + (item.preco_avg * porcentagemMargem / 100), 'fa-thumbs-down has-text-danger': item.preco > item.preco_avg + (item.preco_avg * porcentagemMargem/ 100) })}></i> <Currency quantity={item.preco} currency="BRL" />
              </span>
              <br />
              Preço unitário
            </div>
            <div className="column has-text-centered">
              <span className="title is-6">
                <i className="fa fa-th has-text-link"></i> {item.quantidade}
              </span>
              <br />
              Quantidade
            </div>
            <div className="column has-text-centered">
              <span className="title is-6">
                <i className="fa fa-money-check-alt has-text-link"></i> <Currency quantity={item.preco * item.quantidade} currency="BRL" />
              </span>
              <br />
              Valor total
            </div>
          </div>
        </div>

        {showAvisos && item.preco <= item.preco_avg && (
          <div className="message is-small is-success">
            <div className="message-body">
              O valor deste item está {(100 - (item.preco * 100 / item.preco_avg)).toFixed(1)}% abaixo do preço médio praticado: <Currency quantity={item.preco_avg} currency="BRL" />
            </div>
          </div>
        )}

        {showAvisos && item.preco >= item.preco_avg && item.preco < item.preco_avg + (item.preco_avg * porcentagemMargem / 100) && (
          <div className="message is-small is-success">
            <div className="message-body">
              O valor deste item está {(-100 + (item.preco * 100 / item.preco_avg)).toFixed(1)}% acima do preço médio praticado: <Currency quantity={item.preco_avg} currency="BRL" />
            </div>
          </div>
        )}

        {showAvisos && item.preco > item.preco_avg + (item.preco_avg * porcentagemMargem / 100) && (
          <div className="message is-small is-danger">
            <div className="message-body">
              O valor deste item está {(-100 + (item.preco * 100 / item.preco_avg)).toFixed(1)}% acima do preço médio praticado: <Currency quantity={item.preco_avg} currency="BRL" />
            </div>
          </div>
        )}

      </article>
    </Link>
  )
}
