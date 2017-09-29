import React, {Component} from 'react';
import './Recipes.css';
import {connect} from 'react-redux';
import {getSelectedRecipeID} from '../../ducks/reducer'

class Recipes extends Component{
    constructor(props){
        super(props)
        this.state = {
            selected: ""
        }
        this.selectRecipe=this.selectRecipe.bind(this);
    }

    selectRecipe(rec){
        this.props.getSelectedRecipeID(rec);
    }
    
    render(){

        const r = this.props.recipesList;
        const rcards = r.map((v, i, a) => {
            return (
                <div key={v.recipe_id}>
                    <p>{v.title}</p>
                    <br />
                    <a href="/#/recipe"><button value={v.recipe_id} onClick={e => {
                        this.selectRecipe(e.target.value)}}>select this one</button></a>
                </div>
            )
        })

        return(
            <div>
                <h1>Recipes page</h1>
                <div>
                {rcards}
                </div>
                <br />
            </div>
        )
    }
}


function mapStateToProps(state){
    return {
        recipesList: state.recipesList,
        selectedRecipeID: state.selectedRecipeID
    }
}

export default connect(mapStateToProps, {getSelectedRecipeID})(Recipes)