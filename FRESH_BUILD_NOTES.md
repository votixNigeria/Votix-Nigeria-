# VOTIX Fresh Build

The project is packaged as a fresh deployable copy of the supplied VOTIX codebase.

Preserved:
- Original VOTIX logos/assets
- Original React/TanStack Start UI and components
- Original Supabase migrations and generated database types
- Original authentication, organizer, ticketing and Paystack server functions
- Original admin dashboard and admin access controls
- Original Vercel configuration

Functional enhancements in this fresh copy:
- `/voting` now loads published voting campaigns from Supabase and renders the existing `VotingSection` for each campaign.
- Organizer sales queries are constrained to events owned by the signed-in organizer.
- Deployment and environment setup are documented in `README.md`.
- The supplied VOTIX favicon/mark is copied into `public/votix-mark.png` so the navbar logo works on Vercel without the original builder's private asset path.
- Admin now also has a Messages tab for the contact-submission functions already present in the supplied backend.
