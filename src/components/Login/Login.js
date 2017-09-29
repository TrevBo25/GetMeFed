import React, {Component} from 'react';
import '../../reset.css';
import './Login.css';
import {connect} from 'react-redux';

class Login extends Component{
    //
    render(){
        return(
            <div>
                <div className="papa">
                    <div className="herobox">
                        <h1 className="header">GET ME FED</h1>
                        <a href="http://localhost:3535/auth"><div className="loginbutton">LOGIN/REGISTER</div></a>
                        <div></div>
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

export default connect(mapStateToProps)(Login)