import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from './components/Home/Home'
import Licitacoes from './components/Licitacoes/Licitacoes'
import Itens from './components/Itens/Itens'
import Materiais from './components/Materiais/Materiais'

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/licitacoes" component={Licitacoes} />
    <Route path="/itens/:licitacoes_id" component={Itens} />
    <Route path="/materiais/:id" component={Materiais} />
  </Switch>
)

export default Routes
