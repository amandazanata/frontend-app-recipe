import React, { useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Typed from 'typed.js';
import LoginContext from '../context/LoginContext';

import styles from './Login.module.css';
import logoRecipesApp from './img/logoRecipesApp.png';
import inicioLogo from './img/inicioLogo.svg';

const timeLoanding = 6000;

export default function Login() {
  const history = useHistory();
  const { email, setEmail, senha, setSenha } = useContext(LoginContext);
  const handleEmail = (valueEmail) => {
    setEmail(valueEmail);
  };
  const handleSenha = (valueSenha) => {
    setSenha(valueSenha);
  };
  const handleClick = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/meals');
  };
  const disableButton = () => {
    const lengthinput = 6;
    const regexValidation = /^([a-z]){1,}([a-z0-9._-]){1,}([@]){1}([a-z]){2,}([.]){1}([a-z]){2,}([.]?){1}([a-z]?){2,}$/i;
    const validation = regexValidation.test(email)
      && senha.length > lengthinput;
    return !validation;
  };

  // Estilos fora a parte do projeto.

  const [showIcon, setShowIcon] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowIcon(false);
    }, timeLoanding);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const el = useRef(null);
  const typed = useRef(null);

  useEffect(() => {
    const options = {
      strings: [
        ' Bem vindo(a)!',
        ' Bem vindo(a)!',
      ],
      typeSpeed: 150,
      backSpeed: 150,
      loop: true,
    };

    typed.current = new Typed(el.current, options);

    return () => {
      typed.current.destroy();
    };
  }, []);

  return (
    <div className={ styles.mainLogin }>
      { showIcon
        ? (
          <div className={ styles.ldsDiv }>
            <img src={ inicioLogo } alt="" />
            <h2>Hey!</h2>
            <h1>
              <span style={ { whiteSpace: 'pre' } } ref={ el } />
            </h1>
            <div className={ styles.lds }>
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
            </div>
          </div>
        )
        : (
        // <h2>LOGIN</h2>
        // <br />
          <div className={ styles.mainLogin }>

            <div className={ styles.backgroundImgDiv }>
              <img
                className={ styles.logoImg }
                src={ logoRecipesApp }
                alt="logotipo"
              />
              {/* <img
                className={ styles.tomateImg }
                src={ tomate }
                alt="tomates"
              /> */}
              {/* <img
                className={ styles.backgroundImg }
                src={ Background }
                alt="Background roxo"
              /> */}
            </div>
            <div className={ styles.inputsBtn }>
              <input
                type="text"
                id="email"
                data-testid="email-input"
                placeholder="Email"
                autoComplete="off"
                onChange={ (e) => { handleEmail(e.target.value); } }
              />

              <input
                type="text"
                id="password"
                autoComplete="off"
                data-testid="password-input"
                placeholder="Password"
                onChange={ (e) => { handleSenha(e.target.value); } }
              />

              <button
                type="button"
                data-testid="login-submit-btn"
                disabled={ disableButton() }
                onClick={ handleClick }
              >
                Enter
              </button>
            </div>
          </div>)}
    </div>

  );
}
