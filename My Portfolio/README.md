# James Raphael Ibay — Digital Headquarters

Personal brand site for games, software, and commissions. Work is the showcase; free downloads live on itch.io.

## Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Auth.js + Prisma (SQLite locally) for `/tagapangasiwa` CMS
- Cloudinary for media uploads
- Framer Motion, React Hook Form + Zod

## Getting started

```bash
cd ".\My Portfolio"
npm install
npm run db:setup
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Admin CMS: [http://localhost:3000/tagapangasiwa](http://localhost:3000/tagapangasiwa)  
Default local login comes from `.env.local` (`ADMIN_EMAIL` / `ADMIN_PASSWORD`).

## Content

Public pages read through `src/lib/content` accessors:

- If `DATABASE_URL` is set and seeded → DB content (editable in Tagapangasiwa)
- Otherwise → static fallback in `src/content/`

## Tagapangasiwa (CMS)

Phase 1–2 MVP:

- Auth-gated dashboard at `/tagapangasiwa`
- Edit Site / Hero / About
- CRUD Projects & Services
- Media upload to Cloudinary

Phase 3 TODO: experience, commission FAQs/process, legal pages.

```bash
npm run db:setup   # prisma db push + seed from src/content
npm run db:seed    # re-seed
```

See `.env.example` for `AUTH_SECRET`, `ADMIN_*`, `DATABASE_URL`, Cloudinary.

**Cloudinary note:** `CLOUDINARY_API_SECRET` must be the real secret from the Cloudinary dashboard — it must not equal `CLOUDINARY_API_KEY`.

## Forms

`POST /api/contact` validates inquiries (honeypot + rate limit). Without Resend env vars, submissions are logged.

```
RESEND_API_KEY=
CONTACT_TO_EMAIL=       # inbox that receives inquiries
CONTACT_FROM_EMAIL=     # Resend From (verified domain), or blank → onboarding@resend.dev
```

Visitor email is always `reply_to`.

## Scripts

- `npm run dev` — development
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — ESLint
- `npm run db:setup` — create SQLite DB + seed
