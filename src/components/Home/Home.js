import React, {Component} from 'react';
import '../../reset.css';
import './Home.css';
import {connect} from 'react-redux';
import {getLat, getLong} from '../../ducks/reducer';
import _ from 'underscore';

class Home extends Component{
    constructor(props){
        super(props)
        this.state = {
            scroll: 0
        }
        this.handleScroll = _.throttle(this.handleScroll,3000);
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

    handleScroll(e){
        let newScroll = this.state.scroll;
        e.deltaY > 0 ? ( this.state.scroll < 3 ? this.setState({
            scroll: newScroll + 1
        }) : null) :
        (this.state.scroll > 0 ? this.setState({
            scroll: newScroll - 1
        }) : null)
    }

    //<div className={this.state.scroll === 1 ? "papah papahgo" : "papah"}>

    render(){
        console.log(this.state.scroll);
        return(
                <div onWheel={e => {this.handleScroll(e); e.persist();}}>
                    <div className="navbar">
                        <a href="/#/home"><div className="navhome"><h1 className="g">G</h1></div></a>
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
                    <div className={this.state.scroll === 1 ? "topcardshow topcardgo" : "topcardshow"}> 
                    <div className="content">
                        <h1 className="title">GET ME FED</h1>
                        <p className="words">You look hungry. Why don't you scroll down to find out what we can do.</p>
                    </div>      
                    </div>
                    <div className={this.state.scroll === 2 ? "papah papahgo" : ( this.state.scroll === 1 ? "papah" : "papahhide")}>
                        <div className="topholder">
                            <div className="toptext">
                                <h4>Hey. It's okay. We know you can't decide what you want to eat. It's tough. We've all been there and we're here to help with that. Making such an impossible decision on an empty stomach is something nobody should have to suffer through alone. Now you don't have to. Help us help you.</h4>
                            </div>
                        </div>
                    </div>
                    <div className={this.state.scroll === 2 ? "maincardshow" : ( this.state.scroll === 3 ? "maincardgo" : "maincard")}>
                        <div className="maincardcontent">
                            <div className="mainwords">
                                <h1 className="maincardtitle">Feeling ambitious?</h1>
                                <br/>
                                <h4>Really? Well then, I have just the thing for you. We can help you whip something up with step by step directions. Why don't you try your hand at making eggs benedict, a juicy New York strip, or a spicy bloody mary. Thousands of recipes are at your fingertips. With a couple clicks and a little elbow grease you'll go from get me fed to me got fed.</h4><br/>
                                <a href="/#/in"><div className="inbutton"><p>Let's eat in!</p><div className="arrow"></div></div></a>
                            </div>
                        </div>
                    </div>
                    <div className={this.state.scroll === 3 ? "secondcardshow" : "secondcard"}>
                        <div className="secondcardcontent">
                            <div className="secondwords">
                                <h1 className="secondcardtitle">The effort not there today?</h1><br/>
                                <h4>I don't blame you, I don't want to cook today either. If having someone else prepare your meal for you is more your style then look no further. Want some gormet pizza? We can get you there. Want some spicy asian food? We have got you covered. Want some cheap and greasy fast food? Hey, I don't judge and yeah, we can get you there. So, put away that "funny" kiss the cook apron and let's get fed.</h4><br/>
                                <a href="/#/out"><div className="outbutton"><div className="arrow"></div><p>Let's eat out!</p></div></a>
                            </div>
                        </div>
                    </div>
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