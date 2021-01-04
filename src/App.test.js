import { render, screen } from '@testing-library/react';
import React from 'react';
import App, { Search } from './App';
import {Provider} from 'react-redux';
import { store } from './redux';

test('checks if App displays page title', () => {
  render(<Provider store={store}><App /></Provider>);
  const linkElement = screen.getByText(/miniREDDIT/i);
  expect(linkElement).toBeInTheDocument();
});

test('checks if App displays input', () => {
  render(<Provider store={store}><App /></Provider>);
  const linkElement = screen.getByRole("textbox");
  expect(linkElement).toBeInTheDocument();
});

test('checks if App displays search button', () => {
  render(<Provider store={store}><App /></Provider>);
  const linkElement = screen.getByText(/SEARCH/i);
  expect(linkElement).toBeInTheDocument();
});
