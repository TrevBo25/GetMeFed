import React, {Component} from 'react';
import './Home.css';
import {connect} from 'react-redux';
import {getLat, getLong} from '../../ducks/reducer'

class Home extends Component{
    constructor(props){
        super(props)

        this.getLocation=this.getLocation.bind(this);
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


    render(){
        return(
            <div>
                <h1>Home Page</h1>
                <a href="/#/out"><button>Eating out</button></a>
                <br />
                <br />
                <a href="/#/in"><button>Eating in</button></a>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        lat: state.lat,
        long: state.long
    }
}

export default connect(mapStateToProps, {getLat, getLong})(Home)