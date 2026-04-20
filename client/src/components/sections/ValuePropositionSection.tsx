/*
 * Value Proposition Section - Premium+ with Lottie Micro-animations
 * 
 * Características:
 * - 4 puntos clave con animaciones Lottie elegantes
 * - Micro-animaciones suaves y premium+
 * - Layout en grid asimétrico
 * - Efectos de hover mejorados
 */
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLottieAnimation } from '@/hooks/useLottieAnimation';



export default function ValuePropositionSection() {
  const { t } = useLanguage();
  
  // Preload all animations - use absolute URLs
  const animationUrls = [
    `${typeof window !== 'undefined' ? window.location.origin : ''}/animations/phone-call.json`,
    `${typeof window !== 'undefined' ? window.location.origin : ''}/animations/calendar.json`,
    `${typeof window !== 'undefined' ? window.location.origin : ''}/animations/trending-down.json`,
    `${typeof window !== 'undefined' ? window.location.origin : ''}/animations/lightning.json`,
  ];
  const animations = animationUrls.map(url => useLottieAnimation(url));

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

  return (
    <section id="features" className="py-16 lg:py-20 relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container relative z-10">
        {/* Divider Line - igual que en HowItWorks */}
        <div className="mb-16 flex justify-center">
          <div className="w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />
        </div>
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            {t.valueProposition.title}
          </h2>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {t.valueProposition.features.map((feature, index) => {
            const { animationData } = animations[index];
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-card border border-border/40 rounded-xl p-6 card-hover group shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300"
              >
                {/* Lottie Animation Icon */}
                <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-all duration-300">
                  {animationData ? (
                    <Lottie
                      animationData={animationData}
                      loop={true}
                      autoplay={true}
                      style={{ width: '100%', height: '100%' }}
                    />
                  ) : (
                    <div className="w-full h-full bg-primary/10 rounded-lg animate-pulse" />
                  )}
                </div>
                
                {/* Title */}
                <h3 className="text-lg font-semibold mb-2">
                  {feature.title}
                </h3>
                
                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
