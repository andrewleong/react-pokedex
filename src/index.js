// react / redux / react-router
import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Route } from 'react-router-dom';


// components
import App from './components/App';
import CurrentPokemon from './components/CurrentPokemon';




ReactDOM.render(

      <BrowserRouter>
        <div>
          <Route exact path="/" component={App} />
          <Route exact path="/https://pokeapi.co/api/v2/pokemon/:id" component={CurrentPokemon} />
        </div>
      </BrowserRouter>

  , document.querySelector('.container'));
