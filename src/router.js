import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from './components/Login/Login';
import Home from './components/Home/Home'

export default (
    <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/home" component={Home} />
    </Switch>
)