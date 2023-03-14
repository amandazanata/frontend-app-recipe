import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import Header from '../components/Header';
import { getLocalStorage, setLocalStorage } from '../helpers/localStorage';

export default function FavoritesRecipes() {
  const [done, setDone] = useState([]);
  const [clickBtn, setClickBtn] = useState('all');
  const [copyLink, setCopyLink] = useState(false);
  const [seMuda, setSeMuda] = useState([]);

  const getRecipes = (key, value) => {
    const doneFavorites = localStorage.getItem(key) ? JSON
      .parse(localStorage.getItem(key)) : value;
    return doneFavorites;
  };
  const removeLocalStorage = (obj) => {
    const favorites = getLocalStorage('favoriteRecipes') || [];
    const newFavorites = favorites.filter((favorite) => favorite.id !== obj.id);
    setLocalStorage('favoriteRecipes', newFavorites);
    setSeMuda(newFavorites);
  };
  // const filterFavorite = (value) => {
  //   const favorites = getLocalStorage('favoriteRecipes') || [];
  //   const teste = favorites.filter((nome) => nome.type === value);
  //   return teste;
  // };

  useEffect(() => {
    const getDone = getRecipes('favoriteRecipes', []);
    setDone(getDone);
  }, [seMuda]);

  return (
    <>
      <h1 data-testid="page-title">Favorite Recipes</h1>
      <Header />
      <section>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ () => { setClickBtn('meal'); } }
        >
          Meals
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => setClickBtn('drink') }
        >
          Drinks
        </button>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setClickBtn('all') }
        >
          All
        </button>
      </section>

      <div>
        {done.filter((value) => {
          switch (clickBtn) {
          case 'meal':
            return value.type === 'meal';
          case 'drink':
            return value.type === 'drink';
          default:
            return value;
          }
        }).map((recipe, index) => (
          <div key={ recipe.id }>
            <Link
              to={ `/${recipe.type}s/${recipe.id}` }
            >
              <img
                width="250px"
                data-testid={ `${index}-horizontal-image` }
                src={ recipe.image }
                alt={ recipe.id }
              />
            </Link>
            <Link
              to={ `/${recipe.type}s/${recipe.id}` }
              data-testid={ `${index}-horizontal-name` } // data-testid solicitado no read-me
            >
              { recipe.name }
            </Link>
            {
              recipe.type === 'meal' ? (
                <p
                  data-testid={ `${index}-horizontal-top-text` } // data-testid solicitado no read-me / requisito 45 e 46
                >
                  {`${recipe.nationality} - ${recipe.category}`}
                </p>)
                : (
                  <p
                    data-testid={ `${index}-horizontal-top-text` } // data-testid solicitado no read-me
                  >
                    {recipe.alcoholicOrNot}
                  </p>)
            }
            <p
              data-testid={ `${index}-horizontal-done-date` } // data-testid solicitado no read-me
            >
              { `Feito em: ${recipe.doneDate} ` }
            </p>
            {copyLink === true && <p>Link copied!</p>}
            <button
              onClick={ () => {
                navigator.clipboard.writeText(`http://localhost:3000/${recipe.type}s/${recipe.id}`); // precisei dessa sintaxe mais moderna para passar no teste
                setCopyLink(true);
              } }
            >
              <img
                data-testid={ `${index}-horizontal-share-btn` } // data-testid solicitado no read-me
                src={ shareIcon }
                alt="Share Icon"
              />
            </button>
            <button
              type="button"
              onClick={ () => { removeLocalStorage(recipe); } }
            >
              <img
                data-testid={ `${index}-horizontal-favorite-btn` }
                src={ blackHeartIcon }
                alt="Share Icon"
              />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
