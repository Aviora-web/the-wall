# the wall.

A minimal anonymous social space built for GitHub Pages + Supabase.

## Setup
1. Create a Supabase project.
2. Open **SQL Editor** and run `supabase/schema.sql`.
3. Create an admin user through Supabase Auth, then insert that user's UUID into `public.admins` (run `insert into public.admins(user_id) values ('YOUR-AUTH-USER-UUID');`).
4. Put your Supabase project URL and anon/publishable key into `src/config.js`.
5. Push the folder to GitHub and enable GitHub Pages from the repository branch/root.

Never put a Supabase service-role key in the frontend.

## Security note
Public writes are routed through restricted SECURITY DEFINER RPCs rather than direct table insert/update/delete policies. The baseline rate limit uses a browser-generated opaque token, which is useful for casual abuse but is not a strong identity boundary. For a larger public launch, put posting/reporting behind a Supabase Edge Function with server-side IP/device throttling and CAPTCHA/WAF controls.

## Structure
- `index.html` — public experience
- `src/styles.css` — editorial responsive design
- `src/app.js` — Supabase-backed wall, posting, likes, reports
- `supabase/schema.sql` — schema, indexes, RLS, RPC security boundary
- `admin.html` — authenticated moderation surface
