import React, {Component} from 'react';
import '../../reset.css';
import './Favorites.css';
import {connect} from 'react-redux';
import axios from 'axios';
import TextareaAutosize from 'react-autosize-textarea';



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

        this.submitEdit = this.submitEdit.bind(this)
    }

        componentDidMount(){
            const all = axios.get('/api/getfaves')
            .then ( response => {
                console.log('all', response)
                return response.data;
            })

            const rec = axios.get('/api/getfavesrec')
            .then ( response => {
                console.log('recc', response)
                return response.data;
            })

            const res = axios.get('/api/getfavesres')
            .then ( response => {
                console.log('ress', response)
                return response.data;
            })

            axios.all([all, rec, res])
            .then( resp => {
                console.log(resp[0])
                this.setState({
                    all: resp[0],
                    rec: resp[1],
                    res: resp[2]
                })
            })
        }

        deleteFavorite(str){        
            console.log('hi');
            axios.delete('/api/deletefave',{
                name: `${str}`
            })
        }

        submitEdit(){

        }

    render(){
        let list = []
        if(this.state.show === "all"){
            list = this.state.all;
        } else if (this.state.show === "rec"){
            list = this.state.rec;
        } else {
            list === this.state.res;
        }

        const favcards = list.map((v, i, a) => {
            return (
                <div className="cardholder" key={i}>
                    <div className="imgholder">
                        <img src={v.img} alt="" className="imgimg" />
                    </div>
                    <div className="junk">
                        <div className="thisjunk">
                            <h1 className="title">{v.name}</h1>
                            <div className="notes">
                                <h4 className="notestitle">Notes:</h4>
                                <TextareaAutosize rows={6} maxRows={6} value={v.notes} className="notesbox" />
                            </div>
                        </div>
                        <div className="thatjunk">
                            <div className="deletebutton" ></div>
                            <div className="submit">
                                <div className="submitbutton" onClick={this.submitEdit}>Submit</div>
                            </div>
                        </div>
                    </div>
                </div>
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
                        </div>
                    </div>
                    <br />
                    <br />
                    <div className="container">
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