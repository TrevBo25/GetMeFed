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
                            <a href="http://localhost:3535/auth/logout"><div>Logout</div></a>
                        </div>
                    </div>
                        <div className="topholder">
                            <div className="toptext">
                                <p>This app was created for my personal project for DevMountain. It was built using the javascript framework React. React was used in part with Redux to make the front end communicate seamlessly. Axios was used to call foreign APIs and to retrieve their data to be used. The CSS preprocessor Sass was used to create these beautiful stylings. On the back end, the server was created using Node.js in cooperation with Massive and Express. The login was made through the Auth0 authentication system. All information is being stored on an SQL database.</p>
                            </div>
                            <div className="contactbuttonholder">
                                <a href="mailto:TrevorBrown25@gmail.com" ><i className="fa fa-envelope-square fa-5x" aria-hidden="true"></i></a>
                                <a href="https://github.com/TrevBo25" target="_blank" rel="noopener noreferrer" ><i className="fa fa-github-square fa-5x" aria-hidden="true"></i></a>
                                <a href="https://www.linkedin.com/in/trevor-brown/" target="_blank" rel="noopener noreferrer" ><i className="fa fa-linkedin-square fa-5x" aria-hidden="true"></i></a>
                                <a href="http://instantostrich.com/" target="_blank" rel="noopener noreferrer" ><i className="fa fa-thumbs-up fa-5x" aria-hidden="true"></i></a>
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