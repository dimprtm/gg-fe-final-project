import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';
import CreatePlaylist from './components/CreatePlaylist';
import { Provider } from 'react-redux';
import store from './store';

test('render All Component', () => {
  render(<Provider store={store}><CreatePlaylist /></Provider>);

  const searchInput = screen.getByRole('textbox');
  const btnSelect = screen.getByRole('button')

  expect(searchInput).toBeInTheDocument();
  expect(btnSelect).toBeInTheDocument();
  userEvent.click(btnSelect);
});
