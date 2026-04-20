# Klarson AI - TODO

## ✅ Completed Features
- [x] Glassmorphism effects on testimonials and metrics cards
- [x] Lottie micro-animations for features section
- [x] SEO meta tags optimization
- [x] Industry-specific landing pages (Medical, Real Estate, E-commerce, Hotels, Collections, Many More)
- [x] Navigation fixes for landing pages
- [x] Partners page hero image
- [x] ROI Calculator with realistic formulas
- [x] Upgrade to web-db-user (backend + database)
- [x] Resolve Home.tsx conflict from template upgrade
- [x] Create database schemas for 3 form types (demo_bookings, roi_calculations, partner_applications)
- [x] Build API endpoints for form submission (trpc.forms router)
- [x] Create email notification system with templates

## 🔄 In Progress
- [x] Create form components with multilinguality
- [x] Integrate forms into all pages
- [x] Test email delivery to contact@klarsonai.com

## 📋 Pending Features
- [ ] Admin panel for managing form submissions
- [ ] Analytics tracking for form conversions
- [ ] A/B testing for form variations

## 🐛 Bugs to Fix
- [x] Configure Resend email service with API key
- [x] Update email.ts to use Resend instead of non-existent Manus email API
- [x] Test email delivery to contact@klarsonai.com

## 🚀 New Features
- [x] Create Klarson logo for emails
- [x] Upload logo to public hosting (S3 or image CDN)
- [x] Design confirmation email templates (Demo Booking, ROI Calculator, Partner Application)
- [x] Implement dual email sending (admin notification + user confirmation)
- [x] Test auto-responder emails with all 3 forms

## 📝 Translation Updates
- [x] Update Healthcare/Dental page with correct ES/RO translations
- [x] Update Real Estate page with correct ES/RO translations
- [x] Update E-commerce/Retail page with correct ES/RO translations
- [x] Update Hospitality page with correct ES/RO translations
- [x] Update Debt Collection page with correct ES/RO translations
- [x] Update Home Services page with correct ES/RO translations
- [x] Change testimonial business names to avoid last name repetition (except homepage testimonials)

## 💰 Pricing Updates
- [x] Implement regional currency detection (€ for ES/Europe, RON for Romania, $ for rest of world)
- [x] Add 20% discount banner for 3 months promotion
- [x] Fix extra minutes pricing: Essential 0.35€/min, Professional 0.30€/min
- [x] Update all pricing displays across all pages and languages

## 💱 Currency Updates
- [x] Remove 20% discount banner from pricing section
- [x] Update exchange rates: 1 EUR = 1.17 USD (was 1.09)
- [x] Update exchange rates: 1 EUR = 5.09 RON (was 4.97)

## 💳 Annual Billing Feature
- [x] Add monthly/annual toggle to pricing section
- [x] Implement 20% discount calculation for annual plans
- [x] Display savings amount (e.g., "Save $200/year")
- [x] Add translations for annual billing in EN/ES/RO
- [x] Ensure currency conversion works for annual prices

## ❓ FAQ Section Implementation
- [x] Add FAQ translations to i18n files (8 questions in EN/ES/RO)
- [x] Create FAQSection component with accordion functionality
- [x] Integrate FAQ section below pricing section in Home page
- [x] First question expanded by default, rest collapsed
- [x] Smooth animations for expand/collapse
- [x] Test FAQ display in all 3 languages

## 🔗 Social Media Links
- [x] Add LinkedIn URL to footer button: https://www.linkedin.com/company/klarson-ai/
- [x] Add Facebook URL to footer button: https://www.facebook.com/profile.php?viewas=100000686899395&id=61586504556417
- [x] Add X (Twitter) URL to footer button: https://x.com/KlarsonAI
- [x] Add TikTok URL to footer button: https://www.tiktok.com/@klarsonai
- [x] Test all social media links open in new tab

## 📝 Blog/Content Section
- [x] Create database schema for blog posts (title, slug, content, category, author, publish_date, seo_meta)
- [x] Create blog listing page with grid layout and category filters
- [x] Create individual blog post page with full content and SEO metadata
- [x] Add "Blog" link to header navigation
- [x] Create 6 initial blog articles in EN/ES/RO:
  - [x] 2 Case Studies (Dental Clinic, Real Estate Agency)
  - [x] 2 AI Industry Insights (Voice AI Evolution, Multilingual AI)
  - [x] 2 How-To Guides (Implementation Guide, ROI Measurement)
- [x] Implement SEO optimization (meta tags, structured data, Open Graph)
- [ ] Add related articles section at bottom of each post
- [x] Test blog functionality across all languages

## 📰 Blog Content Insertion
- [x] Create SQL script with 6 professional articles (2 case studies, 2 AI insights, 2 how-to guides)
- [x] Ensure all translations are natural and professional (not literal)
- [x] Insert articles into database via SQL execution
- [x] Verify blog listing page shows all articles
- [x] Verify individual article pages render correctly
- [x] Integrate tRPC endpoints for blog data fetching
- [x] Add HelmetProvider for SEO metadata support
- [x] Test category filters and search functionality

## 🎨 Blog Cover Images
- [x] Generate 6 unique professional cover images for blog articles
- [x] Upload images to S3 storage
- [x] Update database with cover image URLs
- [x] Verify images display correctly on blog listing and individual pages

## 🚫 Temporarily Hide Blog
- [x] Remove "Blog" button from header navigation
- [x] Disable blog routes in App.tsx to prevent direct URL access
- [x] Test that blog is completely inaccessible to users

## 💰 Update Pricing
- [x] Update Essential plan price to €115 (from €105)
- [x] Update Professional plan price to €285 (from €260)
- [x] Verify USD and RON conversions use correct exchange rates
- [x] Test pricing display on homepage and all landing pages
- [x] Update prices in all translation files (EN/ES/RO)
- [x] Update prices in ROI Calculator
- [x] Update prices in all industry landing pages
- [x] Update prices in FAQ section
