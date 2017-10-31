import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';



class CurrentPokemon extends Component {
  constructor(props){
    super(props);
    this.state = { pokemon: [], pokemonDescription: '' }
  }

  componentDidMount(){
    const request = axios.get(`https://pokeapi.co/api/v1/pokemon/${this.props.match.params.id}`)
    .then( res => this.setState({ pokemon: res.data }) )

    const request_description = axios.get(`https://pokeapi.co/api/v1/pokemon/${this.props.match.params.id}`)
    .then((response) => {
      let descriptionURI = "https://pokeapi.co" + response.data.descriptions[0].resource_uri;
      return axios.get(descriptionURI);
    })
    .then((response) => {
      return this.setState({ pokemonDescription: response.data })
    });
  }

  render(){

    if(!this.state.pokemon || !this.state.pokemonDescription) {
        return <div className="loading">Loading...</div>
    }

    const id = this.props.match.params.id;
    const { pokemon } = this.state;

    let pokeID = pokemon.national_id;
    let pokeName = pokemon.name;
    let pokeType1 = pokemon.types[0].name;
    let pokeType2;
      if (pokemon.types.length === 2) {
          pokeType2 = pokemon.types[1].name;
        }else {
          pokeType2 = null;
      }

    let pokeAttack = pokemon.attack;
    let pokeDefense = pokemon.defense;
    let pokeSpeed = pokemon.speed;
    let pokeWeight = pokemon.weight;
    let pokeHeight = pokemon.height;
    let pokeHp = pokemon.hp;
    let pokeDescription = this.state.pokemonDescription.description;

    let pokeAbilities = pokemon.abilities.map( (item)=> item.name );
    let pokeEggGroup = pokemon.egg_groups.map( (item)=> item.name );

    let pokeEvolution = pokemon.evolutions;
    let pokeEvolutionTo = [...new Set(pokeEvolution.map( (item)=> item.to ) )];
    let pokeEvolutionLevel = [...new Set(pokeEvolution.map( (item)=> item.level ) )];
    let pokeEvolutionMethod = [...new Set(pokeEvolution.map( (item)=> item.method ) )];
    let pokeMoves = pokemon.moves.map( (item) => item.name);

    if(pokeEvolution.length === 0){
        pokeEvolutionTo = null;
        pokeEvolutionLevel = null;
        pokeEvolutionMethod = null;
    }else if(!pokeEvolutionTo){
        pokeEvolutionTo = null;
    }else if (typeof pokeEvolutionLevel[0] === 'undefined' || pokeEvolutionLevel === null){
        pokeEvolutionLevel = null;
    }

    console.log(pokeMoves);

    console.log(pokemon);

    return(
    <div className="content-container row">
      <div className="col col-md-4">
        <div className="col-md-12 text-center img-box"><img src={`/sprites/pokemon/model/${id}.png`} alt="" /></div>

        <div className="col-md-12 text-center border-list poke-id">#{pokeID}</div>
        <div className="col-md-12 text-center border-list">{pokeName}</div>
        <div className="col-md-12 text-center border-list">Type1: {pokeType1} </div>
        { pokeType2 ? <div className="col-md-12 text-center border-list">Type2: {pokeType2}</div> : null }
        <div className="col-md-12 text-center border-list">Health: {pokeHp} <i className="fa fa-heart-o" aria-hidden="true"></i></div>
        <div className="col-md-12 text-center border-list">Weight: {pokeWeight}kg</div>
        <div className="col-md-12 text-center border-list">Height: {pokeHeight}m</div>
      </div>

      <div className="col">
          <div className="col-md-12">
              <div className="card card-poke-description">
                <div className="card-block">
                  <div className="card-text"><span className="font">Description: </span> {pokeDescription} </div>
                </div>
              </div>
          </div>

          <div className="col-md-12">
                <div className="card card-poke-species">
                    <div className="card-block">
                        <div className="card-text"><span className="font">Species: </span>{pokeEggGroup.join(' , ')} </div>
                    </div>
                    <div className="card-block">
                        <div className="card-text"><span className="font">Abilities: </span>{pokeAbilities.join(' , ')}</div>
                    </div>
                </div>
          </div>

          <div className="col-md-12">
              <div className="card card-poke-stats">
                <div className="row">
                    <div className="card-block">
                        <div className="col-md-10"><span className="font">Attack: </span> {pokeAttack}</div>
                    </div>
                    <div className="card-block">
                        <div className="col-md-10"><span className="font">Defense: </span> {pokeDefense}</div>
                    </div>
                    <div className="card-block">
                        <div className="col-md-10"><span className="font">Speed: </span> {pokeSpeed}</div>
                    </div>
                </div>
              </div>
          </div>

          <div className="col-md-12">
              <div className="card card-poke-evolution">
                  { pokeEvolutionTo ? <div className="card-block"><span className="font">Evolve to: </span> {pokeEvolutionTo}</div> : null }
                  { pokeEvolutionLevel ? <div className="card-block"><span className="font">Evolve level: </span> {pokeEvolutionLevel}</div> : null }
                  { pokeEvolutionMethod ? <div className="card-block"><span className="font">Evolve method: </span> {pokeEvolutionMethod}</div> : null }
              </div>
              <div className="col-md-12">
                  <button type="button" className="btn btn-primary btn-lg" data-toggle="modal" data-target="#exampleModalLong">List of Moves</button>
              </div>
          </div>
      </div>

      <div className="modal fade" id="exampleModalLong" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
          <div className="modal-dialog" role="document">
               <div className="modal-content">
                     <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLongTitle">List of Moves</h5>
                          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                          </button>
                     </div>

                    <div className="modal-body">
                      { pokeMoves ? pokeMoves.map( (value, i) => <span key={i} className="badge badge-pill badge-info badge-pokemoves">{value}</span> ) : null }
                    </div>
               </div>
          </div>
      </div>

  </div>
    );
  }

}

export default CurrentPokemon;
