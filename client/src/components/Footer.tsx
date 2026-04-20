/*
 * Footer Component - Signal Grid Design
 * 
 * Características:
 * - Logo más grande y prominente
 * - Redes sociales (LinkedIn, Facebook, X, TikTok)
 * - Email de contacto: contact@klarsonai.com
 * - Links de navegación organizados
 * - Selector de idioma
 */

import { Globe, Mail } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Locale, localeNames } from '@/i18n';
import { toast } from 'sonner';

// Social media icons as SVG components
const LinkedInIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const XIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const TikTokIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
  </svg>
);

export default function Footer() {
  const { locale, setLocale, t } = useLanguage();

  const handleLinkClick = (e: React.MouseEvent, label: string) => {
    e.preventDefault();
    toast.info(`${label} - Coming soon!`);
  };

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'LinkedIn', icon: LinkedInIcon, href: 'https://www.linkedin.com/company/klarson-ai/' },
    { name: 'Facebook', icon: FacebookIcon, href: 'https://www.facebook.com/profile.php?viewas=100000686899395&id=61586504556417' },
    { name: 'X', icon: XIcon, href: 'https://x.com/KlarsonAI' },
    { name: 'TikTok', icon: TikTokIcon, href: 'https://www.tiktok.com/@klarsonai' },
  ];

  return (
    <footer className="bg-card border-t border-border/50">
      {/* Main Footer */}
      <div className="container py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column - Logo más grande */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <a href="/" className="inline-block mb-6">
              <img 
                src="/images/klarson-logo-dark.png" 
                alt="Klarson AI" 
                className="h-14 lg:h-20 w-auto"
              />
            </a>
            <p className="text-sm text-muted-foreground mb-6 max-w-xs">
              {t.footer.tagline}
            </p>
            
            {/* Social Media Icons */}
            <div className="flex items-center gap-4 mb-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={social.name}
                >
                  <social.icon />
                </a>
              ))}
            </div>
            
            {/* Language Selector */}
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <div className="flex gap-1">
                {(Object.keys(localeNames) as Locale[]).map((loc) => (
                  <button
                    key={loc}
                    onClick={() => setLocale(loc)}
                    className={`text-xs px-2 py-1 rounded transition-colors ${
                      locale === loc 
                        ? 'bg-primary text-primary-foreground' 
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {loc.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-4">{t.footer.company.title}</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#" 
                  onClick={(e) => handleLinkClick(e, t.footer.company.about)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t.footer.company.about}
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => handleLinkClick(e, t.footer.company.careers)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t.footer.company.careers}
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => handleLinkClick(e, t.footer.company.press)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t.footer.company.press}
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => handleLinkClick(e, t.footer.company.contact)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t.footer.company.contact}
                </a>
              </li>
            </ul>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold mb-4">{t.footer.product.title}</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#features" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t.footer.product.features}
                </a>
              </li>
              <li>
                <a 
                  href="#pricing" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t.footer.product.pricing}
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => handleLinkClick(e, t.footer.product.integrations)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t.footer.product.integrations}
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => handleLinkClick(e, t.footer.product.api)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t.footer.product.api}
                </a>
              </li>
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-semibold mb-4">{t.footer.resources.title}</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#" 
                  onClick={(e) => handleLinkClick(e, t.footer.resources.blog)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t.footer.resources.blog}
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => handleLinkClick(e, t.footer.resources.caseStudies)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t.footer.resources.caseStudies}
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => handleLinkClick(e, t.footer.resources.webinars)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t.footer.resources.webinars}
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => handleLinkClick(e, t.footer.resources.help)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t.footer.resources.help}
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold mb-4">{t.footer.legal.title}</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#" 
                  onClick={(e) => handleLinkClick(e, t.footer.legal.privacy)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t.footer.legal.privacy}
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => handleLinkClick(e, t.footer.legal.terms)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t.footer.legal.terms}
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => handleLinkClick(e, t.footer.legal.cookies)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t.footer.legal.cookies}
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => handleLinkClick(e, t.footer.legal.gdpr)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t.footer.legal.gdpr}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Partners CTA - Strategic Link */}
      <div className="border-t border-border/50 bg-card/50">
        <div className="container py-4">
          <p className="text-sm text-muted-foreground text-center">
            {t.footer.partnersCta?.question || '¿Eres una agencia o consultor de marketing?'}{' '}
            <a 
              href="/partners" 
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              {t.footer.partnersCta?.link || 'Únete a nuestro Programa de Partners'}
            </a>
            {' '}{t.footer.partnersCta?.suffix || 'y ofrece soluciones de IA a tus clientes.'}
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border/50">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Klarson AI. All rights reserved.
            </p>
            
            {/* Contact Info - Email actualizado */}
            <div className="flex items-center gap-6">
              <a 
                href="mailto:contact@klarsonai.com" 
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="h-4 w-4" />
                contact@klarsonai.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
