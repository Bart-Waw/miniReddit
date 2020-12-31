import { render, screen } from '@testing-library/react';
import App from './App';
import { Display } from './Display'
import {Provider} from 'react-redux';
import { store } from './redux';

test('checks if App displays page title', () => {
  render(<Provider store={store}><App /></Provider>);
  const linkElement = screen.getByText(/miniREDDIT/i);
  expect(linkElement).toBeInTheDocument();
});