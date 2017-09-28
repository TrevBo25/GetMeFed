import React from "react";
import { Switch, Route } from "react-router-dom";
import Landing from './components/Landing/Landing';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Out from './components/Out/Out';
import Restaurants from './components/Restaurants/Restaurants';
import RestaurantDirections from './components/RestaurantDirections/RestaurantDirections';
import In from './components/In/In';

export default (
    <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/login" component={Login} />
        <Route path="/home" component={Home} />
        <Route path="/out" component={Out} />
        <Route path="/restaurants" component={Restaurants} />
        <Route path="/restaurantdirections" component={RestaurantDirections} />
        <Route path="/in" component={In} />
    </Switch>
)