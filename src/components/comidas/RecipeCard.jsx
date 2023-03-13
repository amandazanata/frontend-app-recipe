import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareIcon from '../../images/shareIcon.svg';

export default function RecipeCard({
  index,
  id,
  category,
  name,
  image,
  doneDate,
  tags,
  type,
  nationality,
  alcoholicOrNot,
}) {
  const typeCheck = type === 'meals' ? nationality : alcoholicOrNot;
  const [copyLink, setCopyLink] = useState(false);

  return (
    <li>
      <div>
        <Link key={ id } to={ `/${type}s/${id}` }>
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ image }
            alt={ name }
          />
          <p
            data-testid={ `${index}-horizontal-top-text` }
          >
            {`${typeCheck} - ${category}`}
          </p>
          <p
            data-testid={ `${index}-horizontal-name` }
          >
            { name }
          </p>
          <p
            data-testid={ `${index}-horizontal-done-date` }
          >
            {`Feito em: ${doneDate}`}
          </p>
          <span>
            {tags.map((tag) => (
              <span key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>
                {`${tag}`}
              </span>
            ))}
          </span>
        </Link>
        <div>
          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            alt="Share Icon"
            onClick={ () => {
              navigator.clipboard.writeText(`${window.location.origin}/${type}s/${id}`);
              setCopyLink(true);
            } }
          >
            Compartilhar
          </button>
          { copyLink && <small>Link copied!</small>}
        </div>
      </div>
    </li>
  );
}

RecipeCard.propTypes = {
  id: PropTypes.number,
  img: PropTypes.string,
  name: PropTypes.string,
  index: PropTypes.number,
}.isRequired;
