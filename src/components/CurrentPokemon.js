import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';



class CurrentPokemon extends Component {
  constructor(props){
    super(props);
    this.state = { pokemon: '', pokemonSpecies: '', pokemonEvolution: '' }
  }
  // http://pokeapi.salestock.net/api/v2/pokemon-species/1/
  componentDidMount(){
    axios.get(`https://pokeapi.co/api/v2/pokemon/${this.props.match.params.id}`)
    .then( res => this.setState({ pokemon: res.data }) )

    axios.get(`https://pokeapi.co/api/v2/pokemon-species/${this.props.match.params.id}`)
    .then((response) => {
      this.setState({ pokemonSpecies: response.data })
      let evolution = response.data.evolution_chain.url;
      return axios.get(evolution);

  })
    .then((response) => this.setState({ pokemonEvolution: response.data }) )
  }

  renderCurrentPokemon = () => {
    if(this.state.pokemon && this.state.pokemonSpecies && this.state.pokemonEvolution ){
      const id = this.props.match.params.id;
      const { pokemon, pokemonSpecies, pokemonEvolution } = this.state;

      let pokeID = pokemon.id;
      let pokeName = pokemon.name;
      let pokeType1 = pokemon.types[0].type.name;
      let pokeType2;
        if (pokemon.types && pokemon.types.length === 2) {
            pokeType2 = pokemon.types[1].type.name;
        } else {
            pokeType2 = null;
        }
      let pokeHpName = pokemon.stats[5].stat.name;
      let pokeHp = pokemon.stats[5].base_stat;
      let pokeAttackName = pokemon.stats[4].stat.name;
      let pokeAttack = pokemon.stats[4].base_stat;
      let pokeDefenseName = pokemon.stats[3].stat.name;
      let pokeDefense = pokemon.stats[3].base_stat;
      let pokeSpeedName = pokemon.stats[0].stat.name;
      let pokeSpeed = pokemon.stats[0].base_stat;
      let pokeWeight = pokemon.weight;
      let pokeHeight = pokemon.height;
      let pokeAbilities = pokemon.abilities.map( (item)=> item.ability.name );
      let pokeDescriptionFireRed = pokemonSpecies.flavor_text_entries.filter( (item) => item.version.name === 'firered');
      let pokeDescription = pokeDescriptionFireRed[0].flavor_text;
      let pokeEggGroup = pokemonSpecies.egg_groups.map( (item)=> item.name );

      let pokeEvolution1;
      let pokeEvolution1id;
      let pokeEvolution2;
      let pokeEvolution2id;
      let pokeEvolution3;
      let pokeEvolution3id;

      let pokeEvolutionLevel1;
      let pokeEvolutionLevel2;

      let pokeEvolutionMethod1;
      let pokeEvolutionMethod2;

        try {
          pokeEvolution1 = pokemonEvolution.chain.species.name;
          pokeEvolution1id = pokemonEvolution.chain.species.url.split("/").slice(-2)[0];
        } catch(e) {
          pokeEvolution1 = null;
        }

        try {
          pokeEvolution2 = pokemonEvolution.chain.evolves_to[0].species.name;
          pokeEvolution2id = pokemonEvolution.chain.evolves_to[0].species.url.split("/").slice(-2)[0];
        } catch(e) {
          pokeEvolution2 = null;
        }

        try {
          pokeEvolution3 = pokemonEvolution.chain.evolves_to[0].evolves_to[0].species.name;
          pokeEvolution3id = pokemonEvolution.chain.evolves_to[0].evolves_to[0].species.url.split("/").slice(-2)[0];
        } catch(e) {
          pokeEvolution3 = null;
        }

        try {
          pokeEvolutionLevel1 = pokemonEvolution.chain.evolves_to[0].evolution_details[0].min_level;
        } catch(e) {
          pokeEvolutionLevel1 = null;
        }

        try {
          pokeEvolutionLevel2 = pokemonEvolution.chain.evolves_to[0].evolves_to[0].evolution_details[0].min_level;
        } catch(e) {
          pokeEvolutionLevel2 = null;
        }

        try {
          pokeEvolutionMethod1 = pokemonEvolution.chain.evolves_to[0].evolution_details[0].trigger.name;
        } catch(e) {
          pokeEvolutionMethod1 = null;
        }

        try {
          pokeEvolutionMethod2 = pokemonEvolution.chain.evolves_to[0].evolves_to[0].evolution_details[0].trigger.name;
        } catch(e) {
          pokeEvolutionMethod2 = null;
        }


      let pokeMoves = pokemon.moves.map( (item) => item.move.name);

      // console.log(pokemonEvolution.chain.evolves_to[0].evolves_to[0].species.url.split("/").slice(-2)[0]);
      console.log(pokeEvolution1id);
      console.log(pokeEvolution2id);
      console.log(pokeEvolution3id);
        return (
          <div className="content-container row">
              <div className="col col-md-4">
                  <div className="col-md-12 text-center img-box"><img className="img-fluid" src={`/sprites/pokemon/other-sprites/official-artwork/${id}.png`} alt="" /></div>

                  <div className="col-md-12 text-center border-list poke-id">#{pokeID}</div>
                  <div className="col-md-12 text-center border-list">{pokeName}</div>
                  <div className="col-md-12 text-center border-list">Type1: {pokeType1} </div>
                  { pokeType2 ? <div className="col-md-12 text-center border-list">Type2: {pokeType2}</div> : null }
                  <div className="col-md-12 text-center border-list">Health: {pokeHp} <i className="fa fa-heart-o" aria-hidden="true"></i></div>
                  <div className="col-md-12 text-center border-list">Weight: {pokeWeight}kg</div>
                  <div className="col-md-12 text-center border-list">Height: {pokeHeight}m</div>
                  <div className="col-md-12 text-center button-moves">
                      <button type="button" className="btn btn-outline-info btn-lg" data-toggle="modal" data-target="#exampleModalLong">List of Moves</button>
                  </div>
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
                                <div className="col-md-10"><span className="font">{pokeAttackName}: </span> {pokeAttack}</div>
                            </div>
                            <div className="card-block">
                                <div className="col-md-10"><span className="font">{pokeDefenseName}: </span> {pokeDefense}</div>
                            </div>
                            <div className="card-block">
                                <div className="col-md-10"><span className="font">{pokeSpeedName}: </span> {pokeSpeed}</div>
                            </div>
                        </div>
                      </div>
                  </div>

                  { pokeEvolution2 || pokeEvolution3 ?
                  <div className="col-md-12">
                      <div className="card card-poke-evolution">
                         <div className="card-block"><span className="font">Evolution: </span>
                             <div className="row" style={{height:"20vh"}}>
                                <div className="col-md-3">
                                  <div><img className="img-responsive" src={`/sprites/pokemon/model/${pokeEvolution1id}.png`} alt="" /></div>
                                  <div style={{textAlign:"center"}}>{pokeEvolution1}</div>
                                </div>

                                <div className="col-md-1"><i className="fa fa-arrow-circle-right fa-2x" style={{lineHeight: "200px",color:"#fff"}} aria-hidden="true"></i></div>

                                <div className="col-md-3">
                                  <div><img className="img-responsive" src={`/sprites/pokemon/model/${pokeEvolution2id}.png`} alt="" /></div>
                                  <div style={{textAlign:"center"}}>{pokeEvolution2}</div>
                                </div>

                              {pokeEvolution3 !== null ?
                                <div className="col-md-1"><i className="fa fa-arrow-circle-right fa-2x" style={{lineHeight: "200px",color:"#fff"}} aria-hidden="true"></i></div>
                              : null }

                             {pokeEvolution3 !== null ?
                                <div className="col-md-3">
                                  <div><img className="img-responsive" src={`/sprites/pokemon/model/${pokeEvolution3id}.png`} alt="" /></div>
                                  <div style={{textAlign:"center"}}>{pokeEvolution3}</div>
                                </div>
                              : null }
                             </div>
                         </div>
                         {pokeEvolutionLevel1 !== null ?
                             <div className="card-block"><span className="font">Evolve level: </span>
                                {`${pokeEvolutionLevel1}`}
                                {pokeEvolutionLevel2 !== null ? ` | ${pokeEvolutionLevel2}` : null }
                             </div>
                        : null }
                          <div className="card-block"><span className="font">Evolve method: </span>
                              {`${pokeEvolutionMethod1}`}
                              {pokeEvolutionMethod2 !== null ? ` | ${pokeEvolutionMethod2}` : null }
                          </div>
                      </div>
                  </div>
                :
                  <div className="col-md-12">
                      <div className="card card-poke-evolution">
                        <div className="card-block"><span className="font">Evolution: </span> This pokemon does not evolve. </div>
                      </div>
                  </div> }

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

  render(){

    if(!this.state.pokemon || !this.state.pokemonSpecies || !this.state.pokemonEvolution) {
        return <div className="loading">Loading...</div>
    }

    // <div className="col-md-12">
    //     <div className="card card-poke-evolution">
    //         { pokeEvolution1 || pokeEvolution2 || pokeEvolution3 ? <div className="card-block"><span className="font">Evolution: </span> {`${pokeEvolution1}`} {`${pokeEvolution2} |`} {`${pokeEvolution3}`}  </div> : null }
    //         { pokeEvolutionLevel1 || pokeEvolutionLevel2 ? <div className="card-block"><span className="font">Evolve level: </span> {`${pokeEvolutionLevel1} |`} {`${pokeEvolutionLevel2}`}</div> : null }
    //         { pokeEvolutionMethod1 || pokeEvolutionMethod2 ? <div className="card-block"><span className="font">Evolve method: </span> {`stage #1 -> stage #2: ${pokeEvolutionMethod1} |`} {`stage #2 -> stage #3: ${pokeEvolutionMethod2}`} </div> : null }
    //     </div>
    // </div>

    //
    // let pokeEvolution = pokemon.evolutions;
    // let pokeEvolutionTo = [...new Set(pokeEvolution.map( (item)=> item.to ) )];
    // let pokeEvolutionLevel = [...new Set(pokeEvolution.map( (item)=> item.level ) )];
    // let pokeEvolutionMethod = [...new Set(pokeEvolution.map( (item)=> item.method ) )];
    // let pokeMoves = pokemon.moves.map( (item) => item.name);
    //
    // if(pokeEvolution.length === 0){
    //     pokeEvolutionTo = null;
    //     pokeEvolutionLevel = null;
    //     pokeEvolutionMethod = null;
    // }else if(!pokeEvolutionTo){
    //     pokeEvolutionTo = null;
    // }else if (typeof pokeEvolutionLevel[0] === 'undefined' || pokeEvolutionLevel === null){
    //     pokeEvolutionLevel = null;
    // }



    return (
        <div>{this.renderCurrentPokemon()}</div>

    );
  }

}



export default CurrentPokemon;
