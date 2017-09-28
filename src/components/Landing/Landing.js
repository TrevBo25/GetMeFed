import React, {Component} from 'react';
import './Landing.css';
import {connect} from 'react-redux';

class Landing extends Component{
    render(){
        return(
            <div>
                <h1>Landing page</h1>
                <a href="/#/login"><button>Let's login</button></a>


                <div>
                </div>
            </div>
        )
    }
}


function mapStateToProps(state){
    return {
 
    }
}

export default connect(mapStateToProps)(Landing)