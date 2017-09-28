import React, {Component} from 'react';
import './Out.css';
import {connect} from 'react-redux';
import axios from 'axios';
import {getLat, getLong, setBus, getSelectedBusID} from '../../ducks/reducer'

class Out extends Component{
    constructor(props){
        super(props)

        this.state = {
            term: "",
            price: "",
        }
    
        this.buildCall=this.buildCall.bind(this);
        this.getRestaurants=this.getRestaurants.bind(this);
        this.handleTerm=this.handleTerm.bind(this);
        this.handlePrice=this.handlePrice.bind(this);
        this.getRandomRestaurant=this.getRandomRestaurant.bind(this);
  
    }


    //term= a search term or terms
    //location= an address of some sort OR latitude= lat&longitude= long
    //price= number corresponding to $ or $$ or $$$ or $$$$
    //radius=40000
    //sort_by=best_match


    //here
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
    //to here can be removed for final build

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
        axios.get(`http://localhost:3535/api/search/${this.buildCall()}`)
        .then( response => {
            let bb = response.data.businesses
            this.props.setBus(bb)
        })
    }

    getRandomRestaurant(){
        this.props.getSelectedBusID( )
        let randomTermValue = this.props.randomTerm[Math.floor(Math.random() * (58 - 0 + 1)) + 0];
        console.log(randomTermValue);
        let randomPriceValue = Math.floor(Math.random() * (3 - 1 + 1) + 1);
        console.log(randomPriceValue)
        let rando = `term=${randomTermValue}&price=${randomPriceValue}&latitude=${this.props.lat}&longitude=${this.props.long}&radius=40000&sort_by=best_match`
        let randoID = "";
        axios.get(`http://localhost:3535/api/search/${rando}`)
        .then( response => {
            let bb = response.data.businesses
            console.log('rdb', bb)
            let find = bb.length;
            console.log('length', find)
            let findNum = Math.floor(Math.random() * (find) - 0);
            console.log('randomNum', findNum)
            randoID = response.data.businesses[Math.floor(Math.random() * (response.data.businesses.length) - 0)].id
            console.log('randoID', randoID)
            this.props.getSelectedBusID(randoID)
            console.log('props', this.props.selectedBusID)
        })

    }
// ask why this code isn't sending to props in time? it should work from there



    render(){

        return(
            <div>
                <h1>Out page</h1>
                {/* <a href="/#/login"><button>Eating out</button></a> */}
                <input onChange={e => {
                    this.handleTerm(e.target.value)
                }} />
                <form onChange={e => {
                    this.handlePrice(e.target.value);
                    }}>
                    <input type="radio" name="price" value="1" /> $ 
                    <input type="radio" name="price" value="2" /> $$ 
                    <input type="radio" name="price" value="3" /> $$$ 
                    <input type="radio" name="price" value="4" /> $$$$
                </form>
                {this.state.thing}
                <a href="/#/restaurants"><button onClick={this.getRestaurants}>GET DEEZ BIZZNIZZEZZ</button></a>
                <br/>
                <a href="/#/restaurantdirections"><button onClick={this.getRandomRestaurant}>GET DEEZ RANDOM BIZZNIZZEZZ</button></a>
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