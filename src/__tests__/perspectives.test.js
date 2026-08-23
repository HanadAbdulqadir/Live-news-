import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { axe } from 'jest-axe';
import ComparePage from '../ComparePage';
import {
  getPerspectives,
  getPerspectiveCountries,
  hasPerspectives,
  TIERS,
  TIER_ORDER,
} from '../perspectives';
import { VERIFIED_CHANNELS, getStreamUrl, isVerified } from '../verifiedStreams';

const EMBED = /^https:\/\/www\.youtube\.com\/embed\/live_stream\?channel=UC[\w-]{20,}$/;

describe('verified channels', () => {
  test('every channel has a real-looking YouTube channel ID', () => {
    Object.entries(VERIFIED_CHANNELS).forEach(([name, channel]) => {
      expect(channel.channelId).toMatch(/^UC[\w-]{20,}$/);
      expect(channel.country).toBeTruthy();
      expect(typeof channel.hasLiveFeed).toBe('boolean');
      expect(name).toBeTruthy();
    });
  });

  test('no two channels share a channel ID', () => {
    const ids = Object.values(VERIFIED_CHANNELS).map((c) => c.channelId);
    expect(new Set(ids).size).toBe(ids.length);
  });

  test('getStreamUrl returns null rather than a fallback for unknown channels', () => {
    expect(getStreamUrl('Not A Real Channel')).toBeNull();
    expect(isVerified('Not A Real Channel')).toBe(false);
  });

  test('channels without a live feed never produce a player URL', () => {
    Object.entries(VERIFIED_CHANNELS).forEach(([name, channel]) => {
      const url = getStreamUrl(name);
      if (channel.hasLiveFeed) {
        expect(url).toMatch(EMBED);
      } else {
        expect(url).toBeNull();
      }
    });
  });
});

describe('perspectives', () => {
  test('every country resolves and uses known tiers', () => {
    getPerspectiveCountries().forEach(({ country }) => {
      const data = getPerspectives(country);
      expect(data).not.toBeNull();
      expect(data.sources.length).toBeGreaterThan(0);
      data.sources.forEach((source) => {
        expect(TIER_ORDER).toContain(source.tier);
        expect(TIERS[source.tier]).toBeDefined();
      });
    });
  });

  test('every source is either playable or reachable by link', () => {
    getPerspectiveCountries().forEach(({ country }) => {
      getPerspectives(country).sources.forEach((source) => {
        if (source.playable) {
          expect(source.streamUrl).toMatch(EMBED);
        } else {
          expect(source.streamUrl).toBeNull();
          expect(source.linkUrl).toBeTruthy();
        }
      });
    });
  });

  test('unknown countries return null instead of a default', () => {
    expect(getPerspectives('Atlantis')).toBeNull();
    expect(hasPerspectives('Atlantis')).toBe(false);
  });
});

const renderCompare = (path) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/compare/:countryName" element={<ComparePage />} />
      </Routes>
    </MemoryRouter>
  );

describe('ComparePage', () => {
  test('lists countries when none is selected', () => {
    renderCompare('/compare');
    expect(screen.getByText('Compare coverage')).toBeInTheDocument();
    expect(screen.getByText('Iran')).toBeInTheDocument();
  });

  test('renders a feed per tier for a country', () => {
    const { container } = renderCompare('/compare/Iran');
    const frames = container.querySelectorAll('iframe');
    expect(frames.length).toBeGreaterThan(0);
    expect(frames.length).toBeLessThanOrEqual(4);
    frames.forEach((frame) => {
      expect(frame.getAttribute('src')).toMatch(/live_stream\?channel=UC[\w-]{20,}&autoplay=1&mute=1/);
    });
  });

  test('sources without a live feed appear as links, not players', () => {
    renderCompare('/compare/Iran');
    const pressTv = screen.getByRole('link', { name: 'Press TV' });
    expect(pressTv).toHaveAttribute('href', 'https://www.presstv.ir/live');
  });

  test('unknown country does not render a player', () => {
    const { container } = renderCompare('/compare/Atlantis');
    expect(container.querySelectorAll('iframe')).toHaveLength(0);
    expect(screen.getByText(/No perspective set for Atlantis/)).toBeInTheDocument();
  });

  test('has no accessibility violations', async () => {
    const { container } = renderCompare('/compare/Iran');
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
