import React from 'react'
import { Link } from 'react-router-dom'
import Currency from 'react-currency-formatter'
import classNames from 'classnames'

export default function Item(props) {
  return (
    <article className="custom-list-item">
      <Link to={'/materiais/' + props.item.material.id} className="link has-text-dark">
        <div className="title is-6">{props.item.material.descricao}</div>
      </Link>
      <div className="subtitle is-7 mb-0">{props.item.fornecedor.nome} ({props.item.fornecedor.uf})</div>
      <div className=""><strong></strong></div>

      <div className="columns mt-5 mb-0">
        <div className="column has-text-centered">
          <span className="title is-6">
            <i className={classNames("fa", { 'fa-thumbs-up has-text-success': props.item.preco <= props.item.preco_avg + (props.item.preco_avg * props.porcentagemMargem / 100), 'fa-thumbs-down has-text-danger': props.item.preco > props.item.preco_avg + (props.item.preco_avg * props.porcentagemMargem / 100) })}></i> <Currency quantity={props.item.preco} currency="BRL" />
          </span>
          <br />
          Preço unitário
            </div>
        <div className="column has-text-centered">
          <span className="title is-6">
            <i className="fa fa-th has-text-link"></i> {props.item.quantidade}
          </span>
          <br />
          Quantidade
            </div>
        <div className="column has-text-centered">
          <span className="title is-6">
            <i className="fa fa-money-check-alt has-text-link"></i> <Currency quantity={props.item.preco * props.item.quantidade} currency="BRL" />
          </span>
          <br />
          Valor total
            </div>
      </div>

      {props.showAvisos && props.item.preco < props.item.preco_avg && (
        <div className="message is-small is-success">
          <div className="message-body">
            O preço deste item está {(100 - (props.item.preco * 100 / props.item.preco_avg)).toFixed(1)}% abaixo do preço médio praticado: <Currency quantity={props.item.preco_avg} currency="BRL" />
          </div>
        </div>
      )}

      {props.showAvisos && props.item.preco >= props.item.preco_avg && props.item.preco < props.item.preco_avg + (props.item.preco_avg * props.porcentagemMargem / 100) && (
        <div className="message is-small is-success">
          <div className="message-body">
            O preço deste item está {(-100 + (props.item.preco * 100 / props.item.preco_avg)).toFixed(1)}% acima do preço médio praticado: <Currency quantity={props.item.preco_avg} currency="BRL" />
          </div>
        </div>
      )}

      {props.showAvisos && props.item.preco > props.item.preco_avg + (props.item.preco_avg * props.porcentagemMargem / 100) && (
        <div className="message is-small is-danger">
          <div className="message-body">
            O preço deste item está {(-100 + (props.item.preco * 100 / props.item.preco_avg)).toFixed(1)}% acima do preço médio praticado: <Currency quantity={props.item.preco_avg} currency="BRL" />
          </div>
        </div>
      )}
    </article>
  )
}
