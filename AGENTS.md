<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the streaming prototype frontend-only: the typed catalog and pure filtering/watchlist helpers live in `src/lib/catalog.ts` so display and tests share one source of truth.
- Use `src/components/streamzone` for reusable artwork, cards, and the Radix-backed player dialog; the index route owns discovery state to keep filters and watchlist synchronized.
- Store the prototype watchlist only in browser local storage after hydration; no network services are needed and SSR must retain a stable first render.
- Keep visual tokens and responsive layouts in `src/styles.css`; all new interactive variants belong to the shared Button design system.
