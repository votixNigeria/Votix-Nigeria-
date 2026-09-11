# VOTIX: Event & Voting Platform

Build the initial foundation of a modern event ticketing and voting platform called VOTIX.



Brand



- Name: VOTIX

- Tagline: "Tickets. Votes. Experiences."

- Design should feel modern, premium, trustworthy and energetic.

- Use a professional dark/white interface with a strong accent color.

- Make the website fully responsive for mobile, tablet and desktop.



Public homepage



Create:



1. VOTIX logo/name in the navbar

2. Home

3. Events

4. Voting

5. How It Works

6. Login

7. Sign Up

8. "Create an Event" CTA



Hero section:



- Headline: "Discover Events. Get Your Tickets. Make Your Vote Count."

- Short description explaining that VOTIX allows people to discover events, purchase digital tickets and participate in event voting.

- Buttons: Explore Events and Create an Event


## Fresh VOTIX build

This archive keeps the original VOTIX source, assets, UI components, Supabase migrations and Vercel configuration, with the public Voting page connected to live Supabase events and the existing vote server functions.

### Required Vercel environment variables

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_URL`
- `SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `PAYSTACK_SECRET_KEY` (required for live ticket payments)

### Supabase

Apply every SQL file under `supabase/migrations/` in timestamp order. The migrations create profiles, roles, events, ticket tiers, voting categories/nominees, votes, orders, tickets and contact submissions, including the admin role bootstrap for the configured admin email.

### Local development

```bash
npm install
npm run dev
```

### Production

```bash
npm run build
npm run preview
```

The included `vercel.json` targets TanStack Start on Vercel. Configure the environment variables in Vercel before deploying.

## VOTIX Fix & Upgrade

This upgraded archive also includes:

- A safer public event loader that avoids fragile deep PostgREST relationship selects and hydrates tickets/voting data in separate queries.
- Graceful Supabase configuration/error handling for the public Events route.
- A real `/create-event` entry point that directs organisers to the working event builder in the authenticated dashboard.
- Paystack verification hardened to validate the returned amount/currency before issuing tickets.
- Atomic nominee vote counting to prevent lost updates when multiple people vote at the same time.
- Admin Wallet Control: a new Wallets tab can credit/debit a user's available balance with an audit reason.
- New Supabase wallet and wallet-transaction tables plus protected admin balance RPC.

### Apply the new database migration

Run the new migration after the existing migrations:

`supabase/migrations/20260911090000_votix_wallet_controls.sql`

It creates the wallet tables and the protected balance/vote helper functions. Do not expose the Supabase service-role key to the browser.
