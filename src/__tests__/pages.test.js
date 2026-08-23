import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import HomeTab from '../HomeTab';
import LivePage from '../LivePage';
import CountriesList from '../CountriesList';
import CountryPage from '../CountryPage';
import { getSourcesByContinent, getLiveStreams } from '../globalNewsData';

// The shape App.js actually hands these pages: continents of flattened sources.
// Rendering with real directory data is the point — an empty array exercises
// nothing, which is how a missing `language` field reached the browser.
const realCategories = () =>
  Object.entries(getSourcesByContinent())
    .map(([continent, countries]) => ({
      id: continent.toLowerCase().replace(/\s+/g, '-'),
      title: continent,
      sources: countries.flatMap((country) =>
        country.sources.map((source) => ({
          ...source,
          country: country.name,
          flag: country.flag,
          continent,
        }))
      ),
    }))
    .filter((category) => category.sources.length > 0);

const withRouter = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>);

describe('pages render against the real directory', () => {
  test('LivePage renders every live feed and no dead players', () => {
    const { container } = withRouter(
      <LivePage filteredCategories={realCategories()} setSelectedSource={() => {}} />
    );
    const frames = container.querySelectorAll('iframe');
    expect(frames.length).toBe(getLiveStreams().length);
    frames.forEach((frame) => {
      expect(frame.getAttribute('src')).toMatch(/live_stream\?channel=UC[\w-]{20,}/);
    });
  });

  test('LivePage stats report real totals', () => {
    withRouter(<LivePage filteredCategories={realCategories()} setSelectedSource={() => {}} />);
    expect(screen.getByText(String(getLiveStreams().length))).toBeInTheDocument();
    expect(screen.getByText('Verified Live Streams')).toBeInTheDocument();
  });

  test('LivePage survives empty input', () => {
    const { container } = withRouter(
      <LivePage filteredCategories={[]} setSelectedSource={() => {}} />
    );
    expect(container.querySelectorAll('iframe')).toHaveLength(0);
  });

  test('HomeTab only renders players for sources with a stream', () => {
    const { container } = withRouter(
      <HomeTab filteredCategories={realCategories()} setSelectedSource={() => {}} />
    );
    const frames = container.querySelectorAll('iframe');
    expect(frames.length).toBe(getLiveStreams().length);
  });

  test('CountriesList renders the whole directory', () => {
    withRouter(<CountriesList onCountrySelect={() => {}} onSourceSelect={() => {}} />);
    expect(screen.getByText('Japan')).toBeInTheDocument();
    expect(screen.getByText('Nigeria')).toBeInTheDocument();
  });

  test('CountriesList honours the search term', () => {
    withRouter(
      <CountriesList onCountrySelect={() => {}} onSourceSelect={() => {}} searchQuery="japan" />
    );
    expect(screen.getByText('Japan')).toBeInTheDocument();
    expect(screen.queryByText('Nigeria')).not.toBeInTheDocument();
  });

  test('CountryPage renders a country without inventing streams', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/country/Japan']}>
        <Routes>
          <Route path="/country/:countryName" element={<CountryPage />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText(/Japan News Channels/)).toBeInTheDocument();
    // Players only open in the modal, so the page itself has no iframes.
    expect(container.querySelectorAll('iframe')).toHaveLength(0);
  });

  test('CountryPage handles a country with no entry', () => {
    render(
      <MemoryRouter initialEntries={['/country/Atlantis']}>
        <Routes>
          <Route path="/country/:countryName" element={<CountryPage />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText(/0 of 0 channels/)).toBeInTheDocument();
  });
});
