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
    
    // <a href={`/#/recipe/${v.recipe_id}`}><button value={v.recipe_id} onClick={e => {
    //     }}>select this one</button></a>

    render(){

        const r = this.props.recipesList;
        const rcards = r.map((v, i, a) => {
            return (
                <div className="cardholder" key={v.recipe_id}>
                    <div className="recimg">
                        <img src={`${v.image_url}`} alt="" className="imgimg" />
                    </div>
                    <div className="cards" >
                        <h1 className="cardtitle">{v.title}</h1>
                        <div className="junk">
                            <div className="junkleft">
                                <div className="rating">
                                    <h3 className="publisher">Publisher: {v.publisher}</h3>                                
                                    <h4 className="rat">Social Rank: {v.social_rank.toString().substring(0,4)}</h4>
                                </div>
                                <a href={`/#/recipe/${v.recipe_id}`}><div value={v.recipe_id} onClick={e => {
                                    }} className="selectbutton">Select this recipe</div></a>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
        
        return(
            <div>
                <div className="paparecs">
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
                    <br/>
                    <br/>
                    <div className="content">
                        {rcards}
                    </div>
                </div>
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