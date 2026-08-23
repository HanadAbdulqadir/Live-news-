import {
  GLOBAL_NEWS_SOURCES,
  getSourcesByContinent,
  searchSources,
  getLiveStreams,
  getWebsiteSources,
  getDirectoryStats,
} from '../globalNewsData';
import { ALL_COUNTRIES, getNewsSourcesForCountry, getNewsSourceData } from '../countries';

const EMBED = /^https:\/\/www\.youtube\.com\/embed\/live_stream\?channel=UC[\w-]{20,}$/;

describe('directory integrity', () => {
  test('covers every sovereign state in the table', () => {
    expect(GLOBAL_NEWS_SOURCES.length).toBeGreaterThanOrEqual(190);
  });

  test('country ids and names are unique', () => {
    const ids = GLOBAL_NEWS_SOURCES.map((c) => c.id);
    const names = GLOBAL_NEWS_SOURCES.map((c) => c.name);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(names).size).toBe(names.length);
  });

  test('every country has a flag, an ISO code and at least one source', () => {
    GLOBAL_NEWS_SOURCES.forEach((country) => {
      expect(country.iso).toMatch(/^[A-Z]{2}$/);
      expect(country.flag.length).toBeGreaterThan(0);
      expect(country.continent).toBeTruthy();
      expect(country.sources.length).toBeGreaterThan(0);
    });
  });

  test('source ids are unique within a country', () => {
    GLOBAL_NEWS_SOURCES.forEach((country) => {
      const ids = country.sources.map((s) => s.id);
      expect(new Set(ids).size).toBe(ids.length);
    });
  });

  test('a stream URL only ever appears on a verified source', () => {
    GLOBAL_NEWS_SOURCES.forEach((country) => {
      country.sources.forEach((source) => {
        if (source.streamUrl) {
          expect(source.verified).toBe(true);
          expect(source.streamUrl).toMatch(EMBED);
          expect(source.type).toBe('live');
        } else {
          expect(source.type).toBe('website');
        }
      });
    });
  });

  test('no channel ID is claimed by two different countries', () => {
    const owner = {};
    GLOBAL_NEWS_SOURCES.forEach((country) => {
      country.sources.forEach((source) => {
        if (!source.channelUrl) return;
        const id = source.channelUrl.split('/').pop();
        if (owner[id]) expect(owner[id]).toBe(country.name);
        owner[id] = country.name;
      });
    });
  });

  test('every source is reachable somehow', () => {
    GLOBAL_NEWS_SOURCES.forEach((country) => {
      country.sources.forEach((source) => {
        expect(source.websiteUrl || source.channelUrl || source.streamUrl).toBeTruthy();
      });
    });
  });
});

describe('directory helpers', () => {
  test('stats agree with the data', () => {
    const stats = getDirectoryStats();
    expect(stats.countries).toBe(GLOBAL_NEWS_SOURCES.length);
    expect(stats.live).toBe(getLiveStreams().length);
    expect(stats.sources).toBe(stats.live + getWebsiteSources().length);
    expect(stats.verified).toBeGreaterThanOrEqual(stats.live);
  });

  test('continent grouping keeps every country', () => {
    const grouped = getSourcesByContinent();
    const total = Object.values(grouped).reduce((n, list) => n + list.length, 0);
    expect(total).toBe(GLOBAL_NEWS_SOURCES.length);
  });

  test('search matches country names and source names', () => {
    expect(searchSources('japan').map((c) => c.name)).toContain('Japan');
    expect(searchSources('zzzzznotreal')).toHaveLength(0);
  });

  test('live streams carry their country', () => {
    getLiveStreams().forEach((source) => {
      expect(source.country).toBeTruthy();
      expect(source.flag).toBeTruthy();
      expect(source.streamUrl).toMatch(EMBED);
    });
  });
});

describe('countries.js derives from the directory', () => {
  test('ALL_COUNTRIES mirrors the directory', () => {
    expect(ALL_COUNTRIES).toHaveLength(GLOBAL_NEWS_SOURCES.length);
  });

  test('unknown countries return empty results, never a fallback', () => {
    expect(getNewsSourcesForCountry('Atlantis')).toEqual([]);
    expect(getNewsSourceData('Atlantis')).toEqual([]);
  });

  test('source colour is stable across calls', () => {
    const first = getNewsSourceData('Japan').map((s) => s.color);
    const second = getNewsSourceData('Japan').map((s) => s.color);
    expect(first).toEqual(second);
  });

  test('source data carries the country flag through', () => {
    getNewsSourceData('Japan').forEach((source) => {
      expect(source.country).toBe('Japan');
      expect(source.flag).toBe('🇯🇵');
    });
  });
});
