import React, {Component} from 'react';
import './Restaurants.css';
import {connect} from 'react-redux';
import {getSelectedBusID} from '../../ducks/reducer'

class Restaurants extends Component{
    constructor(props){
        super(props)
        this.state = {
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
                <div className="cardholder" key={v.id}>
                    <div className="busimg" >
                        <img src={`${v.image_url}`} alt="" className="imgimg" />
                    </div>
                    <div className="cards" >
                        <h1 className="cardtitle">{v.name}</h1>
                        <div className="junk">
                            <div className="junkleft">
                                <div className="rating">
                                    <h4 className="rat">Rating: {v.rating}</h4>
                                    <a href={`${v.url}`}><h4 className="rev">with {v.review_count} reviews.</h4></a>
                                </div>
                                <div className="open">
                                    <h4 className="closed">{v.is_closed === true ? "This restaurant is closed." : "The restaurant is open." }</h4>
                                </div>
                            </div>
                            <div className="junkright">
                                <div className="address">
                                    <h4>{v.location.display_address[0]}</h4>
                                    <h4>{v.location.display_address[1]}</h4>
                                    { v.location.display_address[2] ? <h4>{v.location.display_address[2]}</h4> : null}
                                </div>
                                <a href={`/#/restaurantdirections/${v.id}`}><div value={v.id} onClick={e => {
                                {/* this.selectRestaurant(v.id) */}
                                }} className="gobutton">Wanna go here?</div></a>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })

        return(
            <div>
                <div className="paparests">
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
                    <br/>
                    <br/>
                    <div className="content">
                        {bcards}
                    </div>
                </div>
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
