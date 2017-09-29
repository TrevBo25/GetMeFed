import React, {Component} from 'react';
import './RestaurantDirections.css';
import {connect} from 'react-redux';
import axios from 'axios';
import {setSelectedBus, getLat, getLong} from '../../ducks/reducer'

class RestaurantDirections extends Component{
    constructor(props){
        super(props)
        this.state = {
            myPlaceID: "",
            busPlaceID: "",
            doIt: true
        }
        this.getRestaurant = this.getRestaurant.bind(this);
        this.getLocation = this.getLocation.bind(this);
        this.getPlaceIDs = this.getPlaceIDs.bind(this);
    }
    
    componentDidMount(){
        this.getLocation();
    }

    getLocation(){

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                this.props.getLat(position.coords.latitude);
                this.props.getLong(position.coords.longitude);
                })
        }
            
        
    }

    getRestaurant(){
        axios.get(`http://localhost:3535/api/business/${this.props.selectedBusID}`)
        .then ( response => {
            this.props.setSelectedBus(response.data);
            this.getPlaceIDs();
            this.setState({
                doIt: false
            })
        })
    }
    
    getPlaceIDs(){
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.props.lat},${this.props.long}&key=AIzaSyCP0aaxLXVh5E4162hP3hnNLs-Nxjz7lrc`)
        .then ( response => {
            this.setState({
                myPlaceID: response.data.results[0].place_id
            })
        })
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.props.selectedBus.coordinates.latitude},${this.props.selectedBus.coordinates.longitude}&key=AIzaSyCP0aaxLXVh5E4162hP3hnNLs-Nxjz7lrc`)
        .then ( response => {
            this.setState({
                busPlaceID: response.data.results[0].place_id
            })
        })
    }
    
    render(){

        this.props.selectedBusID && this.state.doIt === true ? this.getRestaurant() : null;
        return(
             <div>{ this.props.selectedBusID ? 
                (<div>
                    <h1>Restaurant Directions page</h1>
                    <div>
                        <div>
                            {this.props.selectedBus.name}
                            <br />
                        </div>
                        <div>
                        <iframe
                            width="600"
                            height="450"
                            frameBorder="0" style={{border:0}}
                            title="map"
                            src={`https://www.google.com/maps/embed/v1/directions?key=AIzaSyCP0aaxLXVh5E4162hP3hnNLs-Nxjz7lrc&origin=place_id:${this.state.myPlaceID}&destination=place_id:${this.state.busPlaceID}`}
                            allowFullScreen>
                        </iframe>
                        </div>
                    </div>
                </div>) :  "loading" }
            </div>
        )
    }
}


function mapStateToProps(state){
    return {
        selectedBusID: state.selectedBusID,
        selectedBus: state.selectedBus,
        lat: state.lat,
        long: state.long
    }
}

export default connect(mapStateToProps, {setSelectedBus, getLat, getLong})(RestaurantDirections)