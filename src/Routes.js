import React from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Home from './core/Home';
import SignIn from './user/SignIn';
import SignUp from './user/SignUp';

export default function Routes() {
    return (
        <Router>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/signin' component={SignIn} />
            <Route exact path='/signup' component={SignUp} />
        </Switch>
        </Router>
    )
}
