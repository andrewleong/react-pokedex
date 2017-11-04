import React, { Component } from 'react';

import PokemonItem from './pokemon_item';

class DisplayPokemonList extends Component {

  constructor(props){
    super(props);
    this.state = { search: '' }
  }

  handleSearch = (event) => {
    this.setState({ search: event.target.value });
  }

  renderPokemonList = () => {
      const filterPokemon = this.props.pokemons.filter( (pokemon) => pokemon.name.indexOf(this.state.search) !== -1 )

      if(filterPokemon.length === 0){
        return <div className="loading">No results found.</div>
      }

      return filterPokemon.map( (pokemon)=> {
        const id = pokemon.url.split("/").slice(-2)[0];
          return (
            <PokemonItem key = { id } id = { id } pokemon = { pokemon } />
          );
      });
  }

  render(){
    return(
      <div>
          <h1>Pokedex for pokemon gen 1</h1>
          <div className="search_bar">
            <form>
                <input placeholder="search pokemon" value={this.state.search} onChange={ this.handleSearch } />
                <i className="search_icon fa fa-search"></i>
            </form>
          </div>

          <div className="col-xs-6 col-md-12">
            <div className="row">
              {this.renderPokemonList()}
            </div>
          </div>

      </div>
    );
  }
}

export default DisplayPokemonList;
