import React, {Component} from 'react';
import '../../reset.css';
import './Favorites.css';
import {connect} from 'react-redux';
import axios from 'axios';
import FavoriteCard from '../FavoriteCard/FavoriteCard';
import classNames from 'classnames';



class Favorites extends Component{
    constructor(props){
        super(props)
        this.state = {
            all: [],
            rec: [],
            res: [],
            show: "all",
            edit: ""
        }

        this.getStuff=this.getStuff.bind(this)
        this.handleClick=this.handleClick.bind(this)
    }

        componentDidMount(){
            this.getStuff()
        }

        getStuff(){
            const all = axios.get('/api/getfaves')
            .then ( response => {
                return response.data;
            })

            const rec = axios.get('/api/getfavesrec')
            .then ( response => {
                return response.data;
            })

            const res = axios.get('/api/getfavesres')
            .then ( response => {
                return response.data;
            })

            axios.all([all, rec, res])
            .then( resp => {
                console.log(resp)
                this.setState({
                    all: resp[0],
                    rec: resp[1],
                    res: resp[2]
                })
            })
        }

        deleteFavorite(str){        
            axios.delete(`/api/deletefave/${str}`)
            .then( response => this.getStuff())
        }

        handleClick(str){
            this.setState({
                show: str
            })
        }

    render(){

        let allclass = classNames({
            "radioo": true,
            "alls": true,
            "clickered": this.state.show === "all"
        })

        let recclass = classNames({
            "radioo": true,
            "clickered": this.state.show === "rec"
        })

        let resclass = classNames({
            "radioo": true,
            "ress": true,
            "clickered": this.state.show === "res"
        })

        let list = []
        if(this.state.show === "all"){
            list = this.state.all;
        } else if (this.state.show === "rec"){
            list = this.state.rec;
        } else if (this.state.show === "res"){
            list = this.state.res;
        }

        const favcards = list.map((v, i, a) => {
            return (
                <FavoriteCard favorite={v} getStuff={this.getStuff} key={v.code}/>
            )
        })

        return(
            <div>
                <div className="papaf">
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
                    <br />
                    <br />
                    <div className="container">
                        <div className="radioholders">
                            <form onClick={e => this.handleClick(e.target.value)} className="radios">
                                <label for="all" className={allclass}><input id="all" type="radio" name="filter" value="all"  checked /> All</label>
                                <label for="rec" className={recclass}><input id="rec" type="radio" name="filter" value="rec"  /> Recipes</label>
                                <label for="res" className={resclass}><input id="res" type="radio" name="filter" value="res"  /> Restaurants</label>
                            </form>
                        </div>
                        {favcards}
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

export default connect(mapStateToProps)(Favorites)