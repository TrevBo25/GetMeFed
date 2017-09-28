import React, {Component} from 'react';
import './In.css';
import {connect} from 'react-redux';
import axios from 'axios';
import {getLat, getLong} from '../../ducks/reducer';

class In extends Component{
    constructor(props){
        super(props)
        this.state = {
            term: ""
        }

        this.getLocation=this.getLocation.bind(this);
        this.handleTerm=this.handleTerm.bind(this);
        this.searchRecipes=this.searchRecipes.bind(this);
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
    }


    render(){
        return(
            <div>
                <h1>In Page</h1>
                <input onChange={e => {
                    this.handleTerm(e.target.value)
                }} />
                <br />
                {this.state.term}
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

export default connect(mapStateToProps, {getLat, getLong})(In)