import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from './components/Home/Home'
import Licitacoes from './components/Licitacoes/Licitacoes'
import Itens from './components/Itens/Itens'
import Materiais from './components/Materiais/Materiais'

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/licitacoes" exact component={Licitacoes} />
    <Route path="/licitacoes/:licitacoes_id" exact component={Itens} />
    <Route path="/materiais/:id" exact component={Materiais} />
  </Switch>
)

export default Routes
