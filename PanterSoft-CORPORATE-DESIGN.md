# PanterSoft Corporate Design Guide

**Version 2.0**

This document outlines the visual identity, design principles, and brand guidelines for PanterSoft.

---

## 1. Brand Philosophy

PanterSoft represents the symbiosis of raw, agile power (the Panther) and precise, futuristic technology (circuitry). The brand radiates innovation, speed, and technical excellence.

**Visual Style:** Dark, "Cyberpunk"-inspired with strong neon contrasts. The look is futuristic, technological, and powerful.

---

## 2. Color Palette

Colors are the heart of the PanterSoft look. They must glow and work best on very dark backgrounds.

### Primary Colors (Neon Glow)

These colors are used for logos, accents, light effects, and important interactive elements.

#### Neon Cyan
- **Hex Code:** `#00E5FF`
- **Usage:** Main accent color, highlights, text, primary interactions
- **CSS Variable:** `--neon-cyan` or `--primary`

#### Neon Green
- **Hex Code:** `#39FF14`
- **Usage:** Secondary accent, circuits, hover states
- **CSS Variable:** `--neon-green` or `--accent-green`

#### Neon Purple
- **Hex Code:** `#BC13FE`
- **Usage:** Gradients, shadows, accents
- **CSS Variable:** `--neon-purple` or `--accent-purple`

### Background Colors

PanterSoft does not use pure black, but deep, dark tones to create depth.

#### Deep Circuit Black
- **Hex Code:** `#050A14`
- **Usage:** Main background
- **CSS Variable:** `--bg-dark`

#### Dark Tech Blue
- **Hex Code:** `#0A1128`
- **Usage:** Secondary background elements
- **CSS Variable:** `--bg-light`

> **Important:** Neon colors must always be used with glow effects (box-shadow, text-shadow) to create the characteristic cyberpunk look.

---

## 3. Typography

### Primary Font (Headlines & Logo)

The style is technical, futuristic, blocky, and reminiscent of digital displays or Sci-Fi interfaces.

**Recommended Fonts (Google Fonts):**
- `Orbitron` - Futuristic, technical
- `Russo One` - Blocky, powerful
- `Audiowide` - Digital, Sci-Fi
- `Space Grotesk` - Modern, technical (currently used)

### Secondary Font (Body Text & UI)

A very readable, modern sans-serif font that provides a calm contrast to the headlines.

**Recommended Fonts:**
- `Inter` - Modern, readable (currently used)
- `Roboto` - Clear, professional
- `Open Sans` - Friendly, readable
- `Montserrat` - Elegant, modern

### Usage Rules

- **Headlines:** Space Grotesk, Bold (700-800), with Neon Cyan color and glow effect
- **Body Text:** Inter, Regular (400), White with 80% opacity
- **Accents:** Neon Cyan with text-shadow for glow effect

---

## 4. Logos & Core Assets

### 4.1. Primary Logo (Hero Banner)

This is the most complete representation of the brand. It is used for prominent headers (Hero Sections) on websites or banners.

**Usage:** On dark, complex backgrounds with circuit patterns.
**Asset File:** `PanterSoft_Banner.png` (transparent PNG)

### 4.2. Icon (Panther Head)

The heart of the brand. The panther head made of circuits.

#### Variant A: Neon Glow
- **Usage:** For areas that need visual attention but have little space
- **Asset:** `PanterSoft_Logo.png`

#### Variant B: Round Icon
- **Usage:** For favicons, app icons, small displays
- **Asset:** `PanterSoft_Logo_Round.png`

#### Variant C: Monochrome
- **Usage:** For print, footer, or when color is not possible
- **Asset:** `Pantersoft-logo-bw.png`

### 4.3. Favicon

The smallest identifier for browser tabs. Must be extremely reduced.

**Usage:** Only as app icon or browser favicon.
**Asset:** `PanterSoft_Logo_Round.png` - ideally inverted to a light color (Cyan) for dark browser themes.

---

## 5. Iconography

Icons must have a consistent style: Modern, flat style or with a slight neon border, and color-matched to the palette.

### 5.1. Competence Icons

Used to represent services. The style is "Flat Modern" with brand colors.

**Available Icons:**
- Robotics: `coding.png`
- Electrical Engineering: `bulb.png`
- Programming: `coding.png`

### 5.2. Social Media & UI Icons

These icons should be more restrained, often monochrome or glowing Cyan in active state.

**Available Icons:**
- GitHub: `github-logo.png`
- LinkedIn: `linkedin-logo.png`
- Email: `mail-logo.png`

### 5.3. Contact Icons

**Available Icons:**
- Name: `icon-name.png`
- Location: `icon-location.png`
- Email: `icon-email.png`
- Phone: `icon-phone.png`

---

## 6. Backgrounds & Imagery

Backgrounds are crucial for the "PanterSoft" look. They must never be light or pure white.

### 6.1. Hero Backgrounds (Action)

Complex, glowing circuit patterns that create depth. They are used behind the primary logo.

**Technical Implementation:**
- Particles.js with neon colors (#00E5FF, #39FF14, #BC13FE)
- 120 particles for dense pattern
- Connection lines with glow effect
- Interactive hover effects
- Radial gradients in neon colors for depth

### 6.2. Content Backgrounds (Subtle)

For areas with lots of text or contact forms. The pattern must be very subtle so as not to distract from the content.

**CSS Implementation:**
```css
background-image: radial-gradient(
    circle at X% Y%,
    rgba(0, 229, 255, 0.02) 0%,
    transparent 50%
);
```

> **Important:** Backgrounds must always be dark (#050A14 or #0A1128). Use neon colors only as subtle accents.

---

## 7. Personal Branding Integration (Nico)

Since "PanterSoft" is also the developer profile of Nico, the personal photo must be professionally integrated.

### The Photo

**Requirements:**
- Professional headshot
- Well-lit
- Neutral background
- Asset: `about.jpg`

### Integration

The photo should not stand "naked" on the website. It should be embedded in a frame that picks up the neon look.

**Design Elements:**
- Round or rounded frame
- Glowing Cyan border (#00E5FF)
- Box-shadow with glow effect
- Animated border gradient (optional)
- Padding for distance to frame

---

## 8. CSS Variables (Technical Implementation)

All colors and effects are defined as CSS variables for easy maintenance.

### Color Variables

```css
--neon-cyan: #00E5FF;
--neon-green: #39FF14;
--neon-purple: #BC13FE;
--primary: #00E5FF;
--bg-dark: #050A14;
--bg-light: #0A1128;
```

### Glow Effects

```css
--glow-cyan: 0 0 20px rgba(0, 229, 255, 0.5), 0 0 40px rgba(0, 229, 255, 0.3);
--glow-green: 0 0 20px rgba(57, 255, 20, 0.5), 0 0 40px rgba(57, 255, 20, 0.3);
--glow-purple: 0 0 20px rgba(188, 19, 254, 0.5), 0 0 40px rgba(188, 19, 254, 0.3);
```

---

## 9. Usage Rules

### DO's ✅

- Always use dark backgrounds (#050A14 or #0A1128)
- Combine neon colors with glow effects
- Consistent use of defined colors
- Circuit-like patterns for backgrounds
- Professional integration of personal branding

### DON'Ts ❌

- Never use light or white backgrounds
- Avoid neon colors without glow effects
- Don't use colors other than the defined ones
- No too bright or low-contrast combinations
- Don't deviate from the corporate identity

---

## 10. Asset Overview

### Logos

- `PanterSoft_Banner.png` - Hero Banner (transparent)
- `PanterSoft_Logo.png` - Standard Logo (transparent)
- `PanterSoft_Logo_Round.png` - Round Icon (transparent)
- `Pantersoft-logo-bw.png` - Monochrome Version

### Icons

- `coding.png` - Robotics/Programming
- `bulb.png` - Electrical Engineering
- `github-logo.png` - GitHub
- `linkedin-logo.png` - LinkedIn
- `mail-logo.png` - Email
- `icon-*.png` - Contact Icons

### Images

- `about.jpg` - Profile Picture
- `portfolio-*.jpg` - Portfolio Projects

---

## Version History

- **v2.0** (2024) - Current version
- Initial documentation of PanterSoft brand identity

---

**© 2024 PanterSoft**
