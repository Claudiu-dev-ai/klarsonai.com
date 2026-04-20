/*
 * How It Works Section - Signal Grid Design
 * 
 * Características:
 * - 3 pasos con números grandes
 * - Líneas conectoras entre pasos
 * - Iconos y descripciones claras
 */

import { motion } from 'framer-motion';
import { Settings, Link2, Rocket } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const stepIcons = [Settings, Link2, Rocket];

export default function HowItWorksSection() {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="how-it-works" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Section divider */}
      <div className="section-divider absolute top-0 left-0 right-0" />
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '48px 48px',
          }}
        />
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
            {t.howItWorks.title}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t.howItWorks.subtitle}
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent -translate-y-1/2" />
          
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {t.howItWorks.steps.map((step, index) => {
              const Icon = stepIcons[index];
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="relative"
                >
                  {/* Step card */}
                  <div className="bg-card border border-border/40 rounded-2xl p-8 text-center card-hover shadow-sm group">
                    {/* Step number */}
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg shadow-lg shadow-primary/30">
                        {step.number}
                      </div>
                    </div>
                    
                    {/* Icon */}
                    <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mt-4 mb-6 group-hover:bg-primary/20 group-hover:scale-105 transition-all duration-300">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl font-semibold mb-3">
                      {step.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                  
                  {/* Arrow (mobile) */}
                  {index < 2 && (
                    <div className="lg:hidden flex justify-center my-4">
                      <div className="w-px h-8 bg-border" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
