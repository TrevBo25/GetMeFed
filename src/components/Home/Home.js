import React, {Component} from 'react';
import './Home.css';
import {connect} from 'react-redux';

class Home extends Component{
    render(){
        return(
            <div>
                Home Page
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
 
    }
}

export default connect(mapStateToProps)(Home)