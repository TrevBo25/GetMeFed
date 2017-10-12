import React, {Component} from 'react';
import './In.css';
import {connect} from 'react-redux';
import axios from 'axios';
import {getLat, getLong, getRecipes, getSelectedRecipeID} from '../../ducks/reducer';
import {Redirect} from 'react-router-dom';

class In extends Component{
    constructor(props){
        super(props)
        this.state = {
            term: '',
            submitted: false
        }

        this.getLocation=this.getLocation.bind(this);
        this.handleTerm=this.handleTerm.bind(this);
        this.searchRecipes=this.searchRecipes.bind(this);
        this.getRandomBreakfast=this.getRandomBreakfast.bind(this);
        this.getRandomLunch=this.getRandomLunch.bind(this);
        this.getRandomDinner=this.getRandomDinner.bind(this);
        this.getRandomDessert=this.getRandomDessert.bind(this);
        this.getRandomDrink=this.getRandomDrink.bind(this);
        this.handleKeyPress=this.handleKeyPress.bind(this);
    }

    componentDidMount(){
        this.getLocation();
    }


    getLocation(){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                this.props.getLat(position.coords.latitude);
                this.props.getLong(position.coords.longitude)
                })
        }
    }

    handleTerm(str){
        this.setState({
            term: str
        })
    }

    searchRecipes(){
        axios.get(`http://food2fork.com/api/search?key=6567b231491290ae92e3a731730b6723&q=${this.state.term}`)
        .then( response => {
            this.props.getRecipes(response.data.recipes);
            this.setState({
                submitted: true
            }) 
        }).catch(err => console.log(err))
    }
    
    getRandomBreakfast(){
        let randBreakfastValue = this.props.randBreakfast[Math.floor(Math.random() * (this.props.randBreakfast.length - 0 + 1)) + 0]
        console.log('br', randBreakfastValue);
        axios.get(`http://food2fork.com/api/search?key=6567b231491290ae92e3a731730b6723&q=${randBreakfastValue}`)
        .then( response => {
            let randRec = response.data.recipes[Math.floor(Math.random() * (response.data.recipes.length - 0 + 1)) + 0].recipe_id;
            this.props.getSelectedRecipeID(randRec)
            this.props.history.push(`/recipe/${randRec}`)
        }).catch(err => console.log(err))
    }

    getRandomLunch(){
        let randLunchValue = this.props.randLunch[Math.floor(Math.random() * (this.props.randLunch.length - 0 + 1)) + 0]
        console.log('l', randLunchValue);
        axios.get(`http://food2fork.com/api/search?key=6567b231491290ae92e3a731730b6723&q=${randLunchValue}`)
        .then( response => {
            let randRec = response.data.recipes[Math.floor(Math.random() * (response.data.recipes.length - 0 + 1)) + 0].recipe_id;
            this.props.getSelectedRecipeID(randRec)
            this.props.history.push(`/recipe/${randRec}`)
        }).catch(err => console.log(err))
    }

    getRandomDinner(){
        let randDinnerValue = this.props.randDinner[Math.floor(Math.random() * (this.props.randDinner.length - 0 + 1)) + 0]
        console.log('di', randDinnerValue);
        axios.get(`http://food2fork.com/api/search?key=6567b231491290ae92e3a731730b6723&q=${randDinnerValue}`)
        .then( response => {
            let randRec = response.data.recipes[Math.floor(Math.random() * (response.data.recipes.length - 0 + 1)) + 0].recipe_id;
            this.props.getSelectedRecipeID(randRec)
            this.props.history.push(`/recipe/${randRec}`)
        }).catch(err => console.log(err))
    }

    getRandomDessert(){
        let randDessertValue = this.props.randDessert[Math.floor(Math.random() * (this.props.randDessert.length - 0 + 1)) + 0]
        console.log('de', randDessertValue);
        axios.get(`http://food2fork.com/api/search?key=6567b231491290ae92e3a731730b6723&q=${randDessertValue}`)
        .then( response => {
            let randRec = response.data.recipes[Math.floor(Math.random() * (response.data.recipes.length - 0 + 1)) + 0].recipe_id;
            this.props.getSelectedRecipeID(randRec)
            this.props.history.push(`/recipe/${randRec}`)
        }).catch(err => console.log(err))
    }

    getRandomDrink(){
        let randDrinkValue = this.props.randDrink[Math.floor(Math.random() * (this.props.randDrink.length - 0 + 1)) + 0]
        console.log('dr', randDrinkValue);
        axios.get(`http://food2fork.com/api/search?key=6567b231491290ae92e3a731730b6723&q=${randDrinkValue}`)
        .then( response => {
            let randRec = response.data.recipes[Math.floor(Math.random() * (response.data.recipes.length - 0 + 1)) + 0].recipe_id;
            this.props.getSelectedRecipeID(randRec)
            this.props.history.push(`/recipe/${randRec}`)
        }).catch(err => console.log(err))
    }
    
    handleKeyPress(target) {
        if(target.charCode==13){
            this.searchRecipes();  
        }
    }


    render(){
        console.log(this.props)
        if (this.state.submitted) {
            return (
              <Redirect to="/recipes"/>
            )
        }

        return(
            <div>
                <div className="papai">
                    <div className="navbar">
                        <a href="/#/home"><div className="navhome"><h1>G</h1></div></a>
                        <div className="navlinks">
                            <a href="/#/out"><div>Eat Out</div></a>
                            <a href="/#/in"><div>Eat In</div></a>
                            <a href="/#/favorites"><div>Favorites</div></a>
                        </div>
                        <div className="navlinksright">
                            <a href="/#/about"><div>About</div></a>
                            <a href="/auth/logout"><div>Logout</div></a>
                        </div>
                    </div>
                    <div className="container">
                        <h1 className="intitle">I hope you're better at cooking than you are at making decisions.</h1>
                        <div className="money">
                            <div className="thisone">
                                <input onChange={e => {
                                    this.handleTerm(e.target.value)
                                    }} className="input" placeholder="What are you feelin' ..." onKeyPress={this.handleKeyPress} />
                            </div>
                            <div className="randomholder">
                            <a href="/#/recipe"><div onClick={this.getRandomBreakfast} className="randobutton bfast">Random<br/>Breakfast</div></a>
                            <a href="/#/recipe"><div onClick={this.getRandomLunch} className="randobutton">Random<br/>Lunch</div></a>
                            <a href="/#/recipe"><div onClick={this.getRandomDinner} className="randobutton">Random<br/>Dinner</div></a>
                            <a href="/#/recipe"><div onClick={this.getRandomDessert} className="randobutton">Random<br/>Dessert</div></a>
                            <a href="/#/recipe"><div onClick={this.getRandomDrink} className="randobutton drinks">Random<br/>Drink</div></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        lat: state.lat,
        long: state.long,
        randBreakfast: state.randBreakfast,
        randLunch: state.randLunch,
        randDinner: state.randDinner,
        randDessert: state.randDessert,
        randDrink: state.randDrink,
        selectedRecipeID: state.selectedRecipeID
    }
}

export default connect(mapStateToProps, {getLat, getLong, getRecipes, getSelectedRecipeID})(In);
