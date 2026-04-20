/*
 * Header Component - Signal Grid Design
 * Fixed navigation with glass effect, language selector, Sign In, and smooth scroll links
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, LogIn, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/contexts/LanguageContext';
import { useContactModal } from '@/contexts/ContactModalContext';
import { Locale, localeNames } from '@/i18n';
import { toast } from 'sonner';
import { useLocation } from 'wouter';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { locale, setLocale, t } = useLanguage();
  const { openModal } = useContactModal();
  const [location] = useLocation();
  const isLandingPage = location.startsWith('/industries/');

  const navLinks = [
    { href: '#features', label: t.nav.features },
    { href: '#how-it-works', label: t.nav.howItWorks },
    { href: '#use-cases', label: t.nav.useCases },
    { href: '#pricing', label: t.nav.pricing },
    { href: '/partners', label: t.nav.partners },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    if (href.startsWith('http')) {
      window.open(href, '_blank');
      return;
    }
    if (href.startsWith('/')) {
      window.location.href = href;
      return;
    }
    // Si estamos en una landing page, no intentar scroll a elementos que no existen
    if (isLandingPage) {
      window.location.href = '/';
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBackHome = () => {
    window.location.href = '/';
  };

  const handleSignIn = () => {
    window.location.href = 'https://app.klarsonai.com';
  };

  const handleRequestDemo = () => {
    setMobileMenuOpen(false);
    openModal('demo');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <nav className="container flex items-center justify-between h-18 lg:h-24">
        {/* Logo - Increased size */}
        <a href="/" className="flex items-center gap-2">
          <img 
            src="/images/klarson-logo-dark.png" 
            alt="Klarson AI" 
            className="h-14 lg:h-16 w-auto"
          />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right side: Language + Sign In + CTA */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                <Globe className="h-4 w-4" />
                <span className="text-sm">{localeNames[locale]}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {(Object.keys(localeNames) as Locale[]).map((loc) => (
                <DropdownMenuItem
                  key={loc}
                  onClick={() => setLocale(loc)}
                  className={locale === loc ? 'bg-accent' : ''}
                >
                  {localeNames[loc]}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Sign In Button */}
          <Button 
            variant="outline"
            size="sm"
            onClick={handleSignIn}
            className="gap-2 border-border/50 hover:bg-accent"
          >
            <LogIn className="h-4 w-4" />
            {t.nav.signIn}
          </Button>

          {/* CTA Button */}
          <Button 
            onClick={handleRequestDemo}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {t.nav.requestDemo}
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-b border-border"
          >
            <div className="container py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left py-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </button>
              ))}
              
              {/* Language Selector Mobile */}
              <div className="flex items-center gap-2 py-2 border-t border-border pt-4">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <div className="flex gap-2">
                  {(Object.keys(localeNames) as Locale[]).map((loc) => (
                    <button
                      key={loc}
                      onClick={() => {
                        setLocale(loc);
                        setMobileMenuOpen(false);
                      }}
                      className={`text-sm px-2 py-1 rounded ${
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

              {/* Sign In Mobile */}
              <Button 
                variant="outline"
                onClick={handleSignIn}
                className="w-full gap-2 border-border/50"
              >
                <LogIn className="h-4 w-4" />
                {t.nav.signIn}
              </Button>

              <Button 
                onClick={handleRequestDemo}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {t.nav.requestDemo}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
