import React, {Component} from 'react';
import './Recipe.css';
import {connect} from 'react-redux';
import axios from 'axios';
import {setRecipe} from '../../ducks/reducer'

class Recipe extends Component{
    constructor(props){
        super(props)
        this.state = {
            doIt: true
        }
        this.getRecipe=this.getRecipe.bind(this);
    }
    

    getRecipe(){

        axios.get(`http://food2fork.com/api/get?key=6567b231491290ae92e3a731730b6723&rId=${this.props.selectedRecipeID}`)
        .then ( response => {
            this.props.setRecipe(response.data.recipe);
            console.log(response.data.recipe)
        })
        this.setState({
            doIt: false
        })
    }
    
   
    render(){
        this.props.selectedRecipeID && this.state.doIt === true ? this.getRecipe() : null;
        return(
             <div>
                 <h1>Recipe Page</h1>
                 {this.props.selectedRecipe.title}
            </div>
        )
    }
}


function mapStateToProps(state){
    return {
        selectedRecipeID: state.selectedRecipeID,
        selectedRecipe: state.selectedRecipe
    }
}

export default connect(mapStateToProps, {setRecipe})(Recipe)