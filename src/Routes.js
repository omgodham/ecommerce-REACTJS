import React from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Home from './core/Home';

export default function Routes() {
    return (
        <Router>
        <Switch>
            <Route path='/' component={Home} />
        </Switch>
        </Router>
    )
}
