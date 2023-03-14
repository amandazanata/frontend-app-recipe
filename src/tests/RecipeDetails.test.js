import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import SearchBarProvider from '../context/SearchBarProvider';
import { renderWithRouter } from './RenderWithRouter';

describe('testes da tela de SearchBar', () => {
  const favoriteBtnId = 'favorite-btn';
  const shareBtnId = 'share-btn';
  const startRecipeBtnId = 'start-recipe-btn';

  test('testando tela de RecipeDetails ', async () => {
    renderWithRouter(
      <SearchBarProvider>
        <App />
      </SearchBarProvider>,
      { initialEntries: ['/drinks/15997'] },
    );

    const favoriteBtn = await screen.findByTestId(favoriteBtnId);
    expect(favoriteBtn).toBeInTheDocument();
    userEvent.click(favoriteBtn);
    userEvent.click(favoriteBtn);

    const startRecipeBtn = await screen.findByTestId(startRecipeBtnId);
    expect(startRecipeBtn).toBeInTheDocument();
    userEvent.click(startRecipeBtn);
  });

  test('testando tela de RecipeDetails ', async () => {
    renderWithRouter(
      <SearchBarProvider>
        <App />
      </SearchBarProvider>,
      { initialEntries: ['/drinks/15997'] },
    );
    const startRecipeBtn = await screen.findByTestId(startRecipeBtnId);
    expect(startRecipeBtn).toBeInTheDocument();
  });

  it('test button "share"', async () => {
    window.document.execCommand = jest.fn(() => true);
    renderWithRouter(
      <SearchBarProvider>
        <App />
      </SearchBarProvider>,
      { initialEntries: ['/meals/52978'] },
    );
    const share = await screen.findByTestId(shareBtnId);
    userEvent.click(share);
    const text = screen.getByText(/link copied!/i);
    expect(text).toBeInTheDocument();
  });
});
