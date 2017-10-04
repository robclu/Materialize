import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './Home'
import About from '../containers/about'

const Main = () => (
  <main>
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About}/>
    </Switch>
  </main>
) 

export default Main