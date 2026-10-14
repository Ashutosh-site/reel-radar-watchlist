import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';
import { Bookmark, Check, ChevronDown, ChevronLeft, ChevronRight, Compass, Film, Flame, Play, Plus, Search, SlidersHorizontal, Sparkles, Tv, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Artwork, TitleCard } from '@/components/streamzone/title-card';
import { PlayerDialog } from '@/components/streamzone/player-dialog';
import { catalog, featured, filterCatalog, genres, toggleSaved, type Genre, type Title, type View } from '@/lib/catalog';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'StreamZone — Discover your next great story' },
    { name: 'description', content: 'Explore extraordinary fictional movies and series, discover weekly favorites, and curate your own watchlist on StreamZone.' },
    { property: 'og:title', content: 'StreamZone — Discover your next great story' },
    { property: 'og:description', content: 'A world of extraordinary stories. Discover movies, series, and your next favorite.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: StreamZone,
});
const navigation = [{ label: 'Discover', icon: Compass }, { label: 'Movies', icon: Film }, { label: 'Series', icon: Tv }, { label: 'My List', icon: Bookmark }] as const;

export function StreamZone() {
  const [view, setView] = useState<View>('Discover');
  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState<Genre>('All genres');
  const [type, setType] = useState('All titles');
  const [saved, setSaved] = useState<string[]>([]);
  const [storageReady, setStorageReady] = useState(false);
  const [selected, setSelected] = useState<Title | null>(null);
  const [notice, setNotice] = useState('');
  const continueRef = useRef<HTMLDivElement>(null);
  const noticeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    try { const value: unknown = JSON.parse(localStorage.getItem('streamzone-watchlist') ?? '[]'); if (Array.isArray(value)) setSaved(value.filter((id): id is string => typeof id === 'string' && catalog.some(t => t.id === id))); } catch { /* Invalid or unavailable local storage: start with an empty list. */ }
    setStorageReady(true);
    return () => { if (noticeTimer.current) clearTimeout(noticeTimer.current); };
  }, []);
  useEffect(() => { if (storageReady) { try { localStorage.setItem('streamzone-watchlist', JSON.stringify(saved)); } catch { /* The current session still supports a watchlist. */ } } }, [saved, storageReady]);
  function toggle(id: string) {
    setSaved(ids => toggleSaved(ids, id));
    setNotice(saved.includes(id) ? 'Removed from My List' : 'Added to My List');
    if (noticeTimer.current) clearTimeout(noticeTimer.current);
    noticeTimer.current = setTimeout(() => setNotice(''), 2400);
  }
  function navigate(next: View) { setView(next); setQuery(''); setGenre('All genres'); setType('All titles'); }
  function resetFilters() { setQuery(''); setGenre('All genres'); setType('All titles'); }
  const filtered = filterCatalog(catalog, query, view, genre, type, saved);
  const discovering = view === 'Discover' && !query.trim() && genre === 'All genres' && type === 'All titles';
  const heading = query.trim() ? `Results for “${query.trim()}”` : view === 'My List' ? 'My List' : view === 'Movies' ? 'Movies worth your time' : view === 'Series' ? 'Your next obsession' : 'Trending this week';
  const cardProps = (title: Title) => ({ title, saved: saved.includes(title.id), onToggle: toggle, onOpen: setSelected });
  return <div className="streamzone-app">
    <aside className="sidebar">
      <a className="brand" href="/" aria-label="StreamZone home"><span className="brand-mark"><Play fill="currentColor" strokeWidth={0} /></span><span>stream<span className="brand-zone">zone</span><span className="brand-dot">.</span></span></a>
      <div className="nav-label">YOUR UNIVERSE</div>
      <nav aria-label="Main navigation">{navigation.map(({ label, icon: Icon }) => <Button key={label} variant="navigation" data-active={view === label} aria-current={view === label ? 'page' : undefined} onClick={() => navigate(label)} className="nav-item"><Icon size={19} /><span>{label}</span>{label === 'My List' && <span className="list-count">{saved.length}</span>}</Button>)}</nav>
      <div className="sidebar-bottom"><div className="curated-mark"><Sparkles size={19} /></div><p>A world of stories.<br /><span>One place to get lost.</span></p><div className="sidebar-divider" /><span className="edition">THE STREAMZONE COLLECTION</span><span className="edition-year">EST. 2026</span></div>
    </aside>
    <div className="main-shell">
      <header className="topbar"><div className="header-context">Made for your next <span>“one more.”</span></div><div className="search-field"><Search size={19} /><Input aria-label="Search movies and series" placeholder="Search movies, series, and more..." value={query} onChange={e => setQuery(e.target.value)} />{query && <Button variant="ghost" size="icon" onClick={() => setQuery('')} aria-label="Clear search"><X /></Button>}</div><div className="header-actions"><DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" className="category-button" aria-label="Filter by content type"><SlidersHorizontal /><span>{type === 'All titles' ? 'Categories' : type === 'Movie' ? 'Movies' : 'Series'}</span><ChevronDown /></Button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuLabel>Content type</DropdownMenuLabel><DropdownMenuSeparator /><DropdownMenuRadioGroup value={type} onValueChange={setType}><DropdownMenuRadioItem value="All titles">All titles</DropdownMenuRadioItem><DropdownMenuRadioItem value="Movie">Movies</DropdownMenuRadioItem><DropdownMenuRadioItem value="Series">Series</DropdownMenuRadioItem></DropdownMenuRadioGroup></DropdownMenuContent></DropdownMenu><div className="header-separator" /><span className="profile-avatar" role="img" aria-label="Local viewer profile">A</span></div></header>
      <main id="main-content">
        {discovering && <section className="hero" aria-labelledby="hero-title"><Artwork title={featured} className="hero-art" eager /><div className="hero-overlay" /><div className="hero-content"><div className="eyebrow"><span className="original-symbol"><Play fill="currentColor" size={11} /></span> STREAMZONE ORIGINAL</div><h1 id="hero-title">Beyond the<br />Last Horizon<span>.</span></h1><div className="title-meta"><span>2026</span><span className="age-rating">16+</span><span>2h 18m</span><span className="meta-divider" /><span>Sci-Fi Adventure</span><span className="quality-badge">4K</span></div><p className="hero-description">At the edge of the known universe, a lone explorer discovers a signal that could change everything. Some journeys take us further than we ever imagined.</p><div className="hero-actions"><Button variant="cinematic" size="lg" onClick={() => setSelected(featured)}><Play fill="currentColor" />Play now</Button><Button variant="glass" size="lg" onClick={() => toggle(featured.id)} aria-pressed={saved.includes(featured.id)}>{saved.includes(featured.id) ? <Check /> : <Plus />}{saved.includes(featured.id) ? 'In My List' : 'My List'}</Button></div><span className="hero-tagline"><span /> A journey beyond the ordinary</span></div><div className="hero-edition"><span>THE FEATURE</span><strong>01 <span>/ 01</span></strong></div></section>}
        <div className="discovery-content">
          {discovering && <section className="continue-section" aria-labelledby="continue-heading"><div className="section-header"><div><h2 id="continue-heading">Continue watching<span className="heading-dot" /></h2><p>Pick up where you left off.</p></div><div className="scroll-controls"><Button variant="ghost" size="icon" aria-label="Previous continue watching titles" onClick={() => continueRef.current?.scrollBy({ left: -350, behavior: 'smooth' })}><ChevronLeft /></Button><Button variant="ghost" size="icon" aria-label="Next continue watching titles" onClick={() => continueRef.current?.scrollBy({ left: 350, behavior: 'smooth' })}><ChevronRight /></Button></div></div><div className="continue-grid" ref={continueRef}>{[catalog[0], featured, catalog[5]].filter((t): t is Title => Boolean(t)).map(title => <TitleCard key={title.id} {...cardProps(title)} resume />)}</div></section>}
          <section className="catalog-section" aria-labelledby="catalog-heading"><div className="section-header"><div><div className="heading-with-icon">{view === 'Discover' && !query && <Flame className="trending-icon" size={20} />}<h2 id="catalog-heading">{heading}</h2>{view === 'My List' && <span className="results-count">{saved.length}</span>}</div><p>{query || genre !== 'All genres' || type !== 'All titles' ? `${filtered.length} ${filtered.length === 1 ? 'title' : 'titles'} to discover` : view === 'My List' ? 'Great stories, saved for later.' : view === 'Discover' ? 'The stories everyone’s talking about.' : 'Find something that stays with you.'}</p></div>{discovering && <Button variant="ghost" className="view-all" onClick={() => navigate('Movies')}>Explore movies <ChevronRight /></Button>}</div>
            <div className="genre-filters" role="group" aria-label="Filter by genre">{genres.map(g => <Button key={g} variant="chip" data-active={genre === g} aria-pressed={genre === g} onClick={() => setGenre(g)}>{g === 'All genres' && <SlidersHorizontal size={14} />}{g}</Button>)}</div>
            {filtered.length ? <div className="poster-grid">{(discovering ? filtered.filter(t => t.id !== featured.id) : filtered).map(title => <TitleCard key={title.id} {...cardProps(title)} />)}</div> : <div className="empty-state">{view === 'My List' && !saved.length ? <Bookmark size={36} /> : <Search size={36} />}<h3>{view === 'My List' && !saved.length ? 'Your next favorites belong here' : 'No stories found'}</h3><p>{view === 'My List' && !saved.length ? 'Save a title to make it part of your collection.' : 'Try another title, genre, or category.'}</p><Button variant="secondary" onClick={() => { resetFilters(); if (view === 'My List') setView('Discover'); }}>{view === 'My List' && !saved.length ? 'Discover titles' : 'Clear filters'}</Button></div>}
          </section>
          {discovering && <section className="popular-section" aria-labelledby="series-heading"><div className="section-header"><div><h2 id="series-heading">Popular series</h2><p>Meet your next can’t-stop-watching.</p></div><Button variant="ghost" className="view-all" onClick={() => navigate('Series')}>View all <ChevronRight /></Button></div><div className="series-grid">{catalog.filter(t => t.type === 'Series').map((title, index) => <article className="series-item" key={title.id}><span className="series-rank">0{index + 1}</span><Button variant="ghost" className="series-open" aria-label={`View ${title.title}`} onClick={() => setSelected(title)}><Artwork title={title} /><span><span className="series-genre">{title.genre}</span><strong>{title.title}</strong><span className="series-meta">{title.year} · {title.runtime}</span></span><Play size={18} /></Button></article>)}</div></section>}
          <footer className="site-footer"><span className="footer-brand">streamzone.</span><span>Good stories. No limits to your imagination.</span><span>© 2026 StreamZone <span className="footer-demo">· A fictional streaming experience</span></span></footer>
        </div>
      </main>
    </div>
    <div className={`watchlist-notice ${notice ? 'notice-visible' : ''}`} role="status"><Check size={16} />{notice}</div>
    <PlayerDialog title={selected} onClose={() => setSelected(null)} saved={selected ? saved.includes(selected.id) : false} onToggle={toggle} />
  </div>;
}
