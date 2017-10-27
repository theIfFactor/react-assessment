import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Details from './components/Details'
import List from './components/List'


export default (
    <Switch>
        <Route exact path='/' component={List}/>
        <Route path='/details/:id' component={Details}/>
    </Switch>
)