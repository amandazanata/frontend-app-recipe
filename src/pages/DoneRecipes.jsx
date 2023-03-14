import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import RecipeCard from '../components/comidas/RecipeCard';

export default function DoneRecipes() {
  const [done, setDone] = useState([]);
  const [clickBtn, setClickBtn] = useState('all');

  const getRecipes = (key, value) => { // pega item no localStorage
    const doneMeals = localStorage.getItem(key) ? JSON
      .parse(localStorage.getItem(key)) : value;
    return doneMeals;
  };

  useEffect(() => { // coloca o item no estado
    const getDone = getRecipes('doneRecipes', []);
    setDone(getDone);
  }, []);

  const showCard = () => { // função com condição de colocar ou não a receita que foi marcada como 'checkada'
    if (getRecipes === null || getRecipes.length < 1) { // se igua a null ou menor que 1 retorna mensagem
      return <span>Termine alguma receita</span>;
    }
    if (clickBtn === 'all') { // faz o map para pegar o card da receita
      return (getRecipes()?.map((meal, index) => (
        <RecipeCard
          key={ meal.id } // requisito 45 - verifica se o card possui os atributos de uma comida
          name={ meal.name }
          id={ meal.id }
          type={ meal.type }
          image={ meal.image }
          category={ meal.category }
          doneDate={ meal.doneDate }
          tags={ meal.tags }
          index={ index }
          nationality={ meal.nationality }
          alcoholicOrNot={ meal.alcoholicOrNotAlc }
        />
      )));
    }
    return (getRecipes.filter((meal) => meal.type === clickBtn).map((meal, index) => ( // faz um filter para mostrar o card da receita que foi realizada
      <RecipeCard
        key={ meal.id } // requisito 45 - verifica se o card possui os atributos de uma comida
        name={ meal.name }
        id={ meal.id }
        type={ meal.type }
        image={ meal.image }
        category={ meal.category }
        doneDate={ meal.doneDate }
        tags={ meal.tags }
        index={ index }
        nationality={ meal.nationality }
        alcoholicOrNot={ meal.alcoholicOrNotAlc }
      />
    )));
  };
  return (
    <>
      <h1 data-testid="page-title">Done Recipes</h1>
      <Header />
      <section>
        <button
          type="button"
          data-testid="filter-by-drink-btn" // data-testid solicitado no read-me
          onClick={ () => setClickBtn('drink') }
        >
          Drinks
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn" // data-testid solicitado no read-me
          onClick={ () => setClickBtn('meal') } // usa o click do estado para verificar o recebimento
        >
          Meals
        </button>
        <button
          type="button"
          data-testid="filter-by-all-btn" // data-testid solicitado no read-me
          onClick={ () => setClickBtn('all') } // usa o click do estado para verificar o recebimento
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
        })}
      </div>
      <ul>
        { showCard() }
      </ul>
    </>
  );
}
