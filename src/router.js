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
import About from './components/About/About';
import Favorites from './components/Favorites/Favorites'

export default (
    <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/home" component={Home} />
        <Route path="/out" component={Out} />
        <Route path="/restaurants" component={Restaurants} />
        <Route path="/restaurantdirections/:id" component={RestaurantDirections} />
        <Route path="/in" component={In} />
        <Route path="/recipes" component={Recipes} />
        <Route path="/recipe/:id" component={Recipe} />
        <Route path="/about" component={About} />
        <Route path="/favorites" component={Favorites} />
    </Switch>
)