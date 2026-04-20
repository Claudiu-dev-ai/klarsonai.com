/*
 * Home Page - Klarson AI Landing Page
 * 
 * Design System: Signal Grid - Precisión Suiza con Alma Digital
 * 
 * Secciones:
 * 1. Hero Section
 * 2. Social Proof & Trust Signals
 * 3. Value Proposition (Features)
 * 4. How It Works
 * 5. Use Cases
 * 6. Pricing
 * 7. FAQ (Frequently Asked Questions)
 * 8. Footer
 */

import { useAuth } from '@/_core/hooks/useAuth';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/sections/HeroSection';
import SocialProofSection from '@/components/sections/SocialProofSection';
import ValuePropositionSection from '@/components/sections/ValuePropositionSection';
import HowItWorksSection from '@/components/sections/HowItWorksSection';
import UseCasesSection from '@/components/sections/UseCasesSection';
import PricingSection from '@/components/sections/PricingSection';
import FAQSection from '@/components/sections/FAQSection';
// import PartnerSection from '@/components/sections/PartnerSection'; // Removed: Partner section moved to footer link only

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Fixed Header */}
      <Header />
      
      {/* Main Content */}
      <main className="flex-1">
        {/* Hero - Above the Fold */}
        <HeroSection />
        
        {/* Social Proof & Trust Signals */}
        <SocialProofSection />
        
        {/* Core Value Proposition */}
        <ValuePropositionSection />
        
        {/* How It Works */}
        <HowItWorksSection />
        
        {/* Use Cases - Medical & Dental Focus */}
        <UseCasesSection />
        
        {/* Pricing & Packages */}
        <PricingSection />
        
        {/* FAQ - Frequently Asked Questions */}
        <FAQSection />
        
        {/* Partner Program - Removed from main page, link available in footer */}
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
