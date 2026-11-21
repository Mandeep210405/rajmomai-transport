# Rajmomai Transport – Website

Premium single-page website for **Rajmomai Transport** (Bhavnagar, Gujarat): industrial transportation & logistics and raw-material trading.

Stack: Next.js (App Router) · React · TypeScript · Tailwind CSS · Framer Motion · Lucide React · Zod · Resend (email).

## 1. Run locally

Requires Node.js 20 or newer.

```bash
npm install
cp .env.example .env.local     # then edit .env.local
npm run dev                    # http://localhost:3000
```

Other commands: `npm run build`, `npm start`, `npm run typecheck`.

## 2. Email setup (Resend)

Enquiries are emailed server-side from `src/app/api/enquiry/route.ts`. The API key never reaches the browser.

1. Create an account at <https://resend.com> and create an API key.
2. Put it in `.env.local` (and in your host's environment variables when deploying):

   ```
   RESEND_API_KEY=re_xxxxxxxx
   ENQUIRY_TO_EMAIL=Mandeep210405@gmail.com
   ENQUIRY_FROM_EMAIL=Rajmomai Transport <onboarding@resend.dev>
   ```

3. **Sender address:** `onboarding@resend.dev` is a test sender and Resend only delivers it to the email address your Resend account was created with. To deliver to `Mandeep210405@gmail.com` reliably, either sign up to Resend with that address, or verify your own domain in Resend and use e.g. `Rajmomai Transport <enquiry@yourdomain.com>`.

If `RESEND_API_KEY` is missing, the form shows a friendly error and customers can still use the **WhatsApp** button. The server logs a clear message.

Built-in protections: server-side validation, honeypot field, per-IP rate limit (in-memory; use a shared store such as Upstash Redis if you run many server instances), duplicate-submit guard, and HTML escaping in emails.

## 3. WhatsApp

The form's **Send via WhatsApp** button builds a formatted message from all fields and opens `wa.me` with the contact the customer selects. Numbers are in `src/data/site.ts`.

## 4. Editing content (no component changes needed)

| What | File |
| --- | --- |
| Contact details, nav, tagline, hero image, copyright | `src/data/site.ts` |
| Services | `src/data/services.ts` |
| Materials (cards + form dropdown) | `src/data/materials.ts` |
| Industries | `src/data/industries.ts` |
| Client names | `src/data/clients.ts` |
| Why-choose points | `src/data/advantages.ts` |
| Statistics | `src/data/stats.ts` |
| Gallery images & categories | `src/data/gallery.ts` |

New icons: register them in `src/components/Icon.tsx`.

## 5. Replacing placeholder images with real photos

All current images are **generated abstract placeholders** (not photographs), and the site labels them "Illustrative". Real photos were not bundled so that nothing is presented as actual company operations.

- **Hero:** save a photo as `public/images/hero.jpg` and set `heroImage: "/images/hero.jpg"` in `src/data/site.ts`.
- **Materials:** add photos under `public/images/materials/` and update `image` + `isPlaceholder: false` in `src/data/materials.ts`.
- **Gallery:** add photos under `public/images/gallery/`, then update `src`, `alt` and set `isPlaceholder: false` in `src/data/gallery.ts`. Add new entries freely; filter tabs appear automatically for categories that have images.

Real JPG/PNG/WebP files are automatically optimised by `next/image`. Regenerate placeholders with `npm run images:placeholders`.

> If you use stock photography, do not label it as Rajmomai Transport's own operations, and check its licence.

## 6. Brand assets

- `src/components/Logo.tsx` – logo component (`tone="onDark" | "onLight"`, `iconOnly`).
- `public/logo.svg` (dark backgrounds), `public/logo-on-light.svg`, `public/logo-icon.svg`.
- `src/app/icon.svg` – favicon (auto-served by Next.js). `src/app/opengraph-image.tsx` – social share image.

## 7. Deploy

**Vercel (recommended):** push the project to GitHub → import in Vercel → add the environment variables from `.env.example` (set `NEXT_PUBLIC_SITE_URL` to your live domain) → Deploy. Then add your custom domain.

**Self-host (VPS):** `npm run build && npm start` behind Nginx/Caddy with HTTPS, with environment variables set in the service environment.

Set `NEXT_PUBLIC_SITE_URL` correctly: it drives the sitemap, `robots.txt`, canonical URL, Open Graph and structured data.

## 8. Accuracy notes built into the site

- Only stated facts are used: 16+ years, 5–10 trucks/day (subject to availability, 4–5 hours' notice), 5 material categories, 2 divisions.
- No prices, testimonials, certifications, client logos or extra locations.
- Own fleet vs. partner network is stated separately; partner trucks are described as independently owned.
- Pan-India service is described as "on requirement, subject to availability".
