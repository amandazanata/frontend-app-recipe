import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import SearchBar from './searchBar/SearchBar';

function Header({ namePage }) {
  // namePage para usar como props nas demais páginas para renderizar corretamente o nome das páginas
  const history = useHistory();
  const [isSearch, setIsSearch] = useState(false);

  return (
    <header>
      <section>
        <input
          type="image"
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="human silhouette"
          onClick={ () => history.push('/profile') } // redireciona para o profile
        />
        <h1 data-testid="page-title">{ namePage }</h1>
        {
          (history.location.pathname !== '/profile'
          && history.location.pathname !== '/done-recipes'
          && history.location.pathname !== '/favorite-recipes')
          && (
            <>
              <input
                type="image"
                data-testid="search-top-btn"
                src={ searchIcon }
                alt="desenho de uma lupa"
                onClick={ () => setIsSearch(!isSearch) }
              />
              { isSearch === true && <SearchBar /> }
            </>
          )

        }

      </section>
      {/* //implementa lógica para esconder e mostrar o input de busca. */}
    </header>
  );
}

Header.propTypes = {
  namePage: PropTypes.string,
  renderPage: PropTypes.bool,
}.isRequired;

export default Header;
