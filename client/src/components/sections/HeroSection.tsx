/**
 * Hero Section - Signal Grid Design
 * 
 * Características:
 * - Animación de ondas de energía a pantalla completa
 * - Contenido de texto superpuesto con máxima legibilidad
 * - Layout centrado con gradientes de legibilidad
 * - CTAs prominentes conectados a formularios
 * - Badge de compliance
 * - Animaciones de entrada escalonadas
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useContactModal } from '@/contexts/ContactModalContext';
import { AllPartnerLogos } from '@/components/PartnerLogos';
import AudioWaveAnimation from '@/components/AudioWaveAnimation';
import ROICalculator from '@/components/ROICalculator';

export default function HeroSection() {
  const { t } = useLanguage();
  const { openModal } = useContactModal();
  const [isROIOpen, setIsROIOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const handleScrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Full-screen audio wave animation background */}
      <div className="absolute inset-0 w-full h-full">
        <AudioWaveAnimation />
      </div>

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/60 to-slate-950/80" />

      {/* Additional side gradients for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-slate-950/80" />

      {/* Content container - centered and overlaid */}
      <div className="container relative z-10 py-20 lg:py-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl mx-auto text-center"
        >
          {/* Compliance Badge */}
          <motion.div variants={itemVariants} className="mb-6 flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-primary/30 backdrop-blur-sm">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-sm text-slate-300">
                {t.hero.compliance}
              </span>
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.h1 
            variants={itemVariants}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6"
          >
            <span className="gradient-text">Klarson AI:</span>
            <br />
            <span className="text-white">{t.hero.title}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            variants={itemVariants}
            className="text-lg lg:text-xl text-slate-200 mb-8 leading-relaxed max-w-2xl mx-auto"
          >
            {t.hero.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 mb-12 justify-center"
          >
            <Button 
              size="lg"
              onClick={() => openModal('demo')}
              className="bg-primary hover:bg-primary/90 text-primary-foreground group transition-all duration-200 hover:shadow-lg hover:shadow-primary/25"
            >
              {t.hero.cta.primary}
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => setIsROIOpen(true)}
              className="border-slate-400/50 text-slate-100 hover:bg-slate-800/50 transition-all duration-200 hover:border-slate-300"
            >
              {t.hero.cta.secondary}
            </Button>
          </motion.div>

          {/* Trust Signal */}
          <motion.div variants={itemVariants} className="flex flex-col items-center">
            <p className="text-sm text-slate-300 mb-4">
              {t.hero.trustedBy}
            </p>
            {/* Partner logos */}
            <AllPartnerLogos className="justify-center gap-6" />
          </motion.div>
        </motion.div>


      </div>

      {/* ROI Calculator Modal */}
      <ROICalculator isOpen={isROIOpen} onClose={() => setIsROIOpen(false)} />
    </section>
  );
}
