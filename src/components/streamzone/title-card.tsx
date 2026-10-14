import { Check, Play, Plus } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import type { Title } from '@/lib/catalog';

export function Artwork({ title, className = '', eager = false }: { title: Title; className?: string; eager?: boolean }) {
  const [failed, setFailed] = useState(false);
  return <div className={`artwork ${className}`}>
    {!failed && <img src={title.image} alt="" width={512} height={768} loading={eager ? 'eager' : 'lazy'} onError={() => setFailed(true)} />}
    {failed && <span className="artwork-fallback">{title.title}</span>}
  </div>;
}
export function TitleCard({ title, saved, onToggle, onOpen, resume = false }: {
  title: Title; saved: boolean; onToggle: (id: string) => void; onOpen: (title: Title) => void; resume?: boolean;
}) {
  return <article className={resume ? 'resume-card' : 'title-card'}>
    <div className="card-visual">
      <Button variant="ghost" className="card-open" onClick={() => onOpen(title)} aria-label={`${resume ? 'Resume' : 'View'} ${title.title}`}>
        <Artwork title={title} />
        {resume ? <><span className="resume-shade" /><span className="resume-play"><Play fill="currentColor" /></span><span className="resume-time">{title.remaining}</span></> : <><span className="poster-shade" /><span className={`poster-title poster-title-${title.id}`}>{title.title}</span><span className="card-hover-play"><Play fill="currentColor" /></span></>}
      </Button>
      {!resume && title.badge && <span className={`content-badge ${title.badge === 'NEW' ? 'badge-new' : ''}`}>{title.badge}</span>}
      {!resume && <Button variant="glass" size="icon" className="save-card" onClick={() => onToggle(title.id)} aria-label={`${saved ? 'Remove' : 'Add'} ${title.title} ${saved ? 'from' : 'to'} My List`} aria-pressed={saved} title={saved ? 'Remove from My List' : 'Add to My List'}>{saved ? <Check /> : <Plus />}</Button>}
      {resume && <progress className="watch-progress" value={title.progress} max={100} aria-label={`${title.title} watch progress`} />}
    </div>
    <div className="card-caption"><h3>{title.title}</h3><p>{resume ? (title.episode ?? `${title.year} · ${title.genre}`) : `${title.year} · ${title.type}`} {!resume && <span className="caption-genre">· {title.genre}</span>}</p></div>
  </article>;
}
