# CLUBnoteKE — Official Website

Kenya's premier Nissan Note car club website. Built as a static HTML/CSS/JS site with PWA support.

## 🌐 Live Site
> Domain pending registration — will be hosted at **clubnoteke.com**

## 📁 Pages

| Page | Description |
|------|-------------|
| `index.html` | Homepage |
| `about.html` | Club story & team |
| `membership.html` | Join the club + M-Pesa payment flow |
| `events.html` | Upcoming & past events |
| `gallery.html` | Photo gallery |
| `community.html` | Member forum & feed |
| `know-your-car.html` | Nissan Note maintenance guides |
| `charity.html` | Charity & CSR work |
| `blog.html` | Club blog |
| `contact.html` | Contact form |
| `login.html` | Member portal login |
| `dashboard.html` | Member dashboard (session-protected) |
| `garage.html` | Personal digital garage (session-protected) |
| `admin.html` | News manager (password-protected) |

## 🔐 Auth Notes (Testing Phase)
- **Member login** accepts any email/ID — no password verification yet. This is a **demo** — do not enter sensitive data.
- **Admin password** is currently stored client-side. Replace with server-side auth before production.
- Sessions expire after 7 days or 30 minutes of inactivity.

## 🚀 Deployment
This is a fully static site — deploy to:
- **GitHub Pages**: Enable in repo Settings → Pages → Deploy from `main` branch
- **Netlify**: Drag & drop the folder or connect this repo
- Add a `CNAME` record pointing `clubnoteke.com` to your host once the domain is registered.

## 🛠 Tech Stack
- Vanilla HTML5, CSS3, JavaScript (no frameworks)
- Font Awesome 6.6 (CDN)
- Google Fonts: Inter + Outfit
- PWA: `manifest.json` + `sw.js`

## 📬 Contact Form
Currently shows an alert on submit. To make it functional, integrate [Formspree](https://formspree.io) or [EmailJS](https://emailjs.com) — see `js/main.js` TODO comment.

## 📝 Changelog
See [CHANGELOG.md](CHANGELOG.md)
