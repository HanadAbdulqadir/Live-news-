import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders Global News Stream header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Global News Stream/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders navigation links', () => {
  render(<App />);
  const homeLink = screen.getByText(/Home/i);
  const liveLink = screen.getByText(/Live/i);
  const newsLink = screen.getByText(/News/i);
  const countriesLink = screen.getByText(/Countries/i);
  
  expect(homeLink).toBeInTheDocument();
  expect(liveLink).toBeInTheDocument();
  expect(newsLink).toBeInTheDocument();
  expect(countriesLink).toBeInTheDocument();
});

test('renders search input', () => {
  render(<App />);
  const searchInput = screen.getByPlaceholderText(/Search channels/i);
  expect(searchInput).toBeInTheDocument();
});

test('renders refresh button', () => {
  render(<App />);
  const refreshButton = screen.getByText(/Refresh/i);
  expect(refreshButton).toBeInTheDocument();
});
