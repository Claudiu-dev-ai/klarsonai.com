/*
 * Social Proof Section - Signal Grid Design
 * 
 * Características:
 * - Panel de estadísticas de crecimiento realistas (2 meses en mercado)
 * - Testimonios en grid
 * - Badges de certificación (HIPAA, SOC2, GDPR)
 */

import { motion } from 'framer-motion';
import { Quote, Shield, CheckCircle, TrendingUp, Phone, Bot, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCountUp } from '@/hooks/useCountUp';

// Componente para mostrar el número animado
function AnimatedStat({ value, label, icon: Icon, color }: { value: string; label: string; icon: any; color: string }) {
  // Extraer el número del valor (ej: "15k" -> 15, "110+" -> 110)
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''));
  const suffix = value.replace(/[0-9]/g, '');
  const { value: animatedCount, ref } = useCountUp({ end: numericValue, duration: 2000, suffix });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="text-center"
    >
      <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-background border border-border/50 mb-4 ${color}`}>
        <Icon className="h-7 w-7" />
      </div>
      <div ref={ref} className={`stat-number text-4xl lg:text-5xl mb-2 ${color}`}>
        {animatedCount}
      </div>
      <p className="text-muted-foreground text-sm">
        {label}
      </p>
    </motion.div>
  );
}

export default function SocialProofSection() {
  const { t } = useLanguage();

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  // Estadísticas realistas de crecimiento
  const growthStats = [
    {
      icon: Phone,
      value: t.socialProof.growth.callsValue,
      label: t.socialProof.growth.callsProcessed,
      color: 'text-primary',
    },
    {
      icon: Bot,
      value: t.socialProof.growth.assistantsValue,
      label: t.socialProof.growth.assistantsLaunched,
      color: 'text-emerald-500',
    },
    {
      icon: Users,
      value: t.socialProof.growth.partnersValue,
      label: t.socialProof.growth.partners,
      color: 'text-amber-500',
    },
  ];

  return (
    <section id="testimonials" className="py-24 lg:py-32 relative">
      {/* Section divider */}
      <div className="section-divider absolute top-0 left-0 right-0" />
      
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            {t.socialProof.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t.socialProof.subtitle}
          </p>
        </motion.div>

        {/* Growth Stats Panel - Estadísticas realistas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-gradient-to-br from-primary/10 via-card to-card border border-primary/20 rounded-2xl p-8 mb-16 backdrop-blur-md bg-white/5 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-8 justify-center">
            <TrendingUp className="h-6 w-6 text-primary" />
            <h3 className="text-xl font-semibold">
              {t.socialProof.growth.title}
            </h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {growthStats.map((stat, index) => (
              <AnimatedStat
                key={index}
                value={stat.value}
                label={stat.label}
                icon={stat.icon}
                color={stat.color}
              />
            ))}
          </div>
          
          {/* Subtle note about growth */}
          <p className="text-xs text-muted-foreground/60 mt-8 text-center">
            {t.socialProof.growth.note}
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {t.socialProof.testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-card border border-border/40 rounded-2xl p-8 card-hover flex flex-col h-full shadow-sm backdrop-blur-md bg-white/5"
            >
              <Quote className="h-8 w-8 text-primary/30 mb-4" />
              <h4 className="text-lg font-bold text-foreground mb-4 leading-tight">
                {testimonial.headline}
              </h4>
              <p className="text-muted-foreground mb-8 leading-relaxed flex-grow">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-4 mt-auto pt-6 border-t border-border/30">
                {/* Avatar placeholder */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg font-semibold text-primary">
                    {testimonial.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-foreground">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </div>
                  <div className="text-sm text-primary/80 font-medium">
                    {testimonial.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>



      </div>
    </section>
  );
}
