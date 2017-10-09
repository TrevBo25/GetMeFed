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
    }

    componentDidMount(){

        axios.get(`http://food2fork.com/api/get?key=6567b231491290ae92e3a731730b6723&rId=${this.props.match.params.id}`)
        .then ( response => {
            this.props.setRecipe(response.data.recipe);
        })

    }
    
   
    render(){

        const ingreds = this.props.selectedRecipe.ingredients ? 
            this.props.selectedRecipe.ingredients.map((v, i, a) => {
                <li className="items" key={i}>
                    {v}
                </li>
            }) : <div>ingredients loading</div>;

        return(
             <div>
                 {this.props.selectedRecipe ? (
                    <div className="paparec">
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
                        <div className="container">
                            <div className="leftstuff">
                                <div className="name">
                                    <h1 className="recname">{this.props.selectedRecipe.title}</h1>
                                    <h3 className="rating">Social Rank: {this.props.selectedRecipe.social_rank}</h3>
                                </div>
                                <div className="ing" >
                                    <h2 className="ingtitle">Ingredients</h2>
                                    <ul className="inglist">
                                        {ingreds}
                                    </ul>
                                </div>
                            </div>
                            <div className="rightstuff">
                                <div className="fluidmedia">
                                    <iframe
                                        frameBorder="0"
                                        title="map"
                                        src={this.props.selectedRecipe.source_url}>
                                    </iframe>
                                </div>
                            </div>
                        </div>
                    </div> 
                 ) : "loading" }
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