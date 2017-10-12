import React, {Component} from 'react';
import './RestaurantDirections.css';
import {connect} from 'react-redux';
import axios from 'axios';
import {setSelectedBus, setReviews} from '../../ducks/reducer';
import Carousel from 'nuka-carousel';


class RestaurantDirections extends Component{
    constructor(props){
        super(props)
        this.state = {
            myPlaceID: "",
            busPlaceID: ""
        }
        this.selectFavorite=this.selectFavorite.bind(this);
    }
    
    componentDidMount(){

        const bus = axios.get(`/api/business/${this.props.match.params.id}`)
        .then ( response => {
            return response.data;
        })

        const rev = axios.get(`/api/reviews/${this.props.match.params.id}`)
        .then ( response => {
            return response.data;
        })

        axios.all([bus, rev])
        .then( response => {
            axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${response[0].coordinates.latitude},${response[0].coordinates.longitude}&key=AIzaSyCP0aaxLXVh5E4162hP3hnNLs-Nxjz7lrc`)
            .then ( resp => {
                this.props.setSelectedBus(response[0]);
                this.props.setReviews(response[1]);
                this.setState({
                    busPlaceID: resp.data.results[0].place_id
                })
            })

            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition(position => {
                    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=AIzaSyCP0aaxLXVh5E4162hP3hnNLs-Nxjz7lrc`)
                    .then ( res => {
                        this.setState({
                            myPlaceID: res.data.results[0].place_id
                        })
                    })
                })
            }
        })
    }

    selectFavorite(){
        axios.post(`/api/postfave/`,{
            type: "restaurant",
            busid: `${this.props.match.params.id}`,
            name: `${this.props.selectedBus.name}`,
            img: `${this.props.selectedBus.photos[0]}`,
            notes: " "
         })
    }
    
    render(){

        const days = ["Mon", "Tues", "Wed", "Thu", "Fri", "Sat", "Sun"];

        const busHours = this.props.selectedBus.hours ? 
             this.props.selectedBus.hours[0].open.map( (v, i, a) => {
                let beg = "";
                let fin = "";
                if(v.start.charAt(0) === "0"){
                    beg = (v.start.substr(1,1) + ":" + v.start.substr(2, 2) + "am");
                    fin = ((+v.end.substr(0,2) - 12).toString() + ":" + v.end.substr(2, 2) + "pm");
                } else if (+v.start.substr(0,2) > 12){
                    beg = ((+v.start.substr(0,2) - 12).toString() + ":" + v.start.substr(2, 2) + "pm");
                    fin = ((+v.end.substr(0,2) - 12).toString() + ":" + v.end.substr(2, 2) + "pm");
                } else {
                    beg = (v.start.substr(0,2) + ":" + v.start.substr(2, 2) + "am");
                    fin = ((+v.end.substr(0,2) - 12).toString() + ":" + v.end.substr(2, 2) + "pm");
                }
                if(i<7){
                return (
                    <li className="hj" key={i}>{i > 6 ? days[i-7] : days[i] } {beg}-{fin}</li>
                )}
            }) : <div>hours loading</div>;
        
            console.log(this.props.selectedBus)

        return(
             <div>
                {this.props.selectedBus ? (
                <div className="papard">
                    <div className="navbar">
                        <a href="/#/home"><div className="navhome"><h1>G</h1></div></a>
                        <div className="navlinks">
                            <a href="/#/out"><div>Eat Out</div></a>
                            <a href="/#/in"><div>Eat In</div></a>
                            <a href="/#/favorites"><div>Favorites</div></a>
                        </div>
                        <div className="navlinksright">
                            <a href="/#/about"><div>About</div></a>
                            <a href="http://localhost:3535/auth/logout"><div>Logout</div></a>
                        </div>
                    </div>
                    <div className="container">
                        <div className="leftstuff">
                        <div onClick={this.selectFavorite} className="favbutton" >FAVORITE?</div>
                            <div className="name">
                                <h1 className="resname">{this.props.selectedBus.name}</h1>
                                <h4 className="rating">Rating: {this.props.selectedBus.rating}</h4>
                                <h2 className="numrev">with {this.props.selectedBus.review_count} reviews.</h2>
                            </div>
                            <div className="resinfo">
                                <div className="leftinfo">
                                    {this.props.selectedBus.location ? 
                                        <div className="address">
                                        <h2 className="adrtitle">Address</h2>
                                        <p className="adrjunk">{this.props.selectedBus.location.display_address[0]}</p>
                                        <p className="adrjunk">{this.props.selectedBus.location.display_address[1]}</p>
                                        { this.props.selectedBus.location.display_address[2] ? <p className="adrjunk">{this.props.selectedBus.location.display_address[2]}</p> : null }
                                    </div> : <div>address loading</div>}
                                    <div className="phone">
                                        <h2 className="phonetitle">Phone</h2>
                                        <p className="phonejunk">{this.props.selectedBus.display_phone}</p>
                                    </div>
                                </div>
                                <div className="rightinfo">
                                    <div className="hours">
                                        <h2 className="hourstitle">Hours</h2>
                                        <ul className="hoursjunk">
                                            {busHours}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="mapholder">
                            <iframe
                                width="390"
                                height="350"
                                frameBorder="0" style={{border:0}}
                                title="map"
                                src={`https://www.google.com/maps/embed/v1/directions?key=AIzaSyCP0aaxLXVh5E4162hP3hnNLs-Nxjz7lrc&origin=place_id:${this.state.myPlaceID}&destination=place_id:${this.state.busPlaceID}`}
                                allowFullScreen>
                            </iframe>
                            </div>
                        </div>
                        <div className="rightstuff">
                            <div className="photos">
                                {this.props.selectedBus.photos ? (
                                <Carousel>
                                    <img src={this.props.selectedBus.photos[0]} alt="" className="pics" />
                                    <img src={this.props.selectedBus.photos[1]} alt="" className="pics" />
                                    <img src={this.props.selectedBus.photos[2]} alt="" className="pics" /> 
                                </Carousel>) : <div>pictures loading</div>}
                            </div>
                            <div className="reviews">
                                <div className="reviewbar">
                                    <a href={this.props.selectedBus.url}><h2 className="reviewbartitle">REVIEWS</h2></a>
                                    <br/>
                                </div>
                                <div className="revwords">
                                    {this.props.reviews.reviews ? 
                                    <ol className="revlist">
                                            <div className="revbox">
                                                <div className="revstuff">
                                                    <h2 className="user">{this.props.reviews.reviews[0].user.name}       Rating: {this.props.reviews.reviews[0].rating}</h2>
                                                    <p className="text">{this.props.reviews.reviews[0].text}</p>
                                                </div>
                                                <div className="revpic">
                                                    <img src={this.props.reviews.reviews[0].user.image_url} alt="" className="userimg" />
                                                </div>
                                            </div>
                                            <div className="revbox">
                                                <div className="revstuff">
                                                    <h2 className="user">{this.props.reviews.reviews[1].user.name}       Rating: {this.props.reviews.reviews[1].rating}</h2>
                                                    <p className="text">{this.props.reviews.reviews[1].text}</p>
                                                </div>
                                                <div className="revpic">
                                                    <img src={this.props.reviews.reviews[1].user.image_url} alt="" className="userimg" />
                                                </div>
                                            </div>
                                            <div className="revbox">
                                                <div className="revstuff">
                                                    <h2 className="user">{this.props.reviews.reviews[2].user.name}       Rating: {this.props.reviews.reviews[2].rating}</h2>
                                                    <p className="text">{this.props.reviews.reviews[2].text}</p>
                                                </div>
                                                <div className="revpic">
                                                    <img src={this.props.reviews.reviews[2].user.image_url} alt="" className="userimg" />
                                                </div>
                                            </div>
                                    </ol> : <div>reviews loading</div>}
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>) : "loading" }
                 
            </div>
        )
    }
}

RestaurantDirections.defaultProps = {
    selectedBus: {},
    reviews: []
}

function mapStateToProps(state){
    return {
        selectedBusID: state.selectedBusID,
        selectedBus: state.selectedBus,
        reviews: state.reviews
    }
}

export default connect(mapStateToProps, {setSelectedBus, setReviews})(RestaurantDirections)