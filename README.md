# Reel Radar Watchlist

Build a polished, responsive streaming-discovery web app named "StreamZone" with a premium cinematic UI. This is a frontend prototype for a video streaming platform, not a generic admin dashboard. Use React + TypeScript + Tailwind + shadcn/ui from the default Lovable stack; use lucide-react for all generic interface icons. The design should feel carefully art-directed and production-quality, with a midnight navy/charcoal foundation, subtle blue-violet accents, high-contrast warm-white text, controlled gradients, fine separators, spacious hierarchy, and accessible contrast—avoid muddy black-on-black or excessive glow. Do not copy any one streaming brand's exact UI; create a distinct original brand.

Make the landing/discovery screen fully laid out:
- slim left navigation rail on desktop with StreamZone logo/wordmark and Discover, Movies, Series, My List icons/labels; responsive compact/mobile nav.
- top header with a large centered search input that filters titles live, a useful category/filter control, and a profile/avatar circle.
- an editorial hero feature using a cinematic landscape image with overlay gradient, eyebrow "STREAMZONE ORIGINAL", large title "Beyond the Last Horizon", brief fictional synopsis, genre/year/runtime metadata, high-contrast "Play now" button and secondary "+ My List" button. Use accessible text and graceful fallback if poster image loading fails.
- section heading "Continue watching" with horizontal poster tiles and visible progress bars / resume time.
- "Trending this week" responsive poster card grid, badges like NEW/TRENDING, year/type, hover/focus states and a small add/remove watchlist control.
- genre/filter chips and a "Popular series" section to establish content depth.
- use tasteful, reliable public remote cinematic image URLs for placeholders (or local generated placeholders if available), with CSS gradients as fallback; don't block render if an image fails.
- make interactions real: live search filters the displayed mock catalog; nav/filter chips update selected state/content; My List toggles a watchlist and its count/state; clicking a content card or Play opens a proper accessible details/player modal with title, description and a clearly labeled demo player placeholder (do not imply licensed full-length media is actually streaming); Escape and close button close modal.
- use believable fictional titles/content; no copyrighted character or franchise branding. Add skeleton/empty states as appropriate and responsive layouts for laptop/mobile. Use semantic HTML, keyboard focus indicators, accessible labels, reusable components, a small typed mock catalog and clean maintainable code. Keep everything frontend-only and local; do not add auth, paid services, database, or pretend backend integration. Do not deploy/publish. Finish with a polished usable preview and report the preview link plus files/components created.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://reel-radar-watchlist.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/8238371e-6d99-45ca-a84c-5f076bb059fb).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
