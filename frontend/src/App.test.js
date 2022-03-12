import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Zurf Title', () => {
  render(<App />);
  const linkElement = screen.getByText(/Zurf/);
  expect(linkElement).toBeInTheDocument();
});
