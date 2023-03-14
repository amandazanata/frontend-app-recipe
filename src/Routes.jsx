import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoritesRecipes from './pages/FavoritesRecipes';
import RecipeDetails from './components/recipeDetails/RecipeDetails';
import RecipeInProgress from './components/recipeInProgress/RecipeInProgress';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } /* não pode possuir header */ />
      <Route exact path="/meals" component={ Meals } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route
        exact
        path="/meals/:id"
        component={ RecipeDetails /* não pode possuir header */ }
      />
      <Route
        exact
        path="/drinks/:id"
        component={ RecipeDetails /* não pode possuir header */ }
      />
      <Route
        exact
        path="/meals/:id/in-progress"
        component={ RecipeInProgress /* não pode possuir header */ }
      />
      <Route
        exact
        path="/drinks/:id/in-progress"
        component={ RecipeInProgress /* não pode possuir header */ }
      />
      <Route
        exact
        path="/profile"
        component={ Profile /* header sem o ícone de pesquisa */ }
      />
      <Route
        exact
        path="/done-recipes"
        component={ DoneRecipes /* header sem o ícone de pesquisa */ }
      />
      <Route
        exact
        path="/favorite-recipes"
        component={ FavoritesRecipes /* header sem o ícone de pesquisa */ }
      />
    </Switch>

  );
}

export default Routes;
