# Hosting update — Experience & Commissions CMS

**Repo:** `KahonStudio/Auguste-Portfolio`  
**App folder:** `portfolio/` (Vercel **Root Directory** must be `portfolio`)  
**CMS URL:** `https://YOUR-DOMAIN/tagapangasiwa`

This update adds editable **Experience** (About timeline) and **Commissions** (process steps, FAQs, “working with me”) in Tagapangasiwa. The public site already reads from Neon when those tables exist.

Code deploy alone is **not** enough — Neon needs new tables (and ideally a seed once).

---

## 1. Deploy the code

1. Pull / merge the latest `main` that includes the Experience + Commissions CMS work.
2. Confirm the host (e.g. Vercel) builds from **`portfolio/`**.
3. Redeploy after env vars are set (or already set).

No special build command beyond the project’s normal `npm run build` (it runs `prisma generate`).

---

## 2. Confirm env vars on the host

These should already exist for the CMS. Double-check they are present on **Production**:

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | Neon **pooled** URL (`…-pooler…`) |
| `DIRECT_URL` | Neon **direct** URL (same DB, **no** `-pooler` in hostname) |
| `AUTH_SECRET` | Auth.js secret |
| `ADMIN_EMAIL` | CMS login email |
| `ADMIN_PASSWORD` or `ADMIN_PASSWORD_HASH` | CMS login |
| Cloudinary vars | Media uploads |
| Resend / contact vars | Contact form (optional but recommended) |

Full list: [`portfolio/.env.example`](./.env.example).

---

## 3. One-time database update (required)

New Prisma models:

- `ExperienceEntry`
- `CommissionProcessStep`
- `CommissionFaq`
- `WorkingWithMeStep`

Someone with Neon access must run this **once** against production (or from a machine that has the production `DATABASE_URL` / `DIRECT_URL`).

### Option A — Local machine with production Neon URLs

```bash
git clone https://github.com/KahonStudio/Auguste-Portfolio.git
cd Auguste-Portfolio/portfolio
npm install
```

Create `portfolio/.env` (Prisma reads `.env`, not only Vercel):

```env
DATABASE_URL="postgresql://…-pooler….neon.tech/neondb?sslmode=require"
DIRECT_URL="postgresql://….neon.tech/neondb?sslmode=require"
```

Then:

```bash
# Preferred first time: create tables + seed default content from src/content
npm run db:setup
```

That runs `prisma db push` then the seed.

If tables already exist and you **only** need to push schema (and you don’t want to overwrite content):

```bash
npm run db:push
```

If tables are empty and the public pages still show old static fallbacks:

```bash
npm run db:seed
```

### Option B — Neon SQL / dashboard

Only if you prefer not to use Prisma CLI: apply the schema from `portfolio/prisma/schema.prisma` (models above), then seed via Option A or insert rows manually. **Option A is safer.**

### Seed warning

`npm run db:seed` **upserts** from `src/content/*`. Safe for first setup. If content has already been edited in the CMS (Experience, Commissions, Projects, Site), re-seeding can **overwrite** those edits with the repo’s static content. Prefer `db:push` alone once production content is live.

---

## 4. Verify after deploy + DB

1. Open `https://YOUR-DOMAIN/tagapangasiwa` and sign in.
2. Confirm nav includes **Experience** and **Commissions**.
3. Edit one Experience entry → check `/about`.
4. Edit one FAQ or process step → check `/commissions`.
5. Overview should show an Experience count (not stuck at 0 after seed).

If CMS pages are empty but the public site still shows content: tables exist but are empty — run `npm run db:seed` once (or create entries in the CMS).

If save fails with “Database is not configured”: `DATABASE_URL` missing on the host.

---

## 5. What content owner does vs what hosting does

| Task | Who |
|------|-----|
| Edit copy, projects, hero, experience, FAQs in CMS | Content owner (no redeploy) |
| Deploy new code from GitHub | Hosting |
| Neon env vars / connection strings | Hosting |
| `db:push` / `db:setup` after schema changes | Hosting (or anyone with Neon URLs) |
| Cloudinary full-access API key (uploads 403 if restricted) | Hosting |

---

## 6. Quick checklist for this release

- [ ] Latest code deployed; Root Directory = `portfolio`
- [ ] Production has `DATABASE_URL` + `DIRECT_URL`
- [ ] Ran `npm run db:setup` **once** (or `db:push` if already seeded)
- [ ] Logged into `/tagapangasiwa` → Experience + Commissions work
- [ ] Spot-checked `/about` and `/commissions`

---

## 7. If something breaks

- **Build fails on Prisma:** ensure `postinstall` / `prisma generate` runs; `DATABASE_URL` is not required at generate time, but the schema must be present.
- **Public site ignores CMS edits:** production still reading empty DB → seed or create rows; or env pointing at the wrong Neon branch.
- **Upload 403:** Cloudinary key must be **full access**; `CLOUDINARY_API_SECRET` must not equal the API key.
