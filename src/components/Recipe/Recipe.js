import React, {Component} from 'react';
import './Recipe.css';
import {connect} from 'react-redux';
import axios from 'axios';
import {setRecipe} from '../../ducks/reducer'

class Recipe extends Component{
    constructor(props){
        super(props)
        this.state = {
            doIt: true,
            recipe: {},
            number: ""
        }
        this.selectFavorite=this.selectFavorite.bind(this)
        this.sendIngreds=this.sendIngreds.bind(this)
        this.handleChange=this.handleChange.bind(this)
    }

    componentDidMount(){

        axios.get(`/api/getrecipe/${this.props.match.params.id}`)
        .then ( response => {
            // this.props.setRecipe(response.data.recipe);
            console.log(response.data.recipe)
            this.setState({
                recipe: response.data.recipe
            })
        })

    }

    selectFavorite(){
        axios.post(`/api/postfave/`,{
            type: "recipe",
            busid: `${this.props.match.params.id}`,
            name: `${this.state.recipe.title}`,
            img: `${this.state.recipe.image_url}`,
            notes: " "
         })
    }
    
    sendIngreds(){
        let ingredz = this.state.recipe.ingredients.join("\n")
        axios.post('/api/sendingreds', {
            ingredients: "\n" + ingredz,
            number: this.state.number
        })
    }

    handleChange(str){
        this.setState({
            number: str
        })
    }
   
    render(){

        const ic = () => {
            const icards = this.state.recipe.ingredients.map((v, i, a) => {
                return(
                <li className="ingitem" key={i}>
                    {v}
                </li>)
            })
            return icards;
        }
        
        return(
             <div>
                 {this.state.recipe ? (
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
                                <a href="/auth/logout"><div>Logout</div></a>
                            </div>
                        </div>
                        <div className="container">
                            <div className="leftstuff">
                                <div className="name">
                                    <h1 className="recname">{this.state.recipe.title}</h1>
                                    <h3 className="rating">Social Rank: {this.state.recipe.social_rank}</h3>
                                </div>
                                <div className="ing" >
                                    <div onClick={this.selectFavorite} className="favbutton">FAVORITE?</div>
                                    <h2 className="ingtitle">Ingredients</h2>
                                    <ul className="inglist">
                                        {this.state.recipe.ingredients ? ic() : null}
                                    </ul>
                                    <div>
                                        <input onChange={ e => {this.handleChange(e.target.value)}} placeholder="Enter your phone #" />
                                        <div className="sendbutton" onClick={this.sendIngreds}>Send ingredients to phone</div>
                                    </div>
                                </div>
                            </div>
                            <div className="rightstuff">
                                <div className="fluidmedia">
                                    <iframe
                                        frameBorder="0"
                                        title="map"
                                        src={(this.state.recipe.source_url.slice(0,4) + "s" + this.state.recipe.source_url.slice(4, (this.state.recipe.source_url.length - 1)))}>
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
