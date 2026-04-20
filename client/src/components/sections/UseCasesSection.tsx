/*
 * Use Cases Section - Signal Grid Design
 * 
 * Características:
 * - Múltiples sectores: Salud, Hoteles, Inmobiliarias, E-commerce, Cobros
 * - Estadísticas de ROI realistas (datos 2026)
 * - Cards con imágenes de industria premium
 */

import { motion } from 'framer-motion';
import { 
  Stethoscope, 
  Hotel, 
  Building2, 
  ShoppingCart, 
  PhoneCall,
  Check, 
  Sparkles 
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocation } from 'wouter';

export default function UseCasesSection() {
  const { t, locale } = useLanguage();
  const [, navigate] = useLocation();

  // Mapeo de industrias a rutas
  const industryRoutes = [
    '/industries/medical',
    '/industries/hotels',
    '/industries/real-estate',
    '/industries/ecommerce',
    '/industries/collections',
    '/industries/many-more',
  ];

  const handleIndustryClick = (index: number) => {
    const route = industryRoutes[index];
    if (route) {
      const localePath = locale === 'en' ? route : `${route}/${locale}`;
      navigate(localePath);
    }
  };

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

  // Imágenes para cada industria (reorganizadas según instrucciones)
  const industryImages = [
    '/images/industry-medical-hero.jpg',      // Medical & Dental Clinics
    '/images/industry-hotels-hero.jpg',     // Hotels & Restaurants
    '/images/industry-realestate-hero.jpg',   // Real Estate Agencies
    '/images/industry-ecommerce-hero.jpg',   // E-commerce & Retail
    '/images/industry-collections-hero.jpg',    // Collection Agencies
    '/images/industry-many-more-hero.jpg',   // And many more...
  ];

  // Iconos para cada industria (reorganizados)
  const industryIcons = [
    Stethoscope,  // Medical & Dental Clinics
    Hotel,        // Hotels & Restaurants
    Building2,    // Real Estate
    ShoppingCart, // E-commerce & Retail
    PhoneCall,    // Collection Agencies
    Sparkles,      // And many more...
  ];

  return (
    <section id="use-cases" className="py-24 lg:py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      
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
            {t.useCases.title}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t.useCases.subtitle}
          </p>
        </motion.div>

        {/* Industry Cards - Grid de 6 sectores */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {t.useCases.cases.map((industry, index: number) => {
            const Icon = industryIcons[index] || PhoneCall;
            const image = industryImages[index] || industryImages[0];
            
            const isClickable = industryRoutes[index] !== null;
            
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`bg-card border border-border/40 rounded-2xl overflow-hidden card-hover group shadow-sm ${
                  isClickable ? 'cursor-pointer' : ''
                }`}
                onClick={() => handleIndustryClick(index)}
              >
                {/* Image */}
                <div className={`relative h-40 overflow-hidden ${
                  isClickable ? 'group-hover:opacity-90' : ''
                }`}>
                  <img 
                    src={image} 
                    alt={industry.title}
                    className={`w-full h-full object-cover transition-transform duration-500 ${
                      isClickable ? 'group-hover:scale-105' : ''
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                  
                  {/* Icon badge */}
                  <div className="absolute bottom-3 left-4">
                    <div className={`w-10 h-10 rounded-lg bg-primary flex items-center justify-center shadow-lg ${
                      isClickable ? 'group-hover:scale-110 transition-transform' : ''
                    }`}>
                      <Icon className="h-5 w-5 text-primary-foreground" />
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-5 lg:min-h-[200px] flex flex-col">
                  <h3 className="text-lg font-semibold mb-2">
                    {industry.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-3 lg:line-clamp-none flex-grow">
                    {industry.description}
                  </p>
                  
                  {/* Benefits */}
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {industry.benefits.slice(0, 3).map((benefit: string, i: number) => (
                      <div 
                        key={i}
                        className="flex items-center gap-1 px-2 py-1 bg-primary/10 rounded-full text-xs"
                      >
                        <Check className="h-3 w-3 text-primary" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* "And many more" indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground">
            {t.useCases.andMore}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
