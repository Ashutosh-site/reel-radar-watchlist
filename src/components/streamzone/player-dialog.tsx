import { useEffect, useRef, useState } from 'react';
import { Check, Clapperboard, Maximize, Pause, Play, Plus, Volume2, VolumeX } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Artwork } from './title-card';
import type { Title } from '@/lib/catalog';
export function PlayerDialog({ title, onClose, saved, onToggle }: { title: Title | null; onClose: () => void; saved: boolean; onToggle: (id: string) => void }) {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const opener = useRef<HTMLElement | null>(null);
  useEffect(() => { setPlaying(false); setMuted(false); setExpanded(false); }, [title?.id]);
  return <Dialog open={Boolean(title)} onOpenChange={open => { if (!open) onClose(); }}>
    <DialogContent className={`player-dialog ${expanded ? 'player-expanded' : ''}`} onOpenAutoFocus={() => { opener.current = document.activeElement instanceof HTMLElement ? document.activeElement : null; }} onCloseAutoFocus={event => { event.preventDefault(); opener.current?.focus(); }}>
      {title && <>
        <div className="demo-screen"><Artwork title={title} /><div className="demo-shade" /><div className="demo-label"><Clapperboard size={30} /><span>STREAMZONE DEMO PLAYER</span><p>{playing ? 'Preview playing' : 'Your next great story awaits'}</p><span className="demo-disclaimer">Visual prototype · Full-length video is not available</span></div>
          <div className="demo-controls"><Button variant="glass" size="icon" aria-label={playing ? 'Pause demo' : 'Play demo'} onClick={() => setPlaying(v => !v)}>{playing ? <Pause /> : <Play />}</Button><span>{playing ? 'Playing demo' : 'Demo paused'}</span><Button variant="glass" size="icon" aria-label={muted ? 'Unmute demo' : 'Mute demo'} onClick={() => setMuted(v => !v)}>{muted ? <VolumeX /> : <Volume2 />}</Button><Button variant="glass" size="icon" aria-label={expanded ? 'Reduce player' : 'Expand player'} onClick={() => setExpanded(v => !v)}><Maximize /></Button></div>
        </div>
        <div className="dialog-details"><div className="eyebrow">STREAMZONE ORIGINAL</div><DialogTitle>{title.title}</DialogTitle><div className="title-meta"><span>{title.year}</span><span>{title.genre}</span><span>{title.runtime}</span><span className="age-rating">{title.rating}</span></div><DialogDescription>{title.description}</DialogDescription><Button variant="secondary" onClick={() => onToggle(title.id)}>{saved ? <Check /> : <Plus />}{saved ? 'In My List' : 'My List'}</Button></div>
      </>}
    </DialogContent>
  </Dialog>;
}
