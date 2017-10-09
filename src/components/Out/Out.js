import React, {Component} from 'react';
import './Out.css';
import {connect} from 'react-redux';
import axios from 'axios';
import {getLat, getLong, setBus, getSelectedBusID} from '../../ducks/reducer';
import {Redirect} from 'react-router-dom';

class Out extends Component{
    constructor(props){
        super(props)

        this.state = {
            term: "",
            price: "",
            submitted: false
        }
    
        this.buildCall=this.buildCall.bind(this);
        this.getRestaurants=this.getRestaurants.bind(this);
        this.handleTerm=this.handleTerm.bind(this);
        this.handlePrice=this.handlePrice.bind(this);
        this.getRandomRestaurant=this.getRandomRestaurant.bind(this);
        this.handleKeyPress=this.handleKeyPress.bind(this);
  
    }

    componentDidMount(){
        this.getLocation();
        this.getRandomRestaurant();
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

    handlePrice(str){
        this.setState({
            price: str
        })
    }


    buildCall(){
        let out = `term=${this.state.term}&price=${this.state.price}&latitude=${this.props.lat}&longitude=${this.props.long}&radius=40000&sort_by=best_match`
        return out;
    }

    getRestaurants(){
        axios.get(`/api/search/${this.buildCall()}`)
        .then( response => {
            let bb = response.data.businesses
            this.props.setBus(bb)
            this.setState({
                submitted: true
            }) 
        })
    }

    getRandomRestaurant(){
        let randomTermValue = this.props.randomTerm[Math.floor(Math.random() * ((this.props.randomTerm.length - 1) - 0 + 1)) + 0];
        console.log(randomTermValue)
        let randomPriceValue = Math.floor(Math.random() * (3 - 1 + 1) + 1);
        let rando = `term=${randomTermValue}&price=${randomPriceValue}&latitude=${this.props.lat}&longitude=${this.props.long}&radius=40000&sort_by=best_match`
        let randoID = "";
        axios.get(`/api/search/${rando}`)
        .then( response => {
            randoID = response.data.businesses[Math.floor(Math.random() * (response.data.businesses.length) - 0)].id
            this.props.getSelectedBusID(randoID)
            console.log(randoID);
        })
    }

    handleKeyPress(target) {
        if(target.charCode==13){
            this.getRestaurants();    
        }
    }

    render(){

        if (this.state.submitted) {
            return (
              <Redirect to="/restaurants"/>
            )
          }

        return(
            <div>
                <div className="papao">
                    <div className="navbar">
                        <a href="/#/home"><div className="navhome"><h1>G</h1></div></a>
                        <div className="navlinks">
                            <a href="/#/out"><div>Eat Out</div></a>
                            <a href="/#/in"><div>Eat In</div></a>
                            <a href="/#/favorites"><div>Favorites</div></a>
                        </div>
                        <div className="navlinksright">
                            <a href="/#/about"><div>About</div></a>
                        </div>
                    </div>
                    <div className="container">
                        <h1 className="outtitle">Which restaurant are you going to grace with your presence today?</h1>
                        <div className="money">
                            <div className="radioholder">
                                <div className="radios">
                                    <form onChange={e => {this.handlePrice(e.target.value); }}>
                                        <label className="radio inline"> 
                                            <input type="radio" name="sex" value="1" />
                                            <span> $ </span> 
                                        </label>
                                        <label className="radio inline"> 
                                            <input type="radio" name="sex" value="2" />
                                            <span>$$ </span> 
                                        </label>
                                        <label className="radio inline"> 
                                            <input type="radio" name="sex" value="3" />
                                            <span>$$$ </span> 
                                        </label>
                                        <label className="radio inline"> 
                                            <input type="radio" name="sex" value="4" />
                                            <span>$$$$ </span> 
                                        </label>
                                    </form>
                                </div>
                            </div>
                            <div className="thisone">
                                <input onChange={e => {
                                    this.handleTerm(e.target.value)
                                }} className="input" placeholder="What's the plan? ..." onKeyPress={this.handleKeyPress} />
                            </div>
                            <div className="randomholder">
                                <a href={`/#/restaurantdirections/${this.props.selectedBusID}`}><div className="randobutton">Random Restaurant</div></a>
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
        bus: state.bus,
        selectedBusID: state.selectedBusID,
        randomTerm: state.randomTerm
    }
}

export default connect(mapStateToProps, {getLat, getLong, setBus, getSelectedBusID})(Out)