# House of Cohort — Student Assignment

A full-stack perfume storefront built on **Next.js 16**, Prisma, NextAuth, Neon Postgres, and Cloudinary.

Your job: fork this repo, wire up the third-party services it needs, run it locally, and deploy a working copy to Vercel.

**Deliverable:** a live Vercel URL and a link to your GitHub fork.

---

## Prerequisites

- Node.js **20 or newer** (`node -v`)
- npm (ships with Node)
- A GitHub account
- A free Vercel account — https://vercel.com/signup
- Git installed (`git --version`)

> ⚠️ This project uses **Next.js 16**, which has breaking changes from earlier versions. If you extend the app, read the docs in `node_modules/next/dist/docs/` instead of relying on older tutorials.

---

## Environment variables at a glance

You will collect these across the steps below. Make sure every one is set in both `.env.local` (for local dev) **and** in Vercel project settings (for production).

| Variable | What it's for | Where to get it |
|---|---|---|
| `DATABASE_URL` | Postgres connection string | Neon (Step 2) |
| `AUTH_SECRET` | NextAuth session encryption key | Generate with `openssl rand -base64 32` (Step 5) |
| `AUTH_URL` | Base URL NextAuth redirects to | `http://localhost:3000` locally; your `https://*.vercel.app` URL in prod |
| `AUTH_GOOGLE_ID` | Google OAuth client ID | Google Cloud Console (Step 3) |
| `AUTH_GOOGLE_SECRET` | Google OAuth client secret | Google Cloud Console (Step 3) |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary account name | Cloudinary dashboard (Step 4) |
| `CLOUDINARY_API_KEY` | Cloudinary API key | Cloudinary dashboard (Step 4) |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | Cloudinary dashboard (Step 4) |
| `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` | Unsigned upload preset name | Cloudinary → Settings → Upload (Step 4) |
| `NEXT_PUBLIC_APP_URL` | Public app URL used on the client | `http://localhost:3000` locally; your Vercel URL in prod |
| `MONIME_API_KEY` | Payment gateway key (placeholder for now) | Leave as a placeholder string |
| `MONIME_API_URL` | Payment gateway URL (placeholder for now) | Leave as a placeholder string |

> **Note:** `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` is used in the admin image uploader but is **not** listed in `.env.example`. Add it manually to your `.env.local`.
> **Note:** Monime is a future payment integration. Set the two `MONIME_*` vars to any non-empty placeholder string — the app will run fine without real keys.

---

## Step 1 — Fork & clone

1. Click **Fork** at the top right of this repo on GitHub.
2. Clone your fork:
   ```bash
   git clone https://github.com/<your-username>/house-of-cohort.git
   cd house-of-cohort
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

---
