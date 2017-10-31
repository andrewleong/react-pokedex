import React, { Component } from 'react';
import axios from 'axios';
import DisplayPokemonList from './display_pokemonList';


class App extends Component {
  constructor(props){
    super(props);

    this.state = { pokemons: [] }
  }

  render() {

    return (
      <div>
        <DisplayPokemonList pokemons={ this.state.pokemons } />
      </div>
    );
  }

  componentDidMount(){
    const request = axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=151`)
    .then( res => this.setState({ pokemons: res.data.results }) );

    if(!request){
      return <div className="loading">Loading...</div>
    }
  }
}

export default App;
