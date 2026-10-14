import { describe, expect, it } from 'vitest';
import { catalog, filterCatalog, toggleSaved } from '@/lib/catalog';
const filter = (query = '', view: Parameters<typeof filterCatalog>[2] = 'Discover', genre: Parameters<typeof filterCatalog>[3] = 'All genres', type = 'All titles', saved: string[] = []) => filterCatalog(catalog, query, view, genre, type, saved);
describe('StreamZone discovery rules', () => {
  it('filters titles live, ignoring case and outer whitespace', () => { expect(filter('  nEoN  ').map(t => t.id)).toEqual(['neon']); });
  it('limits Movies navigation to movies', () => { expect(filter('', 'Movies').map(t => t.id)).toEqual(['orbital', 'wild', 'water', 'horizon']); });
  it('limits Series navigation to series', () => { expect(filter('', 'Series').map(t => t.id)).toEqual(['neon', 'witness', 'north']); });
  it('combines genre and type selection', () => { expect(filter('', 'Discover', 'Sci-Fi', 'Movie').map(t => t.id)).toEqual(['orbital', 'horizon']); });
  it('only shows saved titles in My List', () => { expect(filter('', 'My List', 'All genres', 'All titles', ['neon']).map(t => t.id)).toEqual(['neon']); });
  it('adds and removes titles without duplicates', () => { const added = toggleSaved([], 'neon'); expect(added).toEqual(['neon']); expect(toggleSaved(added, 'neon')).toEqual([]); });
  it('returns an empty result for an unknown title', () => { expect(filter('there-is-no-such-title')).toEqual([]); });
});
