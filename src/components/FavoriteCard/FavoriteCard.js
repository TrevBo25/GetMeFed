import React, {Component} from 'react';
import '../../reset.css';
import './FavoriteCard.css';
import {connect} from 'react-redux';
import axios from 'axios';



class FavoriteCard extends Component{
    constructor(props){
        super(props)
        this.state = {
            notes: this.props.favorite.notes
        }
        this.submitEdit = this.submitEdit.bind(this)
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            notes: this.props.favorite.notes
        })
    }

    deleteFavorite(str){        
        axios.delete(`/api/deletefave/${str}`)
        .then( response => this.props.getStuff())
    }

   handleChange(str){
       this.setState({
           notes: str
       })
   }

   submitEdit(){
       axios.put('/api/editnote',{
           notes: this.state.notes,
           name: this.props.favorite.name
       }).then( response => this.props.getStuff())
   }
   


    render(){
        let link = "";
        if (this.props.favorite.type === "restaurant"){
            link = `/#/restaurantdirections/${this.props.favorite.code}`
        } else {
            link = `/#/recipe/${this.props.favorite.code}`
        }

        return(
            <div>
                <div className="cardholder">
                    <div className="imgholder">
                        <img src={this.props.favorite.img} alt="" className="imgimg" />
                    </div>
                    <div className="junk">
                        <div className="thisjunk">
                            <a href={link}><h1 className="title">{this.props.favorite.name}</h1></a>
                            <p className="favtype">({this.props.favorite.type})</p>
                            <div className="notes">
                                <h4 className="notestitle">Notes:</h4>
                                <textarea rows="6" cols="60" className="notesbox" onChange={e => {
                                    this.handleChange(e.target.value)}} value={this.state.notes}/>
                            </div>
                        </div>
                        <div className="thatjunk">
                            <div className="deletebutton" onClick={e => {this.deleteFavorite(this.props.favorite.name)}}></div>
                            <div className="submit">
                                <div className="submitbutton" onClick={this.submitEdit}>Submit</div>
                            </div>
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

export default connect(mapStateToProps)(FavoriteCard)