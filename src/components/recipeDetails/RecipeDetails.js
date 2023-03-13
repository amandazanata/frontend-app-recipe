import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
// import SearchBarContext from '../../context/SearchBarContext';
import Copys from 'clipboard-copy';
import requestApis from '../../services/requestApis';
import Carousels from '../carousels/Carousels';

// styles
import styles from './RecipeDetails.module.css';
import { getLocalStorage, setLocalStorage } from '../../helpers/localStorage';

// imgs
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import SearchBarContext from '../../context/SearchBarContext';

const treze = 13;

export default function RecipeDetails() {
  // pegando o id do contexto global
  // const { id } = useContext(SearchBarContext);

  const [msgHtml, setMsgHtml] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // salvando os dados da comidas/bebidas no state local.
  const [detalhesApi, setDetalhesApi] = useState({});
  const location = useLocation();
  const history = useHistory();
  const { setRecipesInProgress } = useContext(SearchBarContext);

  const id = location.pathname.split('/');
  const url = id[1];/* usando para deixa a renderização dos detalhes dinamica, de acordo co a url */
  // console.log(url);
  // console.log(id);

  // Crinado linke de img dinamico para meals/drinks.
  const chave = url.slice(1, url.length - 1); // retirando a ultima letra.
  const primeiraLetra = url[0].toUpperCase(); // deixando maiuscula.
  // console.log(primeiraLetra);
  const imgDinamic = `str${primeiraLetra}${chave}Thumb`; // criando chave dinamica.
  // console.log(imgDinamic);
  const titleName = `str${primeiraLetra}${chave}`; // para o titulo.

  // usando para criar o a chave type do localStorage
  const type = url.slice(0, url.length - 1);

  // ao entra na pagina de datalhes a função executa o didMount e faz a requisição da API usando o id vindo do location.pathname.split('/').
  useEffect(() => {
    const pegarDetalhesApi = async () => {
      let redirec;
      // let local;
      if (location.pathname.includes('meals')) {
        redirec = await requestApis(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id[2]}`);
        // console.log(redirec);
        // local = JSON.parse(localStorage.getItem('inProgressRecipes')) || [];
      }
      if (location.pathname?.includes('drinks')) {
        redirec = await requestApis(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id[2]}`);
        // local = JSON.parse(localStorage.getItem('inProgressRecipes')) || [];
      }
      return setDetalhesApi(redirec);
    };
    pegarDetalhesApi();
    // inProgressRecipes
    // console.log(doneRecipes);
  }, []);

  const inProgressRecipe = async (ele) => {
    const t = history.push(`${location.pathname}/in-progress`);
    const favorites = getLocalStorage('inProgressRecipes') || [];
    // localStorage.setItem('testando', JSON.stringify(detalhesApi));
    const recipesProgress = favorites.filter((favorite) => favorite.id === ele.id)[0];
    if (!recipesProgress) {
      setLocalStorage('inProgressRecipes', [...favorites, ele]);
    }
    console.log(t);
    setRecipesInProgress(detalhesApi);
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
      console.log('deuuuuuuuuuuuuuuuuu');
      setIsFavorite(true);
    }
  }, []);

  return (
    <div>
      RecipeDetails
      {
        detalhesApi && detalhesApi[url]?.map((e, i) => (
          <div key={ i }>
            <h1 data-testid="recipe-title">{e[titleName]}</h1>
            <img
              data-testid="recipe-photo"
              src={ e[imgDinamic] }
              alt={ e[titleName] }
            />
            {/* Abaixo estou deixando apreer ou alcolico ou categoria */}
            {
              url === 'drinks' ? (
                <p data-testid="recipe-category">
                  {e.strAlcoholic}
                </p>
              )
                : (<p data-testid="recipe-category">{e.strCategory}</p>)
            }
            <p data-testid="instructions">{e.strInstructions}</p>
            {/* UL...
            Pegando o strIngredient apenas quando ela tiver algum valor definido em cada objeto do array, podemos utilizar a função Object.entries() para obter um array de todas as chaves e valores de um objeto. Em seguida, é possível utilizar o método filter() para filtrar apenas as chaves que começam com "strIngredient" e que possuem um valor definido.
            estou criando uma lista (<ul>) com todos os ingredientes que possuem um valor definido no objeto meal. Note que usei a função startsWith() para verificar se a chave começa com "strIngredient", já que existem outras chaves no objeto que começam com "str" e não representam ingredientes. Também utilizei o valor da chave como key para cada elemento <li>
             */}
            {Object.entries(e)
              .filter(([key, value]) => key.match(/^strIngredient\d+$/) && value)
              .map(([key, value], index) => {
                const ingredientNumber = Number(key.slice(treze));
                const measure = e[`strMeasure${ingredientNumber}`];
                const ingredientAndMeasure = `${value} - ${measure}`;
                return (
                  <li
                    data-testid={ `${index}-ingredient-name-and-measure` }
                    key={ key }
                  >
                    {ingredientAndMeasure}
                  </li>
                );
              }) }
            {/* Este código renderiza uma lista de ingredientes de uma receita. explicando cada linha:
              01- {Object.entries(e) - Cria um array com as entradas do objeto e, que representa os detalhes da receita.
              02- .filter(([key, value]) => key.match(/^strIngredient\d+$/) && value) - Filtra o array de entradas para que apenas as entradas cujas chaves começam com "strIngredient" e cujos valores não são nulos ou vazios sejam incluídas no novo array.
              03- .map(([key, value], index) => { - Cria um novo array a partir do array filtrado acima, mapeando cada entrada do array para um elemento <li> da lista de ingredientes. O parâmetro index representa o índice atual do elemento no array.
              ISSO  [key, value] ?
              estamos desestruturando cada elemento do array retornado pelo filter() em duas variáveis, key e value, que representam, respectivamente, a chave e o valor da propriedade correspondente a cada ingrediente e sua medida.
              04- const ingredientNumber = Number(key.slice(treze)); - Extrai o número do ingrediente da chave do objeto e.
              05- const measure = e[strMeasure${ingredientNumber}]; - Obtém a medida do ingrediente no objeto e, usando o número do ingrediente.
              No código, a linha const measure = e[strMeasure${ingredientNumber}]; está usando a interpolação de string para construir a chave correta dinamicamente. Ou seja, o valor da variável ingredientNumber é concatenado com a string "strMeasure" para formar a chave correta.
              Por exemplo, se ingredientNumber for igual a 1, a chave gerada será "strMeasure1". Se ingredientNumber for igual a 2, a chave gerada será "strMeasure2", e assim por diante.
              06- const ingredientAndMeasure = ${value} - ${measure}; - Cria uma string com o nome do ingrediente e a medida.
              07- <li data-testid={ ${index}-ingredient-name-and-measure } key={ key }>{ingredientAndMeasure}</li> - Renderiza um elemento <li> da lista de ingredientes, com um data-testid dinâmico que inclui o índice do elemento, a chave do objeto e como chave e o nome do ingrediente e a medida como conteúdo.
            */}
            {/* POR QUE O NÚMERO 13 ?
              O número 13 é utilizado nessa linha de código:
              ***const ingredientNumber = Number(key.slice(treze));***
              Essa linha está extraindo o número do final da chave que começa com "strIngredient". Por exemplo, se a chave for "strIngredient3", o número extraído seria o 3.
              O número 13 é utilizado nessa função slice() porque as chaves "strIngredient" têm 13 caracteres. Portanto, a função slice() começa a partir do 13º caractere e extrai o restante da string, que é o número do ingrediente.
            */}
            {
              e.strYoutube
              && (
                <div data-testid="video">
                  <iframe
                    width="560"
                    height="315"
                    src={ `https://www.youtube.com/embed/${e.strYoutube.split('=')[1]}` }
                    title="YouTube video player"
                    allow="accelerometer;
                    autoplay;
                    clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )
            }
            {/* Requisito 34 criando o obj pedido */}
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
              className={ styles.startRecipe }
              data-testid="start-recipe-btn"
              onClick={ () => inProgressRecipe({
                id: id[2],
                type,
                nationality: e.strArea ? e.strArea : '',
                category: e.strCategory,
                alcoholicOrNot: e.strAlcoholic ? e.strAlcoholic : '',
                name: e[titleName],
                image: e[imgDinamic],
                instructions: e.strInstructions,
                ingred: Object.entries(e)
                  .filter(([key, value]) => key.match(/^strIngredient\d+$/) && value)
                  .map(([key, value], index) => {
                    const ingredientNumber = Number(key.slice(treze));
                    const measure = e[`strMeasure${ingredientNumber}`];
                    const ingredientAndMeasure = `${value} - ${measure}`;
                    return (
                      <li key={ index }>
                        {ingredientAndMeasure}
                      </li>
                    );
                  }),
              }) }

            >
              Continue Recipe
            </button>
            <button
              data-testid="share-btn"
              onClick={ () => {
                Copys(`http://localhost:3000${location.pathname}`);
                setMsgHtml(true);
              } }
            >

              compartilhar
            </button>
            {msgHtml && <p>Link copied!</p>}
          </div>
        ))
      }
      <Carousels />
    </div>
  );
}
