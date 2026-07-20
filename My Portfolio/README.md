# James Raphael Ibay — Digital Headquarters

Personal brand site for games, software, and commissions. Products link out to itch.io.

## Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui-style primitives
- Framer Motion
- React Hook Form + Zod

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Content

All copy and catalog data live in `src/content/`. Update products, projects, services, and site copy there — pages read through `src/lib/content`.

Replace placeholder SVGs in `public/images/` with your real art.

Update itch.io URLs in `src/content/products.ts` and social links in `src/content/site.ts`.

## Forms

`POST /api/contact` validates inquiries. Without env vars, submissions are accepted and logged.

Optional Resend:

```
RESEND_API_KEY=
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=
```

See `.env.example`.

## Scripts

- `npm run dev` — development
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — ESLint
