# PanterSoft Portfolio Website

A modern, responsive portfolio website for PanterSoft featuring a cyberpunk-inspired design with multi-language support (English/German).

## Features

- 🌐 **Multi-language Support**: English and German with language switcher
- 📱 **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- 🎨 **Cyberpunk Design**: Neon colors, particle animations, and modern UI
- ⚡ **Fast & Lightweight**: Vanilla JavaScript, no heavy frameworks
- 🎯 **SEO Friendly**: Semantic HTML and proper meta tags

## Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS variables
- **JavaScript** - Vanilla JS for interactivity
- **Particles.js** - Background particle animations

## Project Structure

```
PanterSoft/
├── index.html              # Main HTML file
├── css/
│   └── style.css          # Main stylesheet
├── js/
│   ├── main.js            # Main JavaScript logic
│   ├── translations.js    # Language translations
│   └── particles.min.js   # Particle animation library
├── images/                # Images and assets
└── CORPORATE-DESIGN-GUIDE.md  # Design guidelines
```

## Getting Started

1. Clone the repository
2. Open `index.html` in a web browser
3. No build process required - it's a static website

## EmailJS Configuration

The contact form uses EmailJS for sending emails. Credentials are managed via GitHub Secrets and are automatically injected during deployment via GitHub Actions.

For local development, create `js/emailjs.config.js` with the following structure:
```javascript
const EMAILJS_CONFIG = {
    SERVICE_ID: 'your_service_id',
    TEMPLATE_ID: 'your_template_id',
    PUBLIC_KEY: 'your_public_key'
};
```

## Design Guidelines

See [CORPORATE-DESIGN-GUIDE.md](./PanterSoft-CORPORATE-DESIGN.md) for complete design specifications, color palette, typography, and branding guidelines.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

© 2024 PanterSoft. All rights reserved.
