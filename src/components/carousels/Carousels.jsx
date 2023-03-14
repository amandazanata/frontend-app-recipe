import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
// import Carousel from 'react-bootstrap/Carousel';
import styles from './Carousels.module.css';

// import { Swiper, SwiperSlide } from 'swiper/react';
// import { A11y, Navigation, Pagination } from 'swiper';

// /* ESTILOS */
// // eslint-disable-next-line import/no-unresolved
// import 'swiper/css';
// // eslint-disable-next-line import/no-unresolved
// import 'swiper/css/navigation';
// // eslint-disable-next-line import/no-unresolved
// import 'swiper/css/pagination';

import requestApis from '../../services/requestApis';
// variaveis
const cinco = 5;

export default function Carousels() {
  const location = useLocation();
  const [recomeda, setRecomeda] = useState([]);

  // const [slide, setSlide] = useState(0);

  const id = location.pathname.split('/');

  const url = (id[1] === 'meals' ? 'drinks' : 'meals');/* Usando para deixa a renderização dos detalhes dinamica, de acordo co a url */
  // console.log(url);

  // Crinado linke de img dinamico para meals/drinks.
  const chave = url.slice(1, url.length - 1); // retirando a ultima letra.
  const primeiraLetra = url[0].toUpperCase(); // deixando maiuscula.
  // console.log(primeiraLetra);
  const imgDinamic = `str${primeiraLetra}${chave}Thumb`; // criando chave dinamica.
  const titleName = `str${primeiraLetra}${chave}`; // para o titulo.

  //  Traz as recomendações
  const recomendacoes = async () => {
    let dadosRecomedacoes;
    if (location.pathname.includes('meals')) {
      dadosRecomedacoes = await requestApis('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      // console.log(redirec);
    }
    if (location.pathname?.includes('drinks')) {
      dadosRecomedacoes = await requestApis('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    }
    return setRecomeda(dadosRecomedacoes);
  };

  // recomendacoes();
  useEffect(() => {
    recomendacoes();
    // console.log(recomeda);
  }, []);

  // console.log(recomeda[url]);
  // console.log(imgDinamic);

  // const handleSelect = (selectedIndex, e) => {
  //   setSlide(selectedIndex);
  // };

  return (
    <div>
      {/* <Swiper
        modules={ [Navigation, Pagination, A11y] }
        spaceBetween={ 50 }
        slidesPerView={ 2 }
        navigation
        pagination={ { clickable: true } }
      >
        {
          recomeda[url]?.map((e, i) => (i <= cinco && (
            <SwiperSlide key={ i }>
              <div data-testid={ `${i}-recommendation-card` }>
                <h1
                  data-testid={ `${i}-recommendation-title` }
                >
                  <p>{ `${i}-recommendation-card` }</p>
                  {e[titleName]}
                </h1>
                <img src={ e[imgDinamic] } alt="foto da comida" />
              </div>
            </SwiperSlide>
          )))
        }
      </Swiper> */}
      {/* <div className="carousel">
        {recomeda[url]?.map((e, i) => (i <= cinco && (
          <div key={ i } data-testid={ `${i}-recommendation-card` }>
            <h1
              data-testid={ `${i}-recommendation-title` }
            >
              <p>{ `${i}-recommendation-card` }</p>
              {e[titleName]}
            </h1>
            <img src={ e[imgDinamic] } alt="foto da comida" />
          </div>
        )))}
      </div> */}

      {/* <Carousel>
        {recomeda[url]?.map((e, i) => (i <= cinco && (
          <Carousel.Item key={ i }>
            <div data-testid={ `${i}-recommendation-card` }>

            <img src={ e[imgDinamic] } alt="foto da comida" />
            <Carousel.Caption>
              <h1
                data-testid={ `${i}-recommendation-title` }
              >
                <p>{ `${i}-recommendation-card` }</p>
                {e[titleName]}
              </h1>
            </Carousel.Caption>
            </div>
          </Carousel.Item>
        )))}
      </Carousel> */}

      {/* <Carousel
        className="w-100"
        // slide
        // interval={ null }
        onSelect={ handleSelect }
        activeIndex={ slide }
        controls
        wrap
      >
        {recomeda[url]?.map((element, index) => (

          <Carousel.Item key={ index }>
            <div data-testid={ `${index}-recommendation-card` }>
              <div className="w-50">
                <img
                  // className="recommended_img d-block w-50"
                  src={ element[imgDinamic] }
                  alt=""
                />
                <Carousel.Caption>
                  teste
                </Carousel.Caption>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel> */}

      <div className={ styles.carrosel }>
        {recomeda[url]?.map((e, i) => (i <= cinco && (
          <div
            key={ i }
            data-testid={ `${i}-recommendation-card` }
            className={ styles.carroselitem }
          >
            <h1
              data-testid={ `${i}-recommendation-title` }
            >
              <p>{ `${i}-recommendation-card` }</p>
              {e[titleName]}
            </h1>
            <img
              className={ styles.carroselImg }
              src={ e[imgDinamic] }
              alt="foto da comida"
            />
          </div>
        )))}
      </div>

    </div>
  );
}
// https://mui.com/material-ui/react-stepper/#text-with-carousel-effect
