import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// actions
// search filter
import { filterPokemonFromList } from '../actions';

class SearchBar extends Component{
  constructor(props){
    super(props)
    this.state = { keyword: '' }
  }

  handleTyping = (event) => {
      this.setState({keyword: event.target.value});
      this.props.filterPokemonFromList(this.state.keyword);
  }

  // formSubmit = (event) => {
  //   event.preventDefault();
  //   // this will trigger the action creator
  //   this.props.filterPokemonFromList(this.state.keyword);
  //   // console.log(this.state.keyword);
  // }

  render(){
    return(
      <div>
        <h1>Pokedex for pokemon</h1>
        <h2>Search for your favourite pokemon!</h2>
        // <form id="form" onSubmit={this.formSubmit}>
            
        // </form>
      </div>

    )
  }
}

// // Grabbing the state of my pokemon list
// function mapStateToProps(state){
//   return {
//     DisplayList: state.DisplayLists
//   }
// }

function mapDispatchToProps(dispatch){
  return bindActionCreators({ filterPokemonFromList }, dispatch)
}

export default connect(null,mapDispatchToProps)(SearchBar);
