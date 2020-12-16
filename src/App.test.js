import { render, screen } from '@testing-library/react';
import App from './App';

test('checks if App displays page title', () => {
  render(<App />);
  const linkElement = screen.getByText(/Mini Reddit/i);
  expect(linkElement).toBeInTheDocument();
});
