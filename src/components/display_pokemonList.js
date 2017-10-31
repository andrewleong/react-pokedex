import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PokemonItem from './pokemon_item';

// actions
// import { getPokemonList } from '../actions';

class DisplayPokemonList extends Component {

  constructor(props){
    super(props);
    this.state = { search: '' }
  }

  render(){
    const filterPokemon = this.props.pokemons.filter( (pokemon) => pokemon.name.indexOf(this.state.search) !== -1 )

    return(
      <div>
          <h1>Pokedex for pokemon gen 1</h1>

          <div className="search_bar">
            <form>
                <input placeholder="search pokemon" value={this.state.search} onChange={ this.handleSearch = event => this.setState({ search: event.target.value }) } />
                <i className="search_icon fa fa-search"></i>
            </form>
          </div>

          <div className="loading">Loading...</div>

          <div className="col-xs-6 col-md-12">
            <div className="row">
              { filterPokemon.map( (pokemon)=> {
                // grabbing the id from pokemon's url
                const id = pokemon.url.split("/").slice(-2)[0];

                return ( <PokemonItem key = { id } id = { id } pokemon = { pokemon } /> );

              }) }
            </div>
          </div>

      </div>
    );
  }
}

// function mapStateToProps(state){
//   return {
//     DisplayList: state.DisplayList
//   }
// }
//
// function mapDispatchToProps(dispatch){
//   return bindActionCreators({ getPokemonList },dispatch);
// }

export default DisplayPokemonList;
