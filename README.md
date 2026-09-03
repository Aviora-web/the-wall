# The Wall

An anonymous public wall for thoughts, secrets, regrets, rants and good things.

## Current stage
Front-end prototype for GitHub Pages. Posts use localStorage, so they are local to the current browser.

## Roadmap
- Supabase PostgreSQL
- Row Level Security
- Global posts and likes
- Reports
- Moderation/admin panel
- Anti-spam/rate limiting
- Production deployment

## GitHub Pages
Upload the repository, then enable Pages from the `main` branch and root folder.

## Security
Never expose a Supabase service-role/secret key in browser code. The public client must rely on RLS.
