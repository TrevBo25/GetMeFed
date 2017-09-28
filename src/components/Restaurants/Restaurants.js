import React, {Component} from 'react';
import './Restaurants.css';
import {connect} from 'react-redux';
import {getSelectedBusID} from '../../ducks/reducer'

class Restaurants extends Component{
    constructor(props){
        super(props)
        this.state = {
            selected: ""
        }
        this.selectRestaurant = this.selectRestaurant.bind(this);
    }

    selectRestaurant(pick){
        this.props.getSelectedBusID(pick);
    }
    render(){

        const b = this.props.bus;
        const bcards = b.map((v, i, a) => {
            return (
                <div key={v.id}>
                    <p>{v.name}</p>
                    <br />
                    <a href="/#/restaurantdirections"><button value={v.id} onClick={e => {
                        this.selectRestaurant(e.target.value)}}>select this one</button></a>
                </div>
            )
        })

        return(
            <div>
                <h1>Restaurants page</h1>
                <div>
                {bcards}
                </div>
                <br />
            </div>
        )
    }
}


function mapStateToProps(state){
    return {
        bus: state.bus,
        selectedBusID: state.selectedBusID
    }
}

export default connect(mapStateToProps, {getSelectedBusID})(Restaurants)