import React, {Component} from 'react';
import './Login.css';
import {connect} from 'react-redux';

class Login extends Component{
    render(){
        return(
            <div>
                <a href="http://localhost:3535/auth"><button>Login</button></a>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
 
    }
}

export default connect(mapStateToProps)(Login)