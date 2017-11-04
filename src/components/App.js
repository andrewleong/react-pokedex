import React, { Component } from 'react';
import axios from 'axios';
import DisplayPokemonList from './display_pokemonList';


class App extends Component {
  constructor(props){
    super(props);

    this.state = { pokemons: '' }
  }

  render() {
    if(!this.state.pokemons){
      return <div className="loading">Loading...</div>
    }

    return (
      <div>
        <DisplayPokemonList pokemons={ this.state.pokemons } />
      </div>
    );
  }

  componentDidMount(){
     axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=151`)
    .then( res => this.setState({ pokemons: res.data.results }) );
  }
}

export default App;
