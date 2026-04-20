/**
 * Pricing Section - Signal Grid Design
 * 
 * Características:
 * - 3 planes (Essential, Professional, Elite)
 * - Plan popular destacado
 * - Conversión de monedas regional (€/RON/$)
 * - Toggle mensual/anual con descuento del 20%
 * - CTAs conectados a formularios de contacto
 */

import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useContactModal } from '@/contexts/ContactModalContext';
import { useCurrency } from '@/lib/currency';
import { useState, useEffect } from 'react';

export default function PricingSection() {
  const { t, locale } = useLanguage();
  const { openModal } = useContactModal();
  const { currency, formatPrice: formatCurrencyPrice } = useCurrency();
  const [mounted, setMounted] = useState(false);
  const [isAnnual, setIsAnnual] = useState(false);

  // Prevent hydration mismatch by only showing currency after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const handlePlanClick = (planName: string) => {
    // Elite plan goes to sales, others go to demo
    if (planName === 'Elite' || planName === 'Personalizado' || planName === 'Personalizat') {
      openModal('sales');
    } else {
      openModal('demo');
    }
  };

  // Format price with regional currency and annual discount
  const formatPrice = (priceStr: string, applyAnnualDiscount: boolean = false): string => {
    if (!mounted) return priceStr; // Return original during SSR

    // Check if it's a custom/personalized price
    if (priceStr === 'Custom' || priceStr === 'Personalizado' || priceStr === 'Personalizat') {
      return priceStr;
    }

    // Extract numeric value from price string (e.g., "€105" -> 105)
    const numericValue = parseInt(priceStr.replace(/[^\d]/g, ''));
    
    if (isNaN(numericValue)) return priceStr;

    // Apply annual discount (20% off = multiply by 0.8, then by 12 months)
    const finalValue = applyAnnualDiscount ? Math.round(numericValue * 0.8 * 12) : numericValue;

    // Convert and format with regional currency
    return formatCurrencyPrice(finalValue);
  };

  // Calculate savings for annual plan
  const calculateSavings = (monthlyPrice: string): string => {
    if (!mounted) return '';
    
    const numericValue = parseInt(monthlyPrice.replace(/[^\d]/g, ''));
    if (isNaN(numericValue)) return '';

    // Savings = (monthly * 12) - (monthly * 0.8 * 12) = monthly * 12 * 0.2
    const savings = Math.round(numericValue * 12 * 0.2);
    return formatCurrencyPrice(savings);
  };

  // Get period text based on billing cycle
  const getPeriodText = () => {
    if (isAnnual) {
      switch (locale) {
        case 'es': return '/año';
        case 'ro': return '/an';
        default: return '/year';
      }
    } else {
      return t.pricing.plans[0].period;
    }
  };

  return (
    <section id="pricing" className="py-24 lg:py-32 relative">
      {/* Section divider */}
      <div className="section-divider absolute top-0 left-0 right-0" />
      
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      </div>
      
      <div className="container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            {t.pricing.title}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t.pricing.subtitle}
          </p>

          {/* Billing Toggle */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <span className={`text-sm font-medium transition-colors ${!isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
              {t.pricing.billingToggle.monthly}
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-14 h-7 bg-primary/20 rounded-full transition-colors hover:bg-primary/30 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Toggle billing cycle"
            >
              <motion.div
                className="absolute top-1 left-1 w-5 h-5 bg-primary rounded-full shadow-md"
                animate={{ x: isAnnual ? 28 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-medium transition-colors ${isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
                {t.pricing.billingToggle.annual}
              </span>
              <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full">
                {t.pricing.billingToggle.save}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {t.pricing.plans.map((plan: any, index: number) => {
            const isPopular = plan.highlighted;
            const isCustom = plan.price === 'Custom' || plan.price === 'Personalizado' || plan.price === 'Personalizat';
            const displayPrice = formatPrice(plan.price, isAnnual && !isCustom);
            const savings = isAnnual && !isCustom ? calculateSavings(plan.price) : '';

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`relative rounded-2xl p-8 border-2 transition-all duration-300 ${
                  isPopular
                    ? 'border-primary bg-primary/5 shadow-lg shadow-primary/20 scale-105'
                    : 'border-border bg-card hover:border-primary/50'
                }`}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="flex items-center gap-1 bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg">
                      <Sparkles className="h-4 w-4" />
                      <span>Popular</span>
                    </div>
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold">{displayPrice}</span>
                    {!isCustom && (
                      <span className="text-muted-foreground">{getPeriodText()}</span>
                    )}
                  </div>
                  {isAnnual && !isCustom && savings && (
                    <p className="text-sm text-primary font-medium mt-2">
                      {locale === 'es' ? 'Ahorras' : locale === 'ro' ? 'Economisești' : 'Save'} {savings}
                    </p>
                  )}
                </div>

                {/* Plan Description */}
                <p className="text-sm text-muted-foreground mb-6 min-h-[4rem]">
                  {plan.description}
                </p>

                {/* Features List */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature: string, featureIndex: number) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  onClick={() => handlePlanClick(plan.name)}
                  variant={isPopular ? 'default' : 'outline'}
                  size="lg"
                  className="w-full"
                >
                  {plan.cta}
                </Button>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Add-on Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center max-w-3xl mx-auto"
        >
          <div className="rounded-2xl border-2 border-dashed border-border p-8 bg-card/50">
          <h3 className="text-xl font-bold mb-3">
            {t.pricing.addon.title}
          </h3>
          <p className="text-muted-foreground mb-6">
            {t.pricing.addon.description}
          </p>
          <Button
            onClick={() => openModal('demo')}
            variant="outline"
            size="lg"
          >
            {t.pricing.addon.cta}
          </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
