# VOTIX Google Authentication Setup

The VOTIX frontend now uses Supabase Auth's Google OAuth flow via
`supabase.auth.signInWithOAuth({ provider: "google" })`.

## 1. Supabase

In Supabase Dashboard:

1. Open **Authentication → Providers → Google**.
2. Enable Google.
3. Paste the Google **Client ID** and **Client Secret**.
4. Open **Authentication → URL Configuration**.
5. Set **Site URL** to the production VOTIX URL.
6. Add the production login URL to **Redirect URLs**:
   `https://YOUR-VOTIX-DOMAIN/login`
7. Add any development/preview login URLs you actually use, for example:
   `http://localhost:5173/login`

The app sends the browser back to `/login` after Google authentication and then
redirects an authenticated user to the existing `/my-tickets` page.

## 2. Google Cloud Console

Create a Google OAuth client with application type **Web application**.

Authorized JavaScript origins:
- `https://YOUR-VOTIX-DOMAIN`
- `http://localhost:5173` (development only, if used)

Authorized redirect URI:
- `https://sedwcrcgaoxppuqjtuqy.supabase.co/auth/v1/callback`

If Supabase shows a different callback URL in the Google provider settings,
use the exact callback URL shown there.

Copy the Google Client ID and Client Secret into the Supabase Google provider.
Never put the Client Secret in frontend code or GitHub.

## 3. Existing authentication

Email/password authentication remains unchanged. Supabase persists the session
and the existing navbar Sign out action continues to call `supabase.auth.signOut()`.

Google-created users are also passed through the project's existing
`handle_new_user` database trigger, which creates the normal VOTIX profile and
attendee role. Google profile metadata such as name/email/avatar is retained by
Supabase Auth in the user's authentication metadata.
