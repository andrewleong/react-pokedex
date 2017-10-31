import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class PokemonItem extends Component {

  render(){
    const {id, pokemon} = this.props;

    return(

      <div key={id} className="col-sm-4">
          <Link to={`https://pokeapi.co/api/v2/pokemon/${id}/`}>
              <div className="card each-card">
                  <img className="card-img-top img-responsive" src={`/sprites/pokemon/other-sprites/official-artwork/${id}.png`} alt="" />
                      <div className="card-block">
                        <h4 className="card-title card-action">#{id}, {pokemon.name}</h4>
                      </div>
              </div>
          </Link>
      </div>


    )
  }
}

export default PokemonItem;
