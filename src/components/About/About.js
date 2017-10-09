import React, {Component} from 'react';
import '../../reset.css';
import './About.css';
import {connect} from 'react-redux';


class About extends Component{


    render(){
        return(
            <div>
                <div className="papaa">
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
                        <div className="topholder">
                            <div className="toptext">
                                <h4>This is where I would write something interesting about myself if there was anything.</h4>
                            </div>
                        </div>
                </div>  
            </div>
        )
    }
}

function mapStateToProps(state){
    return {

    }
}

export default connect(mapStateToProps)(About)