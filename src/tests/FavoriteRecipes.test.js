import React from 'react';
import { screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from './RenderWithRouter';

const url = '/favorite-recipes';
const mealImage = '0-horizontal-image';

describe('Teste as funcionalidades da página de receitas favoritas', () => {
  test('Verifica se é possível favoritar uma comida', async () => {
    const { history } = renderWithRouter(
      <App />,
    );
    act(() => {
      history.push('/meals/52977');
    });
    await waitFor(() => {
      const cardMeal = screen.getByTestId('recipe-photo');
      expect(cardMeal).toBeInTheDocument();
      const favoriteBtn = screen.getByTestId('favorite-btn');
      userEvent.click(favoriteBtn);
    });
  });
  test('Verifica se é possível favoritar uma bebida', async () => {
    const { history } = renderWithRouter(
      <App />,
    );
    act(() => {
      history.push('/drinks/15997');
    });
    await waitFor(() => {
      const favoriteBtn = screen.getByTestId('favorite-btn');
      userEvent.click(favoriteBtn);
    });
  });
  test('Verifica se ao clicar nos botões meal, drink e all, a página é renderizada corretamente', () => {
    const { history } = renderWithRouter(
      <App />,
    );
    act(() => {
      history.push(url);
    });
    const mealBtn = screen.getByTestId('filter-by-meal-btn');
    const drinkBtn = screen.getByTestId('filter-by-drink-btn');
    const allBtn = screen.getByTestId('filter-by-all-btn');
    const ImageCard = screen.getByTestId(mealImage);
    userEvent.click(mealBtn);
    expect(ImageCard).toBeInTheDocument();
    userEvent.click(allBtn);
    expect(ImageCard).toBeInTheDocument();
    userEvent.click(drinkBtn);
    expect(ImageCard).not.toBeInTheDocument();
  });
  test('Verifica a renderização da imagem, nome, tipo de receita e sua data de criação', () => {
    const { history } = renderWithRouter(
      <App />,
    );
    act(() => {
      history.push(url);
    });
    const image = screen.getByTestId(mealImage);
    const name = screen.getByTestId('0-horizontal-name');
    const type = screen.getByTestId('0-horizontal-top-text');
    const date = screen.getByTestId('0-horizontal-done-date');
    expect(image).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(type).toBeInTheDocument();
    expect(date).toBeInTheDocument();
  });
  test('Verifica a existência do botão de compartilhar e do texto indicando que o link foi copiado', () => {
    const { history } = renderWithRouter(
      <App />,
    );
    act(() => {
      history.push(url);
    });
    const mockedWriteText = jest.fn();

    navigator.clipboard = {
      writeText: mockedWriteText,
    };
    const shareBtn = screen.getByTestId('0-horizontal-share-btn');
    userEvent.click(shareBtn);
    expect(mockedWriteText).toHaveBeenCalled();
  });
  test('Verifica se ao clicar no nome da receita, é direcionado para sua página', async () => {
    const { history } = renderWithRouter(
      <App />,
    );
    act(() => {
      history.push(url);
    });
    const linkCard = screen.getByRole('link', { name: /corba/i });
    userEvent.click(linkCard);
    await waitFor(() => {
      const card = screen.getByTestId('recipe-photo');
      expect(card).toBeInTheDocument();
    });
  });
  test('Verifica se é possível desfavoritar uma receita', () => {
    const { history } = renderWithRouter(
      <App />,
    );
    act(() => {
      history.push(url);
    });
    const favoriteCard = screen.getByTestId(mealImage);
    expect(favoriteCard).toBeInTheDocument();
    const unfavoriteBtn = screen.getByTestId('0-horizontal-favorite-btn');
    userEvent.click(unfavoriteBtn);
    expect(favoriteCard).not.toBeInTheDocument();
  });
});
