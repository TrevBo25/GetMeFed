import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Out from './components/Out/Out';
import Restaurants from './components/Restaurants/Restaurants';
import RestaurantDirections from './components/RestaurantDirections/RestaurantDirections';
import In from './components/In/In';
import Recipes from './components/Recipes/Recipes';
import Recipe from './components/Recipe/Recipe';

export default (
    <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/home" component={Home} />
        <Route path="/out" component={Out} />
        <Route path="/restaurants" component={Restaurants} />
        <Route path="/restaurantdirections" component={RestaurantDirections} />
        <Route path="/in" component={In} />
        <Route path="/recipes" component={Recipes} />
        <Route path="/recipe" component={Recipe} />
    </Switch>
)