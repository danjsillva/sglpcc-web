import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import GitHubButton from 'react-github-btn'

import ImagePageLicitacoes from '../../assets/page-licitacoes.png'
import ImagePageItens from '../../assets/page-itens.png'
import ImagePageMateriais from '../../assets/page-materiais.png'

export default function Home() {
  return (
    <>
      <div className="has-background-link m-0">
        <div className="container pt-50 pb-50">
          <div className="columns">
            <div className="column is-8">
              <h1 className="title is-1 has-text-white">Sistema de Gestão em Licitações Públicas</h1>
              <h2 className="subtitle is-5 has-text-white">Com foco no combate à corrupção</h2>
            </div>
            <div className="column is-4 has-text-right" style={{ marginTop: 'auto' }}>
              <GitHubButton
                href="https://github.com/danjsillva/sglpcc-web"
                data-icon="octicon-star"
                data-show-count="true"
                aria-label="Star danjsillva/sglpcc-web on GitHub"
              >
                Star
              </GitHubButton>
              <Link to="/sobre" className="button is-link is-inverted is-outline is-rounded is-medium mt-10">Saiba mais sobre o projeto</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container pt-50 pb-25">
        <h1 className="title">Bem-vindo!</h1>
        <h2 className="subtitle is-5">Você pode começar pesquisando as licitações de uma unidade ou consultar a análise de preços de um material ou serviço.</h2>

        <div className="columns mt-25">
          <div className="column">
            <Link to="/licitacoes">
              <div className="has-background-ligh pt-20 pb-20 pl-20 pr-20 custom-home-card custom-home-image">
                <div className="columns">
                  <div className="column is-2">
                    <i className="fa fa-folder-open fa-2x has-text-success d-block"></i>
                  </div>
                  <div className="column">
                    <h4 className="title is-5 mb-10">Licitações</h4>
                    <span className="subtitle">asdasdasd asd asd asd asdasdqwdas daweqwd adsdqwe</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          <div className="column">
            <Link to="/materiais">
              <div className="has-background-ligh pt-20 pb-20 pl-20 pr-20 custom-home-card custom-home-image">
                <div className="columns">
                  <div className="column is-2">
                    <i className="fa fa-box fa-2x has-text-danger d-block"></i>
                  </div>
                  <div className="column">
                    <h4 className="title is-5 mb-10">Materiais</h4>
                    <span className="subtitle">asdasdasd asd asd asd asdasdqwdas daweqwd adsdqwe</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          <div className="column">
            <Link to="/servicos">
              <div className="has-background-ligh pt-20 pb-20 pl-20 pr-20 custom-home-card custom-home-image">
                <div className="columns">
                  <div className="column is-2">
                    <i className="fa fa-tools fa-2x has-text-warning d-block"></i>
                  </div>
                  <div className="column">
                    <h4 className="title is-5 mb-10">Serviços</h4>
                    <span className="subtitle">asdasdasd asd asd asd asdasdqwdas daweqwd adsdqwe</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="has-background-light pb-50 mt-50">
        <div className="container pt-50">
          <div className="columns">
            <div className="column is-4 has-text-right">
              <h1 className="title is-4 mt-100">Busca de licitações para análise de processos semelhantes</h1>
              <h3 className="subtitle">Compare uma licitação com outros processos de compra. Filtre por unidade, estado ou fornecedor para refinar os resultados.</h3>
            </div>
            <div className="column is-8">
              <img src={ImagePageLicitacoes} alt="Página de licitações" className="custom-home-image pb-0" />
            </div>
          </div>
        </div>
      </div>

      <div className="has-background-dark pb-50">
        <div className="container pt-50">
          <div className="columns">
            <div className="column is-8">
              <img src={ImagePageItens} alt="Página de licitações" className="custom-home-image pb-0" />
            </div>
            <div className="column is-4">
              <h1 className="title is-4 mt-100 has-text-white">Análise dos preços praticados nos itens da licitação</h1>
              <h3 className="subtitle has-text-light">Compare o preço de cada item com a média praticada nos processos de compra. Filtre por unidade, estado ou fornecedor para refinar os resultados.</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="has-background-light pb-50">
        <div className="container pt-50">
          <div className="columns">
            <div className="column is-4 has-text-right">
              <h1 className="title is-4 mt-100">Análise de preços do material nos processos de compra</h1>
              <h3 className="subtitle">Menor preço, maior preço, gráficos entre outros detalhes. Filtre por unidade, estado ou fornecedor para refinar os resultados.</h3>
            </div>
            <div className="column is-8">
              <img src={ImagePageMateriais} alt="Página de licitações" className="custom-home-image pb-0" />
            </div>
          </div>
        </div>
      </div>

      <footer>
        <div className="has-background-link m-0">
          <div className="container pt-25 pb-25">
            <div className="columns">
              <div className="column is-8">
                <h1 className="title is-5 has-text-white">Sistema de Gestão em Licitações Públicas</h1>
                <h2 className="subtitle is-6 has-text-white">Com foco no combate à corrupção</h2>
              </div>
              <div className="column is-4 has-text-right" style={{ marginTop: 'auto' }}>
                <Link to="/sobre" className="button is-link is-inverted is-outline is-rounded is-mediu">Saiba mais sobre o projeto</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="has-background-dark m-0">
          <div className="container pt-5 pb-5 has-text-grey">
            <small>Developed with <i className="fa fa-heart"></i> by <a href="http://instagram.com.br/danjsillva" target="blank" className="link has-text-grey">Daniel Silva</a></small>
          </div>
        </div>
      </footer>
    </>
  )
}
