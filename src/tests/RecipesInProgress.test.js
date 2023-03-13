import { screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import SearchBarProvider from '../context/SearchBarProvider';
import { LoginProvider } from '../context/LoginProvider';
import { renderWithRouter } from './RenderWithRouter';

describe('testando a renderização da tela de perfil', () => {
  test('testando a renderização geral da página ', async () => {
    renderWithRouter(
      <LoginProvider>
        <SearchBarProvider>
          <App />
        </SearchBarProvider>
      </LoginProvider>,
      { initialEntries: ['/in-progress'] },
    );

    expect(screen.getByTestId('testando')).toBeInTheDocument();
  });
});
