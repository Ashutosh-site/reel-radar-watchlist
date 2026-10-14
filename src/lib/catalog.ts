import horizon from '@/assets/horizon-hero.jpg';
import neon from '@/assets/neon-district.jpg';
import orbital from '@/assets/orbital.jpg';
import wild from '@/assets/wild-at-heart.jpg';
import witness from '@/assets/the-silent-witness.jpg';
import water from '@/assets/open-water.jpg';
import north from '@/assets/northbound.jpg';

export type ContentType = 'Movie' | 'Series';
export type View = 'Discover' | 'Movies' | 'Series' | 'My List';
export const genres = ['All genres', 'Sci-Fi', 'Thriller', 'Adventure', 'Drama', 'Mystery'] as const;
export type Genre = typeof genres[number];
export interface Title {
  id: string; title: string; type: ContentType; genre: Exclude<Genre, 'All genres'>;
  year: number; runtime: string; rating: string; image: string; description: string;
  badge?: 'NEW' | 'TRENDING'; progress?: number; remaining?: string; episode?: string;
}
export const featured: Title = {
  id: 'horizon', title: 'Beyond the Last Horizon', type: 'Movie', genre: 'Sci-Fi', year: 2026,
  runtime: '2h 18m', rating: '16+', image: horizon, badge: 'NEW', progress: 38, remaining: '1h 26m left',
  description: 'At the edge of the known universe, a lone explorer discovers a signal that could change everything. Some journeys take us further than we ever imagined.',
};
export const catalog: Title[] = [
  { id: 'neon', title: 'Neon District', type: 'Series', genre: 'Thriller', year: 2026, runtime: '1 season', rating: '16+', image: neon, badge: 'TRENDING', progress: 68, remaining: '18m left', episode: 'S1 E4 · The other side', description: 'In a city that never forgets, a missing-persons detective follows a trail of encrypted memories into the neon-lit underworld.' },
  { id: 'orbital', title: 'Orbital', type: 'Movie', genre: 'Sci-Fi', year: 2026, runtime: '1h 54m', rating: '13+', image: orbital, badge: 'NEW', description: 'When a routine spacewalk goes silent, an engineer must cross the rings of a distant planet to bring her crew home.' },
  { id: 'wild', title: 'Wild at Heart', type: 'Movie', genre: 'Adventure', year: 2025, runtime: '1h 48m', rating: '13+', image: wild, description: 'Two estranged siblings set out on their father’s unfinished trail through the Alps, finding a little more than the way home.' },
  { id: 'witness', title: 'The Silent Witness', type: 'Series', genre: 'Mystery', year: 2026, runtime: '2 seasons', rating: '16+', image: witness, badge: 'NEW', description: 'A court interpreter recognizes a voice from her past. One testimony could unravel the truth she has spent a lifetime hiding.' },
  { id: 'water', title: 'Open Water', type: 'Movie', genre: 'Drama', year: 2025, runtime: '1h 42m', rating: '13+', image: water, description: 'A retired sailor and a runaway musician share an unlikely voyage across the Atlantic, guided by the songs and secrets they carry.' },
  { id: 'north', title: 'Northbound', type: 'Series', genre: 'Thriller', year: 2026, runtime: '1 season', rating: '16+', image: north, progress: 24, remaining: '36m left', episode: 'S1 E2 · White silence', description: 'After the last road closes for winter, a small mountain town discovers that the biggest danger is already inside.' },
  featured,
];
export function filterCatalog(titles: Title[], query: string, view: View, genre: Genre, type: string, saved: string[]) {
  const term = query.trim().toLowerCase();
  return titles.filter(t => (!term || `${t.title} ${t.genre} ${t.description}`.toLowerCase().includes(term))
    && (view !== 'Movies' || t.type === 'Movie') && (view !== 'Series' || t.type === 'Series')
    && (view !== 'My List' || saved.includes(t.id)) && (genre === 'All genres' || t.genre === genre)
    && (type === 'All titles' || t.type === type));
}
export function toggleSaved(ids: string[], id: string) {
  return ids.includes(id) ? ids.filter(value => value !== id) : [...ids, id];
}
