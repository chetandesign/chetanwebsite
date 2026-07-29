# SEO — what's done & what you need to do

## Done (in the site)
- Unique <title> + meta description on every page
- Canonical URLs on every page
- Open Graph tags (title, description, url, image 1200×630, type, site_name, locale)
- Twitter Card (summary_large_image) on every page
- JSON-LD structured data: Person + WebSite (home), CreativeWork (each case study)
- robots meta (index, follow, max-image-preview:large)
- sitemap.xml (all 9 pages)
- robots.txt referencing the sitemap
- <html lang="en"> on every page
- Descriptive alt text on all images; lazy loading
- Semantic HTML (header/nav/main/section/footer), one <h1> per page
- Social share card at assets/img/og-default.jpg

## YOU MUST DO before/after launch
1. **Replace the domain placeholder.** Every canonical/OG/sitemap URL uses
   `https://chetandesign.vercel.app`. Find-and-replace it with your real domain across:
   all .html files, sitemap.xml, and robots.txt. (One command:
   `grep -rl "chetandesign.com" . | xargs sed -i "" "s|https://chetandesign.vercel.app|https://YOURDOMAIN|g"`)
2. **Submit to Google Search Console** — verify the domain, submit sitemap.xml.
3. **Submit to Bing Webmaster Tools** likewise.
4. Note: case-study pages are password-gated client-side. They can still be
   indexed (content loads under the gate). If you do NOT want them in search,
   add `<meta name="robots" content="noindex">` to those four pages and remove
   them from sitemap.xml.

## Nice-to-have later
- Custom per-case-study OG images (currently case studies use their hero jpg).
- Analytics (Plausible / GA4).
- Real content in the remaining case-study image slots (helps dwell time).
