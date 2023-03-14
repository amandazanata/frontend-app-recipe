import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Copys from 'clipboard-copy';
import requestApis from '../../services/requestApis';

import { getLocalStorage, setLocalStorage } from '../../helpers/localStorage';

import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

// const treze = 13;

export default function RecipeDetails() {
  const [msgHtml, setMsgHtml] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  // const [isChecked, setIsChecked] = useState([]);

  const [recipesInProgress, setRecipesInProgress] = useState({});
  const location = useLocation();
  const history = useHistory();

  const id = location.pathname.split('/');
  const url = id[1];

  const chave = url.slice(1, url.length - 1);
  const primeiraLetra = url[0].toUpperCase();
  const imgDinamic = `str${primeiraLetra}${chave}Thumb`;
  const titleName = `str${primeiraLetra}${chave}`;

  const type = url.slice(0, url.length - 1);
  const treze = 13;

  useEffect(() => {
    const pegarDetalhesApi = async () => {
      let redirec;
      if (location.pathname.includes('meals')) {
        redirec = await requestApis(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id[2]}`);
        console.log(redirec);
        // local = JSON.parse(localStorage.getItem('inProgressRecipes')) || [];
      }
      if (location.pathname?.includes('drinks')) {
        redirec = await requestApis(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id[2]}`);
        // local = JSON.parse(localStorage.getItem('inProgressRecipes')) || [];
      }
      return setRecipesInProgress(redirec);
    };
    pegarDetalhesApi();
  }, []);

  const SaveProgressStore = async (ele) => {
    const t = history.push('/done-recipes');
    const favorites = getLocalStorage('doneRecipes') || [];
    setLocalStorage('doneRecipes', [...favorites, ele]);
    console.log(t);
    // setRecipesInProgress(recipesInProgress);
  };

  const savedLocalStorage = (obj) => {
    const favorites = getLocalStorage('favoriteRecipes') || [];
    const existingFavorite = favorites.filter((favorite) => favorite.id === obj.id)[0];
    if (!existingFavorite) {
      setIsFavorite(true);
      // A comida não está favoritada, então vamos adicioná-la
      setLocalStorage('favoriteRecipes', [...favorites, obj]);
    } else {
      setIsFavorite(false);
      // A comida já está favoritada, então vamos removê-la
      const newFavorites = favorites.filter((favorite) => favorite.id !== obj.id);
      setLocalStorage('favoriteRecipes', newFavorites);
    }
  };

  useEffect(() => {
    const isFavorites = getLocalStorage('favoriteRecipes');
    const check = isFavorites.find((e) => e.id === id[2]);
    if (check) {
      console.log('foi');
      setIsFavorite(true);
    }
  }, []);

  /* console.log(isChecked);

  const clickChecked = () => {
    if (isChecked === true) {
      console.log('entrando');
    }
  }; */
  // console.log(location.pathname.split('/')[1]);

  /*  const getLocalProgress = (JSON.parse(localStorage.getItem('inProgressRecipes')));
  const saveIdsLocal = (getLocalProgress.map((ele) => ele.id));
  setIsChecked(saveIdsLocal);
 */
  return (
    <div>
      <h1 data-testid="testando">Recipes in Progress</h1>
      {
        recipesInProgress && recipesInProgress[url]?.map((e, i) => (
          <div key={ i }>
            <h1 data-testid="recipe-title">{e[titleName]}</h1>
            <img
              data-testid="recipe-photo"
              src={ e[imgDinamic] }
              alt={ e[titleName] }
            />
            {
              url === 'drinks' ? (
                <p data-testid="recipe-category">
                  {e.strAlcohoinputc}
                </p>
              )
                : (<p data-testid="recipe-category">{e.strCategory}</p>)
            }
            <p data-testid="instructions">{e.strInstructions}</p>

            {

              Object.entries(e)
                .filter(([key, value]) => key.match(/^strIngredient\d+$/) && value)
                .map(([key, value], index) => {
                  const ingredientNumber = Number(key.slice(treze));
                  const measure = e[`strMeasure${ingredientNumber}`];
                  const ingredientAndMeasure = `${value} - ${measure}`;
                  return (
                    <div
                      data-testid={ `${index}-ingredient-name-and-measure` }
                      key={ key }
                    >
                      <label
                        data-testid={ `${index}-ingredient-step` }
                        htmlFor={ value }
                        style={ { textDecoration: 'line-through' } }
                      >
                        <input
                          type="checkbox"
                          name={ value }
                          // onChange={ isChecked }

                        />
                        {ingredientAndMeasure}

                      </label>
                    </div>
                  );
                })
            }

            <button
              onClick={ () => savedLocalStorage({
                id: id[2],
                type,
                nationality: e.strArea ? e.strArea : '',
                category: e.strCategory,
                alcoholicOrNot: e.strAlcoholic ? e.strAlcoholic : '',
                name: e[titleName],
                image: e[imgDinamic],
              }) }
            >
              <img
                data-testid="favorite-btn"
                src={ !isFavorite ? whiteHeartIcon : blackHeartIcon }
                alt=""
              />

            </button>

            <button
              data-testid="finish-recipe-btn"
              onClick={ () => SaveProgressStore({
                alcoholicOrNot: e.strAlcohoinputc ? e.strAlcohoinputc : '',
                category: e.strCategory,
                doneDate: new Date(),
                id: id[2],
                image: e[imgDinamic],
                name: e[titleName],
                nationality: e.strArea ? e.strArea : '',
                tags: e.strTags.split(''),
                type,
              }) }
            >
              Finish Recipe
            </button>
            <button
              data-testid="share-btn"
              onClick={ () => {
                Copys(`http://localhost:3000${location.pathname.split('/in-progress')[0]}`);
                setMsgHtml(true);
              } }
            >
              compartilhar
            </button>
            {msgHtml && <p>Link copied!</p>}
          </div>
        ))
      }

    </div>
  );
}
