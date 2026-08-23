import { render, screen, within } from '@testing-library/react';
import App from '../App';

test('renders Global News Stream header', () => {
  render(<App />);
  expect(screen.getByText(/Global News Stream/i)).toBeInTheDocument();
});

test('renders navigation links', () => {
  render(<App />);
  // Scope to the nav: "Live" and "News" also appear in page copy below it.
  const nav = within(screen.getByRole('navigation'));
  ['Home', 'Countries', 'Live', 'Compare', 'News'].forEach((label) => {
    expect(nav.getByRole('link', { name: new RegExp(label, 'i') })).toBeInTheDocument();
  });
});

test('renders search input', () => {
  render(<App />);
  expect(screen.getByPlaceholderText(/Search countries, channels/i)).toBeInTheDocument();
});

test('states real directory totals rather than round numbers', () => {
  render(<App />);
  expect(screen.getByText('Countries Covered')).toBeInTheDocument();
  expect(screen.getByText('Confirmed Channels')).toBeInTheDocument();
  // The old page claimed "50+" and "200+" regardless of what was in the data.
  expect(screen.queryByText('50+')).not.toBeInTheDocument();
  expect(screen.queryByText('200+')).not.toBeInTheDocument();
});
