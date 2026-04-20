/*
 * Partner Program Section - Signal Grid Design
 * 
 * Características:
 * - 30% comisión recurrente destacada
 * - Dashboard Personal para partners (NO white-label)
 * - Seguimiento de ventas y clientes
 * - Marketing support
 * - CTAs conectados a formularios de contacto
 */

import { motion } from 'framer-motion';
import { Percent, LayoutDashboard, HeadphonesIcon, ArrowRight, Download, Users, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useContactModal } from '@/contexts/ContactModalContext';
import { toast } from 'sonner';

const benefitIcons = [Percent, LayoutDashboard, HeadphonesIcon];

export default function PartnerSection() {
  const { t, locale } = useLanguage();
  const { openModal } = useContactModal();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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

  const handleApply = () => {
    openModal('partner');
  };

  const handleDownload = () => {
    const message = locale === 'es' 
      ? '¡Descarga de guía de partner próximamente!' 
      : locale === 'ro' 
        ? 'Descărcare ghid partener în curând!' 
        : 'Partner guide download coming soon!';
    toast.info(message);
  };

  return (
    <section id="partners" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Section divider */}
      <div className="section-divider absolute top-0 left-0 right-0" />
      
      {/* Background with abstract waves */}
      <div className="absolute inset-0">
        <img 
          src="/images/abstract-waves.png" 
          alt=""
          className="absolute bottom-0 left-0 right-0 w-full h-96 object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/95 to-background" />
      </div>
      
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Section Header */}
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              {t.partners.title}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              {t.partners.subtitle}
            </p>

            {/* Benefits */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6 mb-8"
            >
              {t.partners.benefits.map((benefit, index) => {
                const Icon = benefitIcons[index];
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="flex gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="stat-number text-2xl text-primary">
                          {benefit.value}
                        </span>
                        <h3 className="font-semibold">{benefit.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                onClick={handleApply}
                className="bg-primary hover:bg-primary/90 text-primary-foreground group"
              >
                {t.partners.cta.primary}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={handleDownload}
                className="border-border hover:bg-card"
              >
                <Download className="mr-2 h-4 w-4" />
                {t.partners.cta.secondary}
              </Button>
            </div>
          </motion.div>

          {/* Right: Dashboard Visual */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-violet-500/20 rounded-3xl blur-3xl opacity-40" />
            
            {/* Dashboard image */}
            <div className="relative rounded-2xl overflow-hidden border border-border/50 shadow-2xl">
              <img 
                src="/images/partner-dashboard.png" 
                alt="Partner Dashboard"
                className="w-full h-auto"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent" />
            </div>

            {/* Floating dashboard features */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="absolute -bottom-4 -left-4 bg-card border border-border/50 rounded-xl p-4 shadow-xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium">{t.partners.dashboardFeatures?.clients || 'Your Clients'}</div>
                  <div className="text-xs text-muted-foreground">{t.partners.dashboardFeatures?.clientsDesc || 'Full portfolio tracking'}</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.4 }}
              className="absolute -top-4 -right-4 bg-card border border-border/50 rounded-xl p-4 shadow-xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-emerald-500" />
                </div>
                <div>
                  <div className="text-sm font-medium">{t.partners.dashboardFeatures?.sales || 'Sales Analytics'}</div>
                  <div className="text-xs text-muted-foreground">{t.partners.dashboardFeatures?.salesDesc || 'Real-time commissions'}</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
