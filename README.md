# Chetan Hegde — Story Flow 2.0 Portfolio

Static site. No build step, no dependencies — host anywhere.

## Structure
- index.html            — home (Story Flow narrative)
- works.html            — case study index
- about.html / contact.html
- case-studies/         — propchk, scale, tanishq, pepperfry
- assets/site.css, site.js — shared styles & interactions

## Deploy
- **Netlify / Vercel**: drag-and-drop this folder (or connect a repo). Zero config.
- **GitHub Pages**: push to a repo → Settings → Pages → deploy from branch root.
- **Any server**: upload the folder as-is; index.html is the entry point.

## Case study password
Case study pages are protected with a client-side password gate
(current password: Cas#Stu&Y — SHA-256-checked in assets/gate.js, remembered
per browser session). To change it, hash the new password with SHA-256 and
replace the HASH value in assets/gate.js. Note: this is a soft gate suitable
for portfolio-NDA etiquette; for true security use your host's protection
(e.g., Vercel Password Protection or Netlify basic auth).

## Before going live
1. Replace "Add hero image / Add screens" dashed frames with real images
   (drop files in an /images folder and swap the frame divs for <img> tags).
2. Email is set to chetanvanalli@gmail.com; LinkedIn to https://www.linkedin.com/in/chetandesign.
3. Add real LinkedIn / Instagram / YouTube URLs in contact.html.
4. Add your resume PDF at assets/chetan-hegde-cv.pdf (the CV page Download button points there).
5. Fill the [bracketed] placeholders on the CV page and case study meta sections.

## SEO
Full SEO is built in (meta, OG, Twitter cards, JSON-LD, sitemap.xml, robots.txt).
IMPORTANT: replace the placeholder domain `https://chetandesign.vercel.app` with your real
domain across all .html files, sitemap.xml, and robots.txt before launch. See
SEO-CHECKLIST.md for the full list and Search Console steps.
