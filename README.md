# Shreyas Online Services – Static Website

Premium static multi-page website for **Shreyas Online Services**, a digital documentation and online application assistance centre in Pen, Raigad, Maharashtra.

Suitable for Hostinger, cPanel, GitHub Pages, Netlify, or any static hosting platform.

## Pages

| File | Description |
|------|-------------|
| `index.html` | Homepage – hero, services, about preview, why choose us, process, CTA |
| `about.html` | About the business, mission, and service commitment |
| `services.html` | Full service listing with live search filter |
| `gallery.html` | Photo gallery with lightbox |
| `contact.html` | Contact details, WhatsApp enquiry form, map placeholder |

## Folder Structure

```text
shreyas-online-services/
├── index.html
├── about.html
├── services.html
├── gallery.html
├── contact.html
├── robots.txt
├── sitemap.xml
├── css/
│   ├── style.css
│   └── responsive.css
├── js/
│   └── script.js
├── images/
│   ├── logo.png
│   ├── favicon.png
│   ├── office-exterior.jpg
│   ├── office-interior.jpg
│   ├── food-license.jpg
│   ├── passport-service.jpg
│   ├── udyam-registration.jpg
│   ├── caste-certificate.jpg
│   └── gazette-service.jpg
└── README.md
```

## Local Preview

1. Open the `shreyas-online-services` folder.
2. Double-click `index.html`, **or** run a local server:

```bash
# Python
python -m http.server 8080

# Node (npx)
npx serve .
```

3. Visit `http://localhost:8080` in your browser.

No build step, PHP, or database is required.

## Deploy to Hostinger / cPanel

1. Zip the contents of `shreyas-online-services` (all HTML files plus `css`, `js`, `images`, `robots.txt`, `sitemap.xml`).
2. Upload and extract into `public_html` (or your domain’s document root).
3. Ensure `index.html` sits in the root of the site.
4. Visit your domain to confirm pages and images load.

Relative paths are used throughout, so the site works in a subdirectory as well (for example `yoursite.com/shreyas/`).

## Configuration

### Google Maps (required before “Get Directions” / map embed work)

Open `js/script.js` and update `SITE_CONFIG`:

```javascript
googleMapsUrl: "https://maps.google.com/?q=YOUR_PLACE_LINK",
googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=YOUR_EMBED_CODE"
```

Leave these empty until you have a verified Google Maps link. Do not invent coordinates.

### Contact numbers & WhatsApp

Already set in HTML and `SITE_CONFIG`:

- Phone: `+91 9260020143`
- Alternate / WhatsApp: `+91 8421822545`
- Email: `shreyasonlineservices@gmail.com`

### Canonical / domain

Canonical tags currently use relative paths (`./index.html`, etc.). After you have a domain, update each page’s `<link rel="canonical">` and `sitemap.xml` with your real domain.

### Social media

Footer Facebook and Instagram links are placeholders (`#`). Replace with real profile URLs when available.

## Features

- Sticky header with current-page highlight
- Call Now & WhatsApp buttons (header + floating)
- Service search filter on `services.html`
- Contact form validates input, then opens WhatsApp with a prefilled message
- Gallery lightbox with lazy-loaded images
- LocalBusiness structured data (verified info only)
- Responsive layout for mobile, tablet, and desktop
- No Aadhaar services advertised

## Images

| File | Source |
|------|--------|
| `logo.png` | Supplied business logo |
| `office-exterior.jpg` | Supplied storefront photograph |
| `office-interior.jpg` | Same storefront photo (interior visible) until a dedicated interior shot is provided |
| Service JPGs | Royalty-free Unsplash illustrations — labelled as illustrative in the gallery |

## Notes

- This site provides **application assistance** messaging only; government departments decide approvals.
- The contact form does **not** send email; it hands off to WhatsApp.
- Do not add Aadhaar enrollment/update services to the site.

## Licence

Website code created for Shreyas Online Services. Logo and storefront photographs remain property of the business.
