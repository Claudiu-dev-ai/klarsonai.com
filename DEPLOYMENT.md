# Klarson AI - Deployment Guide

This document provides comprehensive instructions for deploying the Klarson AI website and managing multilingual content.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Development Setup](#development-setup)
4. [Building for Production](#building-for-production)
5. [Deployment Options](#deployment-options)
6. [Internationalization (i18n)](#internationalization-i18n)
7. [Adding New Languages](#adding-new-languages)
8. [Customization Guide](#customization-guide)

---

## Project Overview

Klarson AI is a premium landing page for an AI voice agent platform. The website features a modern, dark-themed design following the "Signal Grid" design philosophy, which emphasizes precision, clarity, and professional aesthetics suitable for healthcare and enterprise clients.

| Feature | Description |
|---------|-------------|
| **Framework** | React 19 + Vite |
| **Styling** | Tailwind CSS 4 + shadcn/ui |
| **Animations** | Framer Motion |
| **i18n** | Custom React Context with JSON translation files |
| **Languages** | English (default), Spanish, Romanian |

---

## Technology Stack

The project uses the following core technologies:

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.x | UI Framework |
| Vite | 7.x | Build Tool |
| TypeScript | 5.6 | Type Safety |
| Tailwind CSS | 4.x | Styling |
| Framer Motion | 12.x | Animations |
| Wouter | 3.x | Client-side Routing |
| shadcn/ui | Latest | UI Components |

---

## Development Setup

### Prerequisites

Ensure you have the following installed on your system:

- Node.js 22.x or higher
- pnpm 10.x or higher

### Installation Steps

Clone the repository and install dependencies:

```bash
cd klarson-ai
pnpm install
```

Start the development server:

```bash
pnpm dev
```

The development server will be available at `http://localhost:3000`.

---

## Building for Production

To create an optimized production build, run:

```bash
pnpm build
```

This command generates a `dist` folder containing all static assets ready for deployment. The build process includes TypeScript compilation, asset optimization, and code minification.

To preview the production build locally:

```bash
pnpm preview
```

---

## Deployment Options

### Option 1: Manus Platform (Recommended)

The Klarson AI website is designed to be deployed on the Manus platform with built-in hosting and custom domain support. Simply click the "Publish" button in the Management UI after creating a checkpoint.

### Option 2: Static Hosting

The production build can be deployed to any static hosting provider:

| Provider | Configuration |
|----------|---------------|
| Vercel | Automatic detection of Vite projects |
| Netlify | Set publish directory to `dist` |
| Cloudflare Pages | Set build command to `pnpm build`, output to `dist` |
| AWS S3 + CloudFront | Upload `dist` contents to S3 bucket |

### Option 3: Docker

Create a Dockerfile for containerized deployment:

```dockerfile
FROM node:22-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install
COPY . .
RUN pnpm build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

## Internationalization (i18n)

The website implements a custom internationalization system using React Context and JSON translation files.

### File Structure

```
client/src/i18n/
├── index.ts          # i18n configuration and exports
└── locales/
    ├── en.json       # English translations (base)
    ├── es.json       # Spanish translations
    └── ro.json       # Romanian translations
```

### How It Works

The `LanguageProvider` component wraps the entire application and provides translation access through the `useLanguage` hook:

```tsx
import { useLanguage } from '@/contexts/LanguageContext';

function MyComponent() {
  const { locale, setLocale, t } = useLanguage();
  
  return (
    <div>
      <h1>{t.hero.title}</h1>
      <button onClick={() => setLocale('es')}>Español</button>
    </div>
  );
}
```

### URL-Based Language Detection

The system automatically detects the language from the URL path:

| URL | Language |
|-----|----------|
| `klarson.ai/` | English (default) |
| `klarson.ai/es` | Spanish |
| `klarson.ai/ro` | Romanian |

---

## Adding New Languages

To add a new language (e.g., French), follow these steps:

### Step 1: Create Translation File

Create a new file at `client/src/i18n/locales/fr.json` by copying the structure from `en.json` and translating all values:

```json
{
  "meta": {
    "title": "Klarson AI - L'Agent Vocal Intelligent pour les Entreprises",
    "description": "Automatisez les appels, SMS et WhatsApp..."
  },
  // ... translate all other keys
}
```

### Step 2: Register the Language

Update `client/src/i18n/index.ts`:

```typescript
import en from './locales/en.json';
import es from './locales/es.json';
import ro from './locales/ro.json';
import fr from './locales/fr.json'; // Add import

export type Locale = 'en' | 'es' | 'ro' | 'fr'; // Add 'fr'

export const locales: Record<Locale, typeof en> = {
  en,
  es,
  ro,
  fr, // Add to locales object
};

export const localeNames: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  ro: 'Română',
  fr: 'Français', // Add display name
};
```

### Step 3: Add Route (Optional)

If using URL-based routing, add the route in `client/src/App.tsx`:

```tsx
<Route path="/fr" component={Home} />
```

### Step 4: Update Language Detection

In `client/src/contexts/LanguageContext.tsx`, add the new locale to the detection arrays:

```typescript
if (['en', 'es', 'ro', 'fr'].includes(pathLocale)) {
  return pathLocale;
}
```

---

## Customization Guide

### Changing Colors

The color palette is defined in `client/src/index.css` using CSS custom properties with OKLCH color format:

```css
:root {
  --primary: oklch(0.585 0.233 264.052); /* Indigo accent */
  --background: oklch(0.208 0.042 265.755); /* Dark slate */
  --foreground: oklch(0.984 0.003 247.858); /* Light text */
}
```

### Updating Logo

Replace the logo file at `client/public/images/klarson-logo.png`. The logo is displayed in the header with an inverted filter for dark theme compatibility.

### Modifying Sections

Each section is a separate component in `client/src/components/sections/`. To modify content, update the corresponding translation files in `client/src/i18n/locales/`.

### Adding New Sections

1. Create a new component in `client/src/components/sections/`
2. Add translation keys to all locale JSON files
3. Import and add the section to `client/src/pages/Home.tsx`

---

## Support

For technical support or questions about this deployment, please contact the development team.

---

*Document generated for Klarson AI v1.0*
